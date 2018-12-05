<template>
  <div class="masterDiv">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <div id="welcome" v-if = "currentView === 'frontPage'">
      <OrderingViewFrontPage
      @Visibility="changeView"
      v-if = "currentView === 'frontPage'">
    </OrderingViewFrontPage>
  </div>


  <div v-if = "currentView === 'favoritesPage'">
    <button class = "avbryt"
    @click= "goBack">
    {{ uiLabels.back }}</button>
    <FavoritesPage>
    </FavoritesPage>
  </div>

  <div id="ordering" v-if = "currentView === 'designPage'">
    <!--<img class="example-panel" src="@/assets/exampleImage.jpg"> -->
    <button v-on:click="switchLang()">{{ uiLabels.language }}</button>
    <button class = "avbryt"
    @click= "goBack">
    {{ uiLabels.back }}</button>

    <div id= "bestallning"><h1>{{ uiLabels.myOrder }}</h1></div>
    <h2>{{ uiLabels.myBurger }} </h2>
    <modal ref="modal"
    :category="this.modalCategory"
    v-show="this.isModalVisible === true"
    :ingredients="ingredients"
    :lang="lang"
    @addOrder="addToOrder"
    @ModalInfo="switchVisibility">
  </modal>

  <div id="categories-wrapper">
    <CategoryRow v-for="category in burgerCategories"
    :key="category.categoryNr"
    :category="category.categoryNr"
    :added_items="displayedIngredients"
    :category_name="uiLabels[category.label]"
    :lang="lang"
    :threshold="category.threshold"
    :item_count="categoryItemCounter[category.categoryNr-1]"
    @remove_ingredient="removeFromOrder"
    @modal_info="switchVisibility">
  </CategoryRow>

  <h1>{{uiLabels.sidesAndDrinks}}</h1>

  <CategoryRow v-for="category in extrasCategories"
  :key="category.categoryNr"
  :category="category.categoryNr"
  :added_items="displayedIngredients"
  :category_name="uiLabels[category.label]"
  :lang="lang"
  :threshold="category.threshold"
  :item_count="categoryItemCounter[category.categoryNr -1]"
  @remove_ingredient="removeFromOrder"
  @modal_info="switchVisibility">
</CategoryRow>
<div class="price-div">
  {{uiLabels.sum}}: {{price}}:-
</div>
<button id="next-btn" @click="changeView('checkout')">Nästa</button>
<button id="order-btn" @click="placeOrder()">{{ uiLabels.placeOrder }}</button>
</div>
</div>
</div>
</template>
<script>
//import the components that are used in the template, the name that you
//use for importing will be used in the template above and also below in
//components
import Ingredient from '@/components/Ingredient.vue'
import OrderItem from '@/components/OrderItem.vue'
//import PlusButton from '@/components/PlusButton.vue'
import CategoryRow from '@/components/CategoryRow.vue'
import Modal from '@/components/Modal.vue'
import OrderingViewFrontPage from '@/components/OrderingViewFrontPage.vue'
import FavoritesPage from '@/components/FavoritesPage.vue'
//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

/* instead of defining a Vue instance, export default allows the only
necessary Vue instance (found in main.js) to import your data and methods */
export default {
  name: 'Ordering',
  components: {
    Ingredient,
    OrderItem,
    CategoryRow,
    Modal,
    OrderingViewFrontPage,
    FavoritesPage
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
  // the ordering system and the kitchen
  data: function() { //Not that data is a function!
    return {
      categoryItemCounter: [0,0,0,0,0,0], /*Denna räknar hur många items som valts från resp. kategori*/
      /*chosenIngredients är de ingredienser som skickas till köket*/
      chosenIngredients: [],
      /*displayedIngredients är de ingredienser som visas i Ordering*/
      displayedIngredients: [],
      breadcrumbs:[], /*Denna sparar i vilken ordning olika views har ändrats i*/
      price: 0,
      orderNumber: "",
      modalCategory:0,
      isModalVisible: false,
      currentView: "frontPage",
      burgerCategories:[
        {categoryNr: 4,
          label:"bread",
          threshold:1},
          {categoryNr: 1,
            label:"patty",
            threshold:5},
            {categoryNr: 2,
              label: "garnish",
              threshold: 5},
              {categoryNr: 3,
                label:"sauce",
                threshold:5}
              ],
              extrasCategories:[
                {categoryNr: 5,
                  label:"sides",
                  threshold:5},
                  {categoryNr: 6,
                    label:"drinks",
                    threshold:5},
                  ],

                }
              },
              created: function () {
                this.$store.state.socket.on('orderNumber', function (data) {
                  this.orderNumber = data;
                }.bind(this));
              },
              methods: {
                /*togglar modal och bestämmer vilken kategori av ingredienser som ska visas*/
                switchVisibility: function(category) {
                  if (this.isModalVisible === true){
                    this.isModalVisible = false;
                  }
                  else {
                    this.modalCategory=category;
                    this.isModalVisible = true;
                  }
                },

                changeView: function(view){
                  this.breadcrumbs.push(this.currentView); /*Lägger till föregående view i breadcrumbs*/
                  this.currentView = view;
                },
                /*goBack hämtar senast föregående view från breadcrumbs och tar sedan bort den från minnet*/
                goBack: function(){
                  if(this.breadcrumbs.length>0){
                    this.currentView = this.breadcrumbs[this.breadcrumbs.length -1];
                    this.breadcrumbs.pop();
                  }
                },
                addToOrder: function (item) {
                  this.isModalVisible = false;
                  this.categoryItemCounter[item.category -1]+=1;
                  this.displayedIngredients.push(item);
                  if(item.category !== 5 && item.category !== 6){
                    this.chosenIngredients.push(item);
                  }
                  this.price += +item.selling_price;
                },
                placeOrder: function () {
                  if(this.chosenIngredients.length>0){
                    var i,
                    //Wrap the order in an object
                    order = {
                      ingredients: this.chosenIngredients,
                      price: this.price
                    };
                    // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
                    this.$store.state.socket.emit('order', {order: order});
                    //set all counters to 0. Notice the use of $refs
                    for (i = 0; i < this.$refs.modal.$refs.ingredient.length; i++) {
                      this.$refs.modal.$refs.ingredient[i].resetCounter();
                    }
                    this.price = 0;
                    this.chosenIngredients = [];
                    this.displayedIngredients = [];
                    for(i=0; i < this.categoryItemCounter.length; i++){
                      this.categoryItemCounter[i] = 0;
                    }
                  }
                },
                removeFromOrder: function(item,index) {
                  let i;
                  if(item.category < 5){
                    /*loopar över choseningredients och tar bort första id-matchen, här kvittar ordningen ändå*/
                    for(i=0; i<this.chosenIngredients.length;i++){
                      if(this.chosenIngredients[i].ingredient_id===item.ingredient_id){
                        this.chosenIngredients.splice(i,1);
                        break;
                      }
                    }
                  }
                  /*tar bort exakt den ingrediens som blivit klickad på*/
                  this.displayedIngredients.splice(index,1);
                  this.categoryItemCounter[item.category-1]-=1;
                  this.price -= item.selling_price;
                },

              }
            }
            </script>
            <style scoped>
            /* scoped in the style tag means that these rules will only apply to elements, classes and ids in this template and no other templates. */
            .masterDiv{
              font-family: 'Montserrat', sans-serif;
              height:100%;
              margin-top:0px !important;
              padding-top:0px !important;
              background-color:#f8ffd6;
            }

            .price-div{
              text-align: center;
              font-size: 2em;
            }

            #ordering {
              margin:auto;
              width: 90%;
            }
            /*
            .example-panel {
            position: fixed;
            left:0;
            top:0;
            z-index: -2;
          }
          */

          .ingredient{
            border: 1px solid #ccd;
            background-color: rgba(255, 255, 255, 0.5);
            font-size: 2em;
            color: rgb(100,100,100);
            border-radius: 15px;
            width:33%;
            height:3em;
            text-align: center;
            margin:auto auto 7px auto;
          }

          .ingredient-wrapper{ /*Denna styr horisontell scroll*/
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            overflow-y:hidden;
            border-radius: 15px;
            /*display: grid;
            grid-gap: 0px;
            grid-template-columns: repeat(10,10%);
            grid-template-areas: "title";
            text-align: center;*/
          }

          #bestallning{ /* Beställningsrubriken */
            text-align: center;
          }
          .avbryt{ /* Avbryt-knappen */
            float: left;
          }
          #order-btn{
            margin-bottom: 20px;
            padding:20px 30px 20px 30px;
            font-size: 2em;
            background-color: rgb(0, 150, 0);
          }
          #order-btn:hover{
            color:black;
            background-color: rgb(0, 200, 0);
            padding:25px 35px 25px 35px;
          }

          button{
            float:right;
            background-color: #ddd;
            border: none;
            color: black;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            margin: 4px 2px;
            cursor: pointer;
            border-radius: 16px;
          }
          button:hover{
            background-color: #000;
            color: white;
          }
          </style>

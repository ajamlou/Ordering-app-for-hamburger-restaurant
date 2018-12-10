<template>
  <div class="masterDiv">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">

    <OrderingViewFrontPage
      @Visibility="changeView"
      v-if = "currentView === 'frontPage'">
    </OrderingViewFrontPage>

  <div v-if = "currentView === 'favoritesPage'">
    <button class = "avbryt"
    @click= "goBack">
    {{ uiLabels.back }}</button>
    <FavoritesPage
    :ingredients="ingredients"
    :lang = "lang">
  </FavoritesPage>
</div>

  <CheckoutPage
  v-if = "currentView === 'checkoutPage'"
  :uiLabels="uiLabels"
  :menus="menusArray"
  :lang="lang"
  @go_back="goBack"
  @new_menu="newMenu"
  @modify_menu="modifyMenu"
  @clear_all="clearAll">
</CheckoutPage>

<IngredientsModal ref="modal"
v-show="this.showIngredientsModal"
:ingredients="ingredients.filter(item=>item.category===modalCategory)"
:lang="lang"
@add_ingredient="addToMenu"
@modal_info="toggleShowIngredientsModal">
</IngredientsModal>

<SlotModal
v-if="this.showSlotModal">
<div slot="header"><button
  type="button"
  class="btn-close"
  @click="toggleSlotModal()">
  x
</button></div>
<div slot="body">{{uiLabels.noIngredients}}</div>
<div slot="footer"></div>
</slotmodal>

<div id="ordering" v-if = "currentView === 'designPage'">
  <!--<img class="example-panel" src="@/assets/exampleImage.jpg"> -->
  <button v-on:click="switchLang();checkLang()"
  id="lang-btn"
  :class="{'sv' : isSv, 'en' : !isSv }">{{ uiLabels.language }}</button>

  <div id= "bestallning"><h1>{{ uiLabels.myOrder }}</h1></div>

  <div id="categories-wrapper">
    <h2>{{ uiLabels.myBurger }} </h2>
    <CategoryRow v-for="category in burgerCategories"
    :key="category.categoryNr"
    :category="category.categoryNr"
    :added_items="chosenIngredients"
    :category_name="uiLabels[category.label]"
    :lang="lang"
    :threshold="category.threshold"
    :item_count="categoryItemCounter[category.categoryNr-1]"
    @remove_ingredient="removeFromMenu"
    @info_to_modal="toggleShowIngredientsModal">
  </CategoryRow>

  <h2>{{uiLabels.extras}}</h2>

  <CategoryRow v-for="category in extrasCategories"
  :key="category.categoryNr"
  :category="category.categoryNr"
  :added_items="chosenIngredients"
  :category_name="uiLabels[category.label]"
  :lang="lang"
  :threshold="category.threshold"
  :item_count="categoryItemCounter[category.categoryNr -1]"
  @remove_ingredient="removeFromMenu"
  @info_to_modal="toggleShowIngredientsModal">
</CategoryRow>
</div>
<div id="price-div">
  {{uiLabels.sum}}: {{price}}:-
</div>
<button id = "bck-btn"
@click= "goBack">
{{ uiLabels.back }}</button>
<button id="next-btn" @click="addToCheckout();changeView('checkoutPage');">{{uiLabels.next}}</button>
<!-- <button id="order-btn" @click="placeOrder()">{{ uiLabels.placeOrder }}</button> -->
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
import IngredientsModal from '@/components/IngredientsModal.vue'
import SlotModal from '@/components/SlotModal.vue'
import OrderingViewFrontPage from '@/components/OrderingViewFrontPage.vue'
import FavoritesPage from '@/components/FavoritesPage.vue'
import CheckoutPage from '@/components/CheckoutPage.vue'
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
    IngredientsModal,
    SlotModal,
    OrderingViewFrontPage,
    FavoritesPage,
    CheckoutPage
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
  // the ordering system and the kitchen
  data: function() { //Not that data is a function!
    return {
      isSv:true,
      categoryItemCounter: [0,0,0,0,0,0], /*Denna räknar hur många items som valts från resp. kategori*/
      chosenIngredients: [],
      breadcrumbs:[], /*Denna sparar i vilken ordning olika views har ändrats i*/
      price: 0,
      orderNumber: "",
      menusArray:[], /*Sparar enskilda menyer i en array*/
      units:1, /*Extra viktig främst när vi ändrar en meny*/
      modifyMenuIndex:0, /*Håller koll så att när en meny ändras från checkout läggs burgaren tillbaka på samma ställe igen*/
      isModifying:false, /*Ändras till true när vi ändrar en meny, har effekt på addToCheckout*/
      modalCategory:0,
      showIngredientsModal: false,
      showSlotModal: false,
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
                checkLang:function(){
                  if(this.lang==="sv"){
                    this.isSv=true;
                  }
                  else {
                    this.isSv=false;
                  }
                },
                toggleSlotModal:function(){
                  this.showIngredientsModal = false;
                  if(!this.showSlotModal){
                    this.showSlotModal=true;
                  }
                  else{
                    this.showSlotModal=false;
                  }
                },
                /*togglar modal och bestämmer vilken kategori av ingredienser som ska visas*/
                toggleShowIngredientsModal: function(category) {
                  if (this.showIngredientsModal){
                    this.showIngredientsModal = false;
                  }
                  else {
                    this.showSlotModal = false;
                    this.modalCategory=category;
                    this.showIngredientsModal = true;
                  }
                },

                changeView: function(view){
                  /*Gör så att vi inte kan byta vy med en tom order*/
                  if(this.chosenIngredients.length <= 0){
                    if(view==='checkoutPage'){
                      return;
                    }
                  }
                  this.breadcrumbs.push(this.currentView); /*Lägger till föregående view i breadcrumbs*/
                  this.currentView = view;
                },
                /*goBack hämtar senast föregående view från breadcrumbs och tar sedan bort den från minnet*/
                goBack: function(){
                  /*Om vi ändrar en order och sedan klickar på tillbaka, lägg tilbaka ordern i ordersArray*/
                  if(this.isModifying){
                    this.addToCheckout();
                  }
                  if(this.breadcrumbs.length>0){
                    this.currentView = this.breadcrumbs[this.breadcrumbs.length -1];
                    this.breadcrumbs.pop();
                  }
                },
                addToMenu: function (item) {
                  this.showIngredientsModal = false;
                  this.categoryItemCounter[item.category -1]+=1;
                  this.chosenIngredients.push(item);
                  this.price += +item.selling_price;
                },
              //   placeOrder: function () {
              //     if(this.chosenIngredients.length>0){
              //       var i,
              //       //Wrap the order in an object
              //       order = {
              //         ingredients: this.chosenIngredients,
              //         price: this.price
              //       };
              //       // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
              //       this.$store.state.socket.emit('order', {order: order});
              //       //set all counters to 0. Notice the use of $refs
              //       /*for (i = 0; i < this.$refs.modal.$refs.ingredient.length; i++) {
              //       this.$refs.modal.$refs.ingredient[i].resetCounter();
              //     }*/
              //     this.price = 0;
              //     this.chosenIngredients = [];
              //     for(i=0; i < this.categoryItemCounter.length; i++){
              //       this.categoryItemCounter[i] = 0;
              //     }
              //   }
              // },
              removeFromMenu: function(item,index) {
                this.chosenIngredients.splice(index,1);
                this.categoryItemCounter[item.category-1]-=1;
                this.price -= item.selling_price;
              },
              modifyMenu:function(ingredients,units,index){
                this.chosenIngredients=ingredients;
                this.units=units;
                this.modifyMenuIndex=index;
                this.isModifying = true;
                this.changeView('designPage');

              },
              /*Tar chosen ingredients och price och wrappar till ett objekt.
              Pushar objektet till orders som sedan kommer loopas över i CheckoutPage*/
              addToCheckout: function(){
                if(this.chosenIngredients.length>0){
                  let order ={"ingredients": this.chosenIngredients,
                  "price":this.price,
                  "units":this.units};

                  if(this.isModifying){
                    /*Om vi ändrar i en order, lägg tillbaka ordern på samma index i orderArray*/
                    this.menusArray.splice(this.modifyMenuIndex,0,order);
                    this.units=1;
                    this.isModifying=false;
                  }
                  else{
                    this.menusArray.push(order);
                  }
                }
                else{
                  this.toggleSlotModal();
                }
              },
              newMenu:function(){
                this.resetBurger();
                this.changeView('designPage');
              },
              clearAll:function(){
                this.resetBurger();
                this.menusArray=[];
              },
              resetBurger:function(){
                this.categoryItemCounter=this.categoryItemCounter.map((index)=>0);/*Nollställer arrayen*/
                this.chosenIngredients = [];
                this.price = 0;
              }

            }
          }
          </script>
          <style scoped>
          /* scoped in the style tag means that these rules will only apply to elements, classes and ids in this template and no other templates. */
          .masterDiv{
            font-family: 'Montserrat', sans-serif;
            height:100%;
            margin-top:0px !important;
            padding-top:20px !important;
            background-color:#f8ffd6;
          }

          #ordering {
            display:grid;
            grid-template-columns: repeat(6, 1fr);
            margin:auto;
            width: 90%;
          }
          #bestallning{
            grid-column: 1 / 3;
            grid-row: 1;
            text-align: center;
          }
          #lang-btn{
            grid-column:6/7;
            grid-row:1;
            color:white;
            font-weight: 700;
            min-height: 4em;
            width: 10em;
            border:1px solid #7a7a7a;
            margin: auto;
          }
          .sv{
            background: -moz-linear-gradient(to bottom, rgba(255,255,255,0.2) 51%, rgba(0,0,0,0.2) 51%),url(../assets/en.jpg) center center no-repeat;
            background: -webkit-linear-gradient(to bottom, rgba(255,255,255,0.2) 51%, rgba(0,0,0,0.2) 51%),url(../assets/en.jpg) center center no-repeat;
            background: -o-linear-gradient(to bottom, rgba(255,255,255,0.2) 51%, rgba(0,0,0,0.2) 51%),url(../assets/en.jpg) center center no-repeat;
            background: -ms-linear-gradient(to bottom, rgba(255,255,255,0.2) 51%, rgba(0,0,0,0.2) 51%),url(../assets/en.jpg) center center no-repeat;
            background: linear-gradient(to bottom, rgba(255,255,255,0.2) 51%, rgba(0,0,0,0.2) 51%),url(../assets/en.jpg) center center no-repeat;
          }
          .sv:hover{
            background: -moz-linear-gradient(to bottom, rgba(200,200,200,0.2) 51%, rgba(0,0,0,0.4) 51%),url(../assets/en.jpg) center center no-repeat;
            background: -webkit-linear-gradient(to bottom, rgba(200,200,200,0.2) 51%, rgba(0,0,0,0.4) 51%),url(../assets/en.jpg) center center no-repeat;
            background: -o-linear-gradient(to bottom, rgba(200,200,200,0.2) 51%, rgba(0,0,0,0.4) 51%),url(../assets/en.jpg) center center no-repeat;
            background: -ms-linear-gradient(to bottom, rgba(200,200,200,0.2) 51%, rgba(0,0,0,0.4) 51%),url(../assets/en.jpg) center center no-repeat;
            background: linear-gradient(to bottom, rgba(200,200,200,0.2) 51%, rgba(0,0,0,0.4) 51%),url(../assets/en.jpg) center center no-repeat;
          }
          .sv:active{
            background: -moz-linear-gradient(to bottom, rgba(0,0,0,0.4) 51%, rgba(200,200,200,0.2) 51%),url(../assets/en.jpg) center center no-repeat;
            background: -webkit-linear-gradient(to bottom, rgba(0,0,0,0.4) 51%, rgba(200,200,200,0.2) 51%),url(../assets/en.jpg) center center no-repeat;
            background: -o-linear-gradient(to bottom, rgba(0,0,0,0.4) 51%, rgba(200,200,200,0.2) 51%),url(../assets/en.jpg) center center no-repeat;
            background: -ms-linear-gradient(to bottom, rgba(0,0,0,0.4) 51%, rgba(200,200,200,0.2) 51%),url(../assets/en.jpg) center center no-repeat;
            background: linear-gradient(to bottom, rgba(0,0,0,0.4) 51%, rgba(200,200,200,0.2) 51%),url(../assets/en.jpg) center center no-repeat;
          }
          .en{
            background: -moz-linear-gradient(to bottom, rgba(255,255,255,0.2) 51%, rgba(0,0,0,0.2) 51%),url(../assets/sv.jpg) center center no-repeat;
            background: -webkit-linear-gradient(to bottom, rgba(255,255,255,0.2) 51%, rgba(0,0,0,0.2) 51%),url(../assets/sv.jpg) center center no-repeat;
            background: -o-linear-gradient(to bottom, rgba(255,255,255,0.2) 51%, rgba(0,0,0,0.2) 51%),url(../assets/sv.jpg) center center no-repeat;
            background: -ms-linear-gradient(to bottom, rgba(255,255,255,0.2) 51%, rgba(0,0,0,0.2) 51%),url(../assets/sv.jpg) center center no-repeat;
            background: linear-gradient(to bottom, rgba(255,255,255,0.2) 51%, rgba(0,0,0,0.2) 51%),url(../assets/sv.jpg) center center no-repeat;
          }
          .en:hover{
            background: -moz-linear-gradient(to bottom, rgba(200,200,200,0.2) 51%, rgba(0,0,0,0.4) 51%),url(../assets/sv.jpg) center center no-repeat;
            background: -webkit-linear-gradient(to bottom, rgba(200,200,200,0.2) 51%, rgba(0,0,0,0.4) 51%),url(../assets/sv.jpg) center center no-repeat;
            background: -o-linear-gradient(to bottom, rgba(200,200,200,0.2) 51%, rgba(0,0,0,0.4) 51%),url(../assets/sv.jpg) center center no-repeat;
            background: -ms-linear-gradient(to bottom, rgba(200,200,200,0.2) 51%, rgba(0,0,0,0.4) 51%),url(../assets/sv.jpg) center center no-repeat;
            background: linear-gradient(to bottom, rgba(200,200,200,0.2) 51%, rgba(0,0,0,0.4) 51%),url(../assets/sv.jpg) center center no-repeat;
          }
          .en:active{
            background: -moz-linear-gradient(to bottom, rgba(0,0,0,0.4) 51%, rgba(200,200,200,0.2) 51%),url(../assets/sv.jpg) center center no-repeat;
            background: -webkit-linear-gradient(to bottom, rgba(0,0,0,0.4) 51%, rgba(200,200,200,0.2) 51%),url(../assets/sv.jpg) center center no-repeat;
            background: -o-linear-gradient(to bottom, rgba(0,0,0,0.4) 51%, rgba(200,200,200,0.2) 51%),url(../assets/sv.jpg) center center no-repeat;
            background: -ms-linear-gradient(to bottom, rgba(0,0,0,0.4) 51%, rgba(200,200,200,0.2) 51%),url(../assets/sv.jpg) center center no-repeat;
            background: linear-gradient(to bottom, rgba(0,0,0,0.4) 51%, rgba(200,200,200,0.2) 51%),url(../assets/sv.jpg) center center no-repeat;
          }

          #categories-wrapper{
            grid-column: 1/7;
            grid-row:2;
          }
          #bck-btn{
            grid-column: 1/2;
            grid-row: 3;
            border: 1px solid #7a7a7a;
            color:white;
            background: -moz-linear-gradient(to bottom, #ff4d4d 51%, #ff0000 51%);
            background: -webkit-gradient(linear,left top, left bottom, color-stop(51%,#ff4d4d), color-stop(51%,#ff0000));
            background: -webkit-linear-gradient(to bottom, #ff4d4d 51%,#ff0000 51%);
            background: -o-linear-gradient(to bottom, #ff4d4d 51%,#ff0000 51%);
            background: -ms-linear-gradient(top, #ff4d4d 51%,#ff0000 51%);
            background: linear-gradient(to bottom, #ff4d4d 51%,#ff0000 51%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff4d4d', endColorstr='#ff0000',GradientType=0 );
          }

          #bck-btn:hover{
            background: -moz-linear-gradient(to bottom, #ff0000 51%, #b30000 51%);
            /*background: -webkit-gradient(linear,left top, left bottom, color-stop(51%,#ff4d4d), color-stop(51%,#ff0000));*/
            background: -webkit-linear-gradient(to bottom, #ff0000 51%,#b30000 51%);
            background: -o-linear-gradient(to bottom, #ff0000 51%,#b30000 51%);
            background: -ms-linear-gradient(top, #ff0000 51%,#b30000 51%);
            background: linear-gradient(to bottom, #ff0000 51%,#b30000 51%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff0000', endColorstr='#b30000',GradientType=0 );
          }

          #price-div{
            text-align: center;
            font-size: 2em;
            grid-column:3/5;
            grid-row:3;
          }

          #next-btn{
            border:1px solid #7a7a7a;
            grid-column: 6/7;
            grid-row:3;
            color:white;
            background: -moz-linear-gradient(to bottom, #70db70 51%, #33cc33 51%);
            background: -webkit-gradient(linear,left top, left bottom, color-stop(51%,#70db70), color-stop(51%,#33cc33));
            background: -webkit-linear-gradient(to bottom, #70db70 51%,#33cc33 51%);
            background: -o-linear-gradient(to bottom, #70db70 51%,#33cc33 51%);
            background: -ms-linear-gradient(top, #70db70 51%,#33cc33 51%);
            background: linear-gradient(to bottom, #70db70 51%,#33cc33 51%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#70db70', endColorstr='#33cc33',GradientType=0 );
          }

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
          .avbryt{ /* Avbryt-knappen */
            float: left;
          }
          #order-btn{
            grid-column: 6/7;
            grid-row:4;
            margin-bottom: 20px;
            padding:20px 30px 20px 30px;
            font-size: 2em;
            background-color: rgb(0, 150, 0);
          }
          #order-btn:hover{
            color:black;
            background-color: rgb(0, 200, 0);
          }

          button{
            background-color: #ddd;
            border: none;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            margin: 4px 2px;
            cursor: pointer;
            border-radius: 16px;
              text-shadow: 1px 1px 2px black;
          }
          button:hover{
            background-color: #000;
            color: white;
          }
          </style>

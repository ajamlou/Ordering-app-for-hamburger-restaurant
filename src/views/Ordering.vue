<template>
  <div class="masterDiv">
    <link href="https://fonts.googleapis.com/css?family=Allerta+Stencil|Luckiest+Guy|Montserrat|Syncopate:700" rel="stylesheet">
    <button v-on:click="switchLang();checkLang()"
    id="lang-btn"
    :class="{'sv' : isSv, 'en' : !isSv }">{{ uiLabels.language }}</button>
    <div id="header-title">
      <h1 v-if="currentView==='designPage'">{{uiLabels.yourOrder}}</h1>
      <h1 v-if="currentView==='checkoutPage'">{{uiLabels.checkout}}</h1>
      <h1 v-if="currentView==='favoritesPage'">{{uiLabels.chooseAFavorite}}</h1>
    </div>

    <OrderingViewFrontPage
    @Visibility="changeView"
    v-if = "currentView === 'frontPage'"
    :uiLabels="uiLabels"
    class="viewContent">
  </OrderingViewFrontPage>

  <button
  id = "bck-btn"
  v-if = "this.breadcrumbs.length != 0"
  @click= "goBack">
  {{ uiLabels.back }}</button>

  <FavoritesPage
  v-if = "currentView === 'favoritesPage'"
  class="viewContent"
  @clearburger = "resetBurger"
  @fav-ingredient = "addToMenu"
  @fav-checkout = "addToCheckout();changeView('checkoutPage');"
  :ingredients="ingredients"
  :lang = "lang"
  :menu = "menusArray"
  :uiLabels = "uiLabels"
  :favoriteBurgers = "favoriteBurgers"
  :ingredient_ids = "ingredient_ids">
</FavoritesPage>

<CheckoutPage
class="viewContent"
v-if = "currentView === 'checkoutPage'"
:uiLabels="uiLabels"
:menus="menusArray"
:orderNumber="orderNumber"
:lang="lang"
@go_to_front="changeView"
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
<div slot="header"></div>
<div slot="body">{{uiLabels.noIngredients}}</div>
<div slot="footer"><button
  type="button"
  class="btn-close"
  @click="toggleSlotModal()">
  {{uiLabels.OKlabel}}
</button></div>
</SlotModal>

<div
id="designPage-backdrop"
class="viewContent"
v-if = "currentView === 'designPage'">
<div
id="ordering">
<!--<img class="example-panel" src="@/assets/exampleImage.jpg"> -->

<div id= "bestallning"><h2>{{ uiLabels.myBurger }}</h2></div>
<div id="r2-div"> <!--Div för row 2 i ordering grid -->
  <div id="gluten-exp">
    <img src="../assets/gluten.png" class="icon"><span>{{uiLabels.gluten}}</span>
  </div>
  <div id="dairy-exp">
    <img src="../assets/dairy.png" class="icon"><span>{{uiLabels.dairy}}</span>
  </div>
  <div id="vegan-exp">
    <img src="../assets/vegan.png" class="icon"><span>{{uiLabels.vegan}}</span>
  </div>
</div>


<div id="categories-wrapper">
  <CategoryRow
  v-for="category in burgerCategories"
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

<div id="extras">
<h2>{{uiLabels.extras}}</h2>

<CategoryRow
v-for="category in extrasCategories"
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
</div>
<div id="price-div">
  {{uiLabels.sum}}: {{price}}:-
</div>
<button id="next-btn" @click="addToCheckout();changeView('checkoutPage');">{{uiLabels.next}}</button>
</div>
</div>
</div>
</template>
<script>
//import the components that are used in the template, the name that you
//use for importing will be used in the template above and also below in
//components
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
      ingredient_ids:[1,2,3,4,5,6,7,8,9], /*Denna har ingredient-id för alla favoritingredienser*/
      breadcrumbs:[], /*Denna sparar i vilken ordning olika views har ändrats i*/
      price: 0,
      favoriteIngredients: [],
      favoriteBurgers: [],
      favoritePrice:0,
      orderNumber: 0,
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
                  if(view === 'favoritesPage'){
                    this.changeFavorites();
                  }
                  this.breadcrumbs.push(this.currentView); /*Lägger till föregående view i breadcrumbs*/
                  this.currentView = view;
                },
                changeFavorites: function(){
                  for (var i = 0; i< this.ingredient_ids.length; i++){
                    this.favoriteIngredients.push(this.ingredients.find(ingredient=>ingredient.ingredient_id === this.ingredient_ids[i])); /*lägger favoritingredienser i en array*/
                    this.favoritePrice += (this.ingredients.find(ingredient=>ingredient.ingredient_id === this.ingredient_ids[i])).selling_price; /*räknar ut priset för de ingredienserna*/
                    if(this.favoriteIngredients.length === 3){ /* tar de första 3 ingredienserna och priset för dem och lägger in de i en array*/
                      this.favoriteIngredients.push(this.favoritePrice)
                      this.favoriteBurgers.push(this.favoriteIngredients);
                      this.favoriteIngredients = []; /*nollställer favortieIngredients arrayen och favoritpriset*/
                      this.favoritePrice = 0;
                    }
                  }
                  console.log(this.favoriteBurgers);
                },
                /*goBack hämtar senast föregående view från breadcrumbs och tar sedan bort den från minnet*/
                goBack: function(){
                  /*Om vi ändrar en order och sedan klickar på tillbaka, lägg tilbaka ordern i ordersArray*/
                  if(this.isModifying){
                    this.addToCheckout();
                  }
                  /*Om vi backar från checkout, ta bort senaste ordern*/
                  if(this.currentView==='checkoutPage'){
                    this.menusArray.pop();
                  }
                  if(this.breadcrumbs.length>0){
                    this.currentView = this.breadcrumbs[this.breadcrumbs.length -1];
                    this.breadcrumbs.pop();

                    /*Om vi kommer till favoriter igen, nollställ burgaren*/
                    if(this.currentView==="favoritesPage"){
                      this.resetBurger();
                    }
                  }
                },
                addToMenu: function (item) {
                  this.showIngredientsModal = false;
                  this.categoryItemCounter[item.category -1]+=1;
                  this.chosenIngredients.push(item);
                  this.price += +item.selling_price;
                  console.log(item);
                },
                removeFromMenu: function(item,index) {
                  this.chosenIngredients.splice(index,1);
                  this.categoryItemCounter[item.category-1]-=1;
                  this.price -= item.selling_price;
                },
                modifyMenu:function(ingredients,units,index,itemCounter){
                  this.chosenIngredients=ingredients;
                  this.categoryItemCounter=itemCounter;
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
                    "units":this.units,
                    "itemCount":this.categoryItemCounter};

                    if(this.isModifying){
                      /*Om vi ändrar i en order, lägg tillbaka ordern på samma index i menusArray*/
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
              min-height:100vh;
              margin-top:0 !important;
              padding-top:0 !important;
              background-color:#f8ffd6;
              background:url('../assets/bg3.png');
              display: grid;
              grid-template-columns: repeat(6, 1fr);
              grid-template-rows: 100px;
              grid-auto-rows: auto;
            }
            #lang-btn{
              grid-column:6/7;
              grid-row:1;
              color:white;
              font-weight: 700;
              width:120px;
              height:80px;
              border:1px solid #7a7a7a;
              margin: auto;
            }
            #header-title{
              grid-column:3/5;
              grid-row:1;
              text-align: center;
              align-self: center;
              font-family: 'Luckiest Guy', sans-serif;
              color: #66d9ff;
              text-transform: uppercase;
              text-shadow: 2px 2px #0086b3;
            }
            .viewContent{
              grid-row: 2;
              grid-column: 1/7;
            }
            #designPage-backdrop{
              background-color: rgba(255,255,255,0.7);
              border-radius:15px;
              width:95%;
              justify-self:center;
              margin-bottom:2em;
              padding-bottom:1em;
              margin-top:2em;
              -webkit-box-shadow: 10px 7px 14px 0px rgba(158,158,158,1);
-moz-box-shadow: 10px 7px 14px 0px rgba(158,158,158,1);
box-shadow: 10px 7px 14px 0px rgba(158,158,158,1);
            }
            #ordering {
              display:grid;
              grid-template-columns: repeat(6, 1fr);
              margin:50px auto auto auto;
              width: 90%;
            }
            #ordering h2{
              font-weight: bolder;
              text-transform: uppercase;/*
              font-family: 'Luckiest Guy', sans-serif;
              color: #66d9ff;
              text-shadow: 2px 2px #0086b3;*/
            }
            #extras{
              margin-top:2em;
            }

            #bestallning{
              grid-column: 1 / 4;
              grid-row: 1;
              text-align: left;
            }
            #r2-div{
              grid-row:1/2;
              grid-column: 4/7;
              display:grid;
              grid-template-columns: repeat(3,1fr);
              grid-template-rows: auto;
              font-size:1em;
            }
            .icon{
              height:3em;
              padding:0 3px 3px 0;
            }

            /*Nedan ser rätt rörigt ut, men det är bara för att det ska funka på alla webbläsare.
            Vi bestämmer en bakgrundsbild och lägger på lite skuggor å sånt*/
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
              grid-row: 1;
              border: 1px solid #7a7a7a;
              color:white;
              width:120px;
              height:80px;
              margin:auto;
              justify-self:center;
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
            #next-btn:active{border: 2px solid #595959;}

            #price-div{
              justify-self: center;
              margin:auto;
              text-align:center;
              font-size: 2em;
              grid-column:3/5;
              grid-row:3;
            }

            #next-btn{
              width:120px;
              height:80px;
              justify-self:end;
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
            #next-btn:active{border: 2px solid #595959;}
            #next-btn:hover{
              background: -moz-linear-gradient(to bottom, #33cc33 51%, #248f24  51%);
              /*background: -webkit-gradient(linear,left top, left bottom, color-stop(51%,#ff4d4d), color-stop(51%,#ff0000));*/
              background: -webkit-linear-gradient(to bottom, #33cc33 51%,#248f24 51%);
              background: -o-linear-gradient(to bottom, #33cc33 51%,#248f24 51%);
              background: -ms-linear-gradient(top, #33cc33 51%,#248f24 51%);
              background: linear-gradient(to bottom, #33cc33 51%,#248f24 51%);
              filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#33cc33', endColorstr='#248f24',GradientType=0 );
            }


            .btn-close{
              background-color: #33cc33;
              border-radius: 10px;
              margin-top: 10vh;
              position: relative;
            }

            .ingredient{
              border: 1px solid #ccd;
              background-color: rgba(255, 255, 255, 0.5);
              color: rgb(100,100,100);
              border-radius: 15px;
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
            /* #order-btn{
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
          } */

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
          @media screen and (max-width:1206px){ /*När category-row bryts, skifta plats på alla element*/
            #bestallning{
              grid-column: 1/7;
              grid-row:1/2;
              text-align:center;
            }
            #r2-div{
              grid-column:1/7;
              grid-row:2/3;
              text-align:center;
              justify-items: center;
              align-items: center;
              justify-content: center;
              align-content: center;
            }
            #categories-wrapper{
              grid-row:3/4;
            }
            #price-div, #next-btn{
              grid-row:4/5;
            }
          }
          @media screen and (max-width:1206px){

            #ordering{
              margin:10px auto auto auto;
            }

          }
          @media screen and (max-width:650px){
            #header-title{
              grid-column:2/6;
            }
            #header-title h1{
              font-size:2.3em;
            }
            .icon{
              display:block;
              margin:auto;
            }
            #bck-btn,#lang-btn{
              width:90px;
              height:50px;
              padding:0;
            }
            h2{
              font-size:1.8em;
            }
          }
          @media screen and (max-width:480px){
            #next-btn{
              grid-row:4;
            }

          }
          </style>

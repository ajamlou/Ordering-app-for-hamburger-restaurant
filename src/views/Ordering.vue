<template>
  <div class="masterDiv">
    <link href="https://fonts.googleapis.com/css?family=Allerta+Stencil|Luckiest+Guy|Montserrat|Syncopate:700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Poiret+One" rel="stylesheet">
    <button v-on:click="switchLang();checkLang()"
    id="lang-btn"
    :class="{'sv' : isSv, 'en' : !isSv }">{{ uiLabels.language }}</button>


    <OrderingViewFrontPage
    @Visibility="changeView"
    v-if = "currentView === 'frontPage'"
    :uiLabels="uiLabels"
    :breadcrumbs="breadcrumbs"
    class="viewContent">
  </OrderingViewFrontPage>

  <button
  id = "bck-btn"
  v-if = "this.breadcrumbs.length != 0"
  @click= "goBack">
  {{ uiLabels.back }}</button>

  <designPage
  v-if="currentView==='designPage'"
  class="viewContent"
  :categoryItemCounter="categoryItemCounter"
  :chosenIngredients="chosenIngredients"
  :price="price"
  :burgerCategories="burgerCategories"
  :extrasCategories="extrasCategories"
  :uiLabels="uiLabels"
  :lang="lang"
  @remove_from_menu="removeFromMenu"
  @info_to_modal="toggleShowIngredientsModal"
  @cancel_btn_modal="cancelBtnModal"
  @add_to_checkout="addToCheckout"
  @change_view="changeView">
</designPage>

<FavoritesPage
class = "viewContent"
v-if = "currentView === 'favoritesPage'"
:ingredients="ingredients"
:lang = "lang"
:uiLabels = "uiLabels"
:favBurgers = "favBurgers"
:extrasCategories = "extrasCategories"
:chosenIngredients="chosenIngredients"
:categoryItemCounter="categoryItemCounter"
@remove_ingredient="removeFromMenu"
@info_to_modal="toggleShowIngredientsModal"
@addToCheckout = "addToCheckout"
@change_view = "changeView"
@clear_all="clearAll"
@remove_backButton="removeBackButton">
</FavoritesPage>


<CheckoutPage
class="viewContent"
v-if = "currentView === 'checkoutPage'"
:uiLabels="uiLabels"
:menus="menusArray"
:orderNumber="orderNumber"
:lang="lang"
@remove_backButton="removeBackButton"
@change_view="changeView"
@new_burger="newBurger"
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

<div class="slotModalClass">
  <SlotModal
  v-if="this.showSlotModal && this.noIngredientModal">
  <div slot="header"></div>
  <div slot="body">{{uiLabels.noIngredients}}</div>
  <div slot="footer"><button
    type="button"
    class="btn-close"
    @click="toggleSlotModal()">
    {{uiLabels.OKlabel}}
  </button></div>
</SlotModal>

<SlotModal
v-if="this.showSlotModal && this.pressedAbortModal">
<div slot="header"></div>
<div slot="body">{{uiLabels.areYouSure}}</div>
<div slot="footer" class="slotButtons">
  <button
  type="button"
  id="noBtn"
  @click="toggleSlotModal()">
  {{uiLabels.dontAbort}}
</button>
<button
type="button"
id="yesBtn"
@click="toggleSlotModal();changeView('frontPage');clearAll();removeBackButton();">
{{uiLabels.abort}}
</button>
</div>
</SlotModal>
</div>



</div>
</template>
<script>
//import the components that are used in the template, the name that you
//use for importing will be used in the template above and also below in
//components
//import PlusButton from '@/components/PlusButton.vue'
import DesignPage from '@/components/DesignPage.vue'
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
    CheckoutPage,
    DesignPage
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
      orderNumber: 0,
      menusArray:[], /*Sparar enskilda menyer i en array*/
      units:1, /*Extra viktig främst när vi ändrar en meny*/
      modifyMenuIndex:0, /*Håller koll så att när en meny ändras från checkout läggs burgaren tillbaka på samma ställe igen*/
      isModifying:false, /*Ändras till true när vi ändrar en meny, har effekt på addToCheckout*/
      modalCategory:0,
      showIngredientsModal: false,
      showSlotModal: false,
      noIngredientModal: false,
      pressedAbortModal: false,
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
                /*När komponenten skapas fås ett orderNumber*/
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
                /*Aktiverar slotModal*/
                toggleSlotModal:function(){
                  this.showIngredientsModal = false;
                  if(!this.showSlotModal){
                    this.showSlotModal=true;
                  }
                  else{
                    this.showSlotModal=false;
                  }
                },
                /*Bestämmer content till slotModal, denna är för tom beställning*/
                nextBtnModal:function(){
                  this.pressedAbortModal = false;
                  this.noIngredientModal = true;
                  this.toggleSlotModal();
                },
                /*Bestämmer content till slotModal, denna är för avbryta beställning*/
                cancelBtnModal:function(){
                  this.noIngredientModal = false;
                  this.pressedAbortModal = true;
                  this.toggleSlotModal();
                },

                /*togglar ingrediensmodalen och bestämmer vilken kategori av ingredienser som ska visas*/
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
                /*Byter vy mellan design, frontpage, checkout osv*/
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
                  if(this.currentView==="favoritesPage"){
                    this.resetBurger();
                  }
                  /*Om vi backar från checkout, ta bort senaste ordern*/
                  if(this.currentView==='checkoutPage'){
                    this.menusArray.pop();
                  }
                  if(this.breadcrumbs.length>0){
                    this.currentView = this.breadcrumbs[this.breadcrumbs.length -1];
                    this.breadcrumbs.pop();
                  }
                },
                /*Lägger till en ingrediens till menyn samt lägger till
                +1 i categoryitemcounter*/
                addToMenu: function (item) {
                  this.showIngredientsModal = false;
                  this.categoryItemCounter[item.category -1]+=1;
                  this.chosenIngredients.push(item);
                  this.price += +item.selling_price;
                },
                /*Tar bort ingrediens samt drar bort -1 från categoryitemcounter*/
                removeFromMenu: function(item,index) {
                  this.chosenIngredients.splice(index,1);
                  this.categoryItemCounter[item.category-1]-=1;
                  this.price -= item.selling_price;
                },
                /*När en meny ändras från checkout ser denna funktion till
                att ingredienserna från menyn laddas tillbaka korrekt in i designpage*/
                modifyMenu:function(ingredients,units,index,itemCounter){
                  this.chosenIngredients=ingredients;
                  this.categoryItemCounter=itemCounter;
                  this.units=units;
                  this.modifyMenuIndex=index;
                  this.isModifying = true;
                  this.changeView('designPage');
                },
                /*nollställer breadcrumbs (döljer back-button)*/
                removeBackButton:function(){
                  this.breadcrumbs=[];
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
                    this.nextBtnModal();
                  }
                },
                // newMenu:function(){
                //   this.resetBurger();
                //   this.changeView('designPage');
                // },

                /*Denna ropas på från checkout för att nollställa alla burgar-relaterade
                arrayer och byter vy till frontpage*/
                newBurger:function(){
                  this.resetBurger();
                  this.changeView('frontPage');
                },
                /*Nollställer allt, ropas på när en order blivit lagd
                eller ett köp avbrutits*/
                clearAll:function(){
                  this.resetBurger();
                  this.menusArray=[];
                },
                resetFavBurger:function(){
                  this.categoryItemCounter=this.categoryItemCounter.map(()=>0);/*Nollställer arrayen*/
                  this.chosenIngredients = this.chosenIngredients.filter(ingredient => ingredient.category > 4);
                  console.log(this.chosenIngredients)
                  this.price = 0;
                },
                /*Nollställer alla variabler som har med att skapa burgare att göra*/
                resetBurger:function(){
                  this.categoryItemCounter=this.categoryItemCounter.map(()=>0);/*Nollställer arrayen*/
                  this.chosenIngredients = [];
                  this.price = 0;
                }

              }
            }
            </script>
            <style scoped>
            /* scoped in the style tag means that these rules will only apply to elements, classes and ids in this template and no other templates. */
            .masterDiv{
              font-family: 'Poiret One', sans-serif;
              min-height:100vh;
              margin-top:0 !important;
              padding-top:0 !important;
              background-color:#f8ffd6;
              /* background:url('../assets/chessboard.jpg'); */
              display: grid;
              grid-template-columns: repeat(6, 1fr);
              grid-column-gap: 3vw;
              grid-template-rows: 100px;
              grid-auto-rows: auto;

              /* Här nedan görs bakgrunds schackrutorna: */
              background-color: rgb(255, 250, 224); /*beigegul*/
              background-image:
              linear-gradient(45deg, #444444 25%, transparent 25%, transparent 75%, #444444 75%, #444444),
              linear-gradient(45deg, #444444 25%, transparent 25%, transparent 75%, #444444 75%, #444444);
              background-size: 100px 100px;
              background-position: 0 0, 50px 50px;
            }
            #favorites{
              grid-column: 1/7;
              grid-row:0/1;
            }
            #extras-favorites{
              grid-column: 1/7;
              grid-row:3;
              display: grid;
              grid-template-columns: repeat(6, 1fr);
              grid-template-rows: 50px 250px 50px;
            }
            #fav-category{
              grid-column-start: 1;
              grid-column-end: 7;
              grid-row: 2;
            }
            #fav-next-btn{
              grid-column-start: 6;
              grid-column-end: 7;
              grid-row-start: 3;
              grid-row-end: 4;
            }

            #bck-btn:hover{
              background-color: #a01533; /*matchar #e51e4a; - mörkrosa*/
              border-color: #000000;
            }

            .slotButtons{
              grid-template-columns: repeat(6, 1fr);
            }

            #yesBtn{
              grid-column: 2/3;
              background-color: #e51e4a;
              border: 1px solid #7a7a7a;
              height: 10vh;
            }
            #yesBtn:hover{
              background-color: #a01533; /*matchar #e51e4a; - mörkrosa*/
              border-color: #000000;
            }
            #noBtn{
              grid-column: 4/5;
              background-color: #c5e5be;
              border:1px solid #7a7a7a;
              height: 10vh;
            }
            #noBtn:hover{
              background-color: #89a085;
              border-color: #000000;
            }

            #lang-btn{
              grid-column:6;
              grid-row:1;
              width:100px;
              height:50px;
              /* border:1px solid #7a7a7a; */
              background-color: #b9d7cb; /*ljusturkos*/
              padding: 0;
            }
            #lang-btn:hover{
              background-color: #6f8179;
              border-color: #000000;
            }
            #bck-btn,#lang-btn{
              align-self: center;
              justify-self: center;
            }

            /*---------------------- För språkknappen sv/eng -------------*/
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
            .viewContent{
              grid-row: 2;
              grid-column: 1/7;
            }

            #extras, #extras-favorites{
              margin-top:2em;
            }
            #bck-btn{
              grid-column: 1;
              grid-row: 1;
              background-color: #e51e4a;
              /* border: 1px solid #7a7a7a; */
              width:100px;
              height:50px;
              margin:auto;
              justify-self:center;
              font-size: 35px;
              padding: 0;
            }
            #next-btn:active{border: 2px solid #595959;}

            #next-btn{
              width:120px;
              height:80px;
              justify-self:end;
              /* border:1px solid #7a7a7a; */
              grid-column: 6/7;
              grid-row:4;
              background-color: #c5e5be;}
              /* #next-btn:active{border: 2px solid #595959;} */
              #next-btn:hover{
                background-color: #89a085;
                border-color: #000000;
                /* background: -moz-linear-gradient(to bottom, #33cc33 51%, #248f24  51%); */
                /*background: -webkit-gradient(linear,left top, left bottom, color-stop(51%,#ff4d4d), color-stop(51%,#ff0000));*/
                /* background: -webkit-linear-gradient(to bottom, #33cc33 51%,#248f24 51%);
                background: -o-linear-gradient(to bottom, #33cc33 51%,#248f24 51%);
                background: -ms-linear-gradient(top, #33cc33 51%,#248f24 51%);
                background: linear-gradient(to bottom, #33cc33 51%,#248f24 51%);
                filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#33cc33', endColorstr='#248f24',GradientType=0 ); */
              }

              .btn-close{
                background-color: #33cc33;
                border-radius: 10px;
                /* position: relative; */
                width: 2em;
                height: 2em;
                font-size: 2em;
                color: white;
              }

              button{
                color: black;
                text-transform: uppercase;
                border-color: black;
                border-width: thin;
                text-align: center;
                display: inline-block;
                margin: 4px 2px;
                cursor: pointer;
                border-radius: 16px;
                font-size: 20px;
              }
              button:hover{
                background-color: #000;
              }

              /*------------------ CSS för ipad/mobiler-isch ------------*/
              @media screen and (max-width:1206px){ /*När category-row bryts, skifta plats på alla element*/
                #designPage-title{
                  grid-row: 1;
                  text-align: center;
                  font-size: 12vw;
                }
                #bestallning{
                  grid-column: 1/7;
                  grid-row:3;
                  text-align:center;
                }
                #r2-div{
                  grid-column:1/7;
                  grid-row:2;
                  text-align:center;
                  justify-items: center;
                  align-items: center;
                  justify-content: center;
                  align-content: center;
                }
                #categories-wrapper{
                  grid-row:4;
                }
                /*#price-div{
                grid-row:5;
              } */
              #ordering h2{
                font-size: 5vw;
              }
            }
            #ordering{
              margin:10px auto auto auto;
            }

            /* -------------------- CSS för mobiler -----------------*/
            @media screen and (max-width:740px){
              #bck-btn,#lang-btn{
                width:90px;
                height:50px;
                padding:0;
              }
            }
            </style>

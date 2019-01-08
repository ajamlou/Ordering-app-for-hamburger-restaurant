
<template>
  <div id="masterDivKitchen">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">

    <button
    id="backButton"
    @click="currentView = 'kitchenFrontPage'"
    v-if = "currentView != 'kitchenFrontPage'">
    {{ uiLabels.back2 }}
  </button>

  <div
  class="contentPage"
  v-if = "currentView === 'kitchenFrontPage'">
  <KitchenViewFrontPage
  @Visibility="changeView"
  v-if = "currentView === 'kitchenFrontPage'"
  :ingredients="ingredients"
  :orders="orders"
  :uiLabels="uiLabels">
</KitchenViewFrontPage>
</div>


<!-- Om modalen för ändra favoriter ska visas eller ej -->
<ChangeFavorites v-if ="currentView === 'f'"
:ingredients= "ingredients"
:favBurgers= "favBurgers">
</ChangeFavorites>

<!-- GrillView -->
<!-- Använder class = grillPage i denna div för att sen kunna "skriva över"
med ett id i GrillView.vue -->
<div class="contentPage"
v-show="currentView === 'grillPage'">
<GrillView
:ingredients="ingredients"
:uiLabels="uiLabels"
:orders="orders"
:lang="lang">
</GrillView>
</div>

<!-- PreppView -->
<!-- Använder class = preppPage i denna div för att sen kunna "skriva över"
med ett id i PreppView.vue -->
<PreppView
class="contentPage"
v-show="currentView === 'preppPage'"
:ingredients="ingredients"
:uiLabels="uiLabels"
:orders="orders"
:lang="lang">
</PreppView>
</div>

<!-- <div id="kitchen-grid" v-show="currentView === 'grillPage'"> -->

<!-- Här skapas beställningarna i "Inkomna". -->
<!-- <div id="orders">
<div id="header1">
<h1>{{ uiLabels.ordersInQueue }}</h1>
</div>
<div class="allOrders">
<OrderItemToPrepare class="toPrepare"
v-for="(order, key) in orders"
v-if="order.status === 'not-started'"
v-on:cancel = "markCanceled(key)"
v-on:done="markDone(key)"
:order-id="key"
:order="order"
:ui-labels="uiLabels"
:lang="lang"
:key="key">
</OrderItemToPrepare>
</div>
</div> -->

<!-- Här skapas beställningarna i "Tillagas". -->
<!-- <div id="preparing">
<div id="header2">
<h1>{{ uiLabels.ordersPreparing }}</h1>
</div>
<div class="allOrders">
<OrderItemIsCooking class="isPreparing"
v-for="(order, key) in orders"
v-if="order.status === 'done'"
v-on:cooked="markCooked(key)"
:order-id="key"
:order="order"
:ui-labels="uiLabels"
:lang="lang"
:key="key">
</OrderItemIsCooking>
</div>
</div> -->

<!-- <div class = "backButtonClass" @click="currentView = 'kitchenFrontPage'">
<button id = "backButton">
{{ uiLabels.back2 }}</button>
</div> -->


<!-- <div class = "statisticsButtonClass">
<button  id = "statisticsButton" @click="toggleVisibility(), decideContent('s')">STATISTIK</button>
</div>
<div class = "storageButtonClass">
<button  id = "storageButton" @click="toggleVisibility(), decideContent('l')">LAGER</button>
</div>
<div class = "selectButtonClass">
<button  id = "selectButton">MARKERA</button>
</div> -->

<!-- Om modalen för statisitk- och lagerknappen ska visas eller ej-->
<!-- <KitchenModal
@switchVisibility = "toggleVisibility"
:decideContent="decidedContent"
:ingredients = "ingredients"
v-show = "ModalVisibility === true">
</KitchenModal> -->

</template>
<script>
//import methods and data that are shared between the component and kitchen views
import KitchenModal from '@/components/KitchenModal.vue'
import ChangeFavorites from '@/components/ChangeFavorites.vue'
import StaffViewStorage from '@/components/StaffViewStorage.vue'
import StaffViewStatistics from'@/components/StaffViewStatistics.vue'
import OrderItem from '@/components/OrderItem.vue'
import OrderItemToPrepare from '@/components/OrderItemToPrepare.vue'
import OrderItemIsCooking from '@/components/OrderItemIsCooking.vue'
import OrderItemFinished from '@/components/OrderItemFinished.vue'
import sharedVueStuff from '@/components/sharedVueStuff.js'
import KitchenViewFrontPage from '@/components/KitchenViewFrontPage.vue'
import PreppView from '@/components/PreppView.vue'
import GrillView from '@/components/GrillView.vue'
import SlotModal from '@/components/SlotModal.vue'

export default {
  name: 'Ordering',
  // selectAll: false,
  components: {
    OrderItem,
    OrderItemToPrepare,
    OrderItemIsCooking,
    OrderItemFinished,
    StaffViewStorage,
    StaffViewStatistics,
    KitchenModal,
    KitchenViewFrontPage,
    PreppView,
    GrillView,
    SlotModal,
    ChangeFavorites
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
  //the ordering system and the kitchen
  data: function(){
    return {
      chosenIngredients: [],
      price: 0,
      //ModalVisibility: false,
      //decidedContent: "statistics",
      currentView: "kitchenFrontPage"
    }
  },
  methods: {
    // markDone: function (orderid) {
    //   this.$store.state.socket.emit("orderDone", orderid);
    // },
    // markCooked: function (orderid) {
    //   this.$store.state.socket.emit("orderStarted", orderid);
    // },
    // markCanceled: function (orderid) {
    //   this.$store.state.socket.emit("orderCanceled", orderid);
    // },
    changeFavorites: function(){
    },
    changeView: function(view){
      this.currentView = view;
    },
  }
}
</script>
<style scoped>

#masterDivKitchen{
  font-family: 'Montserrat', sans-serif;
  min-height:100vh;
  margin-top:0 !important;
  padding-top:0 !important;
  background-color: #7a7a7a;
  background:url('../assets/seamless-chalk.jpg');
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}

.contentPage{
  grid-row: 1;
  grid-column: 1/7;
}
#backButton {
  grid-row: 2;
  grid-column: 1;
}
#backButton:hover {background-color: #008060}
#backButton:active {border: 2px solid grey;}


</style>

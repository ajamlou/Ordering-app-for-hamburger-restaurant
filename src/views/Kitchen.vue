
<template>
  <div>
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <div id="kitchenFront" v-if = "currentView === 'kitchenFrontPage'">
      <KitchenViewFrontPage
      @Visibility="changeView"
      v-if = "currentView === 'kitchenFrontPage'">
    </KitchenViewFrontPage>
  </div>
  <div id="prepp" v-show="currentView === 'preppPage'">
    <PreppView>
    </PreppView>
    <div class = "backButtonClass" @click="currentView = 'kitchenFrontPage'">
      <button id = "backButton">
        {{ uiLabels.back2 }}
      </button>
    </div>
  </div>

  <div id="kitchen-grid" v-show="currentView === 'grillPage'">

    <!-- Här skapas beställningarna i "Inkomna". -->
    <div id="orders">
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
  </div>

  <!-- Här skapas beställningarna i "Tillagas". -->
  <div id="preparing">
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
</div>

<div class = "backButtonClass" @click="currentView = 'kitchenFrontPage'">
  <button id = "backButton">
    {{ uiLabels.back2 }}</button>
</div>


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


</div>

</div>

</template>
<script>
//import methods and data that are shared between the component and kitchen views
import KitchenModal from '@/components/KitchenModal.vue'
import StaffViewStorage from '@/components/StaffViewStorage.vue'
import StaffViewStatistics from'@/components/StaffViewStatistics.vue'
import OrderItem from '@/components/OrderItem.vue'
import OrderItemToPrepare from '@/components/OrderItemToPrepare.vue'
import OrderItemIsCooking from '@/components/OrderItemIsCooking.vue'
import OrderItemFinished from '@/components/OrderItemFinished.vue'
import sharedVueStuff from '@/components/sharedVueStuff.js'
import KitchenViewFrontPage from '@/components/KitchenViewFrontPage.vue'
import PreppView from '@/components/PreppView.vue'

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
    PreppView
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
    markDone: function (orderid) {
      this.$store.state.socket.emit("orderDone", orderid);
    },
    markCooked: function (orderid) {
      this.$store.state.socket.emit("orderStarted", orderid);
    },
    markCanceled: function (orderid) {
      this.$store.state.socket.emit("orderCanceled", orderid);
    },
    changeView: function(view){
      this.currentView = view;
    },
  }
}
</script>
<style scoped>

#kitchen-grid {
  display: grid;
  position: fixed;
  grid-template-columns: 50% 50%;
  color: white;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  height: 90vh;
  text-transform: uppercase;
}

.allOrders {
  margin-top: 10vh;
}

#header1, #header2 {
  height: 10vh;
  width: 50vw;
  position: fixed;
  font-size: 5vh;
  border-radius: 4px;
  border-bottom: 3px solid white;
  text-shadow: 2px 2px #737373;
  margin: auto;
}

#header1 {
  background: #DC143C;
}
#header2 {
  background: #FFA500;
  border-left: 3px solid white;
  border-right: 3px solid white;
}

#orders, #preparing {
  font-size: 1em;
  border: 3px solid white;
  border-radius: 6px;
  width: 50vw;
}


.toPrepare {
  width: 42%;
}
.isPreparing {
  width: 30%;
}

.toPrepare, .isPreparing {
  border: 2px solid white;
  font-size: 1.8vh;
  float: left;
  min-height: 10vh;
  width: 10vw;
  margin: 8px;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 20px;
  border: 3px solid white;
  background-color: black;
}

.isPreparing, .toPrepare,#orders, #header1, #preparing, #header2{
  overflow: auto
}

h1 {
  text-transform: uppercase;
  font-size: 1.4em;
  text-color: white;
}

/* ccskod för knappar under denna kommentar */

.backButtonClass {
  position: relative;
}

#backButton{
  border: 2px solid white;
  color: white;
  text-shadow: 2px 2px #696969;
  background-color: #00b386;
  cursor: pointer;
  padding: 5px;
  text-decoration: none;
  font-size: 4vh;
  border-radius: 18px;
  font-size: 1.9vh;
  font-size: 1.9vw;
  width: 12vw;
  height: 10vh;
  margin-top: 1vh;
  margin-left: 1vw;
  margin-bottom: 1vh;
  float: left;
}
#backButton:hover {background-color: #008060}
#backButton:active {border: 2px solid grey;}

</style>

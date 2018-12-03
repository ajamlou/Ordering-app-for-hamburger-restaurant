
<template>
  <div>

    <div id="kitchen-grid">
      <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">

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
        <OrderItemToCook class="isPreparing"
        v-for="(order, key) in orders"
        v-if="order.status === 'done'"
        v-on:cooked="markCooked(key)"
        :order-id="key"
        :order="order"
        :ui-labels="uiLabels"
        :lang="lang"
        :key="key">
      </OrderItemToCook>
    </div>
  </div>

<!-- Här skapas beställningarna i "Färdiga". -->
  <div id="finished">
    <div id="header3">
      <h1>{{ uiLabels.ordersFinished }}</h1>
    </div>
    <div class="allOrders">
      <OrderItemFinished class="orderFinished"
      v-for="(order, key) in orders"
      v-if="order.status === 'started'"
      :order-id="key"
      :order="order"
      :lang="lang"
      :ui-labels="uiLabels"
      :key="key">
    </OrderItemFinished>
  </div>
</div>

<div class = "statisticsButtonClass">
  <button  id = "statisticsButton" @click="toggleVisibility(), decideContent('s')">STATISTIK</button>
</div>
<div class = "storageButtonClass">
  <button  id = "storageButton" @click="toggleVisibility(), decideContent('l')">LAGER</button>
</div>
<div class = "selectButtonClass">
  <button  id = "selectButton">MARKERA</button>
</div>

<!-- Om modalen för statisitk- och lagerknappen ska visas eller ej-->
<KitchenModal
@switchVisibility = "toggleVisibility"
:decideContent="decidedContent"
:ingredients = "ingredients"
v-show = "ModalVisibility === true">
</KitchenModal>


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
import OrderItemToCook from '@/components/OrderItemToCook.vue'
import OrderItemFinished from '@/components/OrderItemFinished.vue'
import sharedVueStuff from '@/components/sharedVueStuff.js'

export default {
  name: 'Ordering',
  components: {
    OrderItem,
    OrderItemToPrepare,
    OrderItemToCook,
    OrderItemFinished,
    StaffViewStorage,
    StaffViewStatistics,
    KitchenModal
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
  //the ordering system and the kitchen
  data: function(){
    return {
      chosenIngredients: [],
      price: 0,
      ModalVisibility: false,
      decidedContent: "statistics"
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
    toggleVisibility: function(){
      if (this.ModalVisibility === true){
        this.ModalVisibility = false;
      }
      else {
        this.ModalVisibility = true;
      }
    },
    decideContent: function(string){
      if (string === "l"){
        this.decidedContent = "storage";
      }
      else {
        this.decidedContent = "statistics";
      }
    },
  }
}
</script>
<style scoped>

#kitchen-grid {
  display: grid;
  position: fixed;
  grid-template-columns: 25% 50% 25%;
  color: white;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  height: 99vh;
}

.allOrders {
  margin-top: 10vh;
}

#header1, #header2, #header3 {
  height: 10vh;
  line-height: 4vh;
  position: fixed;
  font-size: 4vh;
  border-radius: 4px;
  border-bottom: 3px solid white;
  text-shadow: 2px 2px #696969;
  margin: auto;
}

#header1 {
  background: #DC143C;
  width: 25vw;
}
#header2 {
  background: #FFA500;
  width: 50vw;
}
#header3 {
  background: #00FF7F;
  width: 25vw;
}

#orders, #preparing, #finished {
  font-size: 1em;
  border: 3px solid white;
  border-radius: 6px;
}

#preparing {
  width: 50vw;
  margin-right: 0;
  padding-right: 0;
}
#finished {
  margin-left: 0;
  padding-left: 0;
}
#orders, #finished {
  width: 25vw;
}

.toPrepare, .orderFinished {
  width: 42%;
}
.isPreparing {
  width: 30%;
}

.toPrepare, .isPreparing, .orderFinished {
  border: 2px solid white;
  font-size: 1.8vh;
  float: left;
  min-height: 15vh;
  margin: 8px;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 20px;
  border: 3px solid white;
  background-color: black;
}

.isPreparing, .toPrepare, .orderFinished, #orders, #header1, #preparing, #header2, #finished, #header3 {
  overflow: auto
}

h1 {
  text-transform: uppercase;
  font-size: 1.4em;
  text-color: white;
}

/* ccskod för knappar under denna kommentar */

#selectButton, #statisticsButton, #storageButton{
border: 2px solid white;
color: white;
text-shadow: 2px 2px #696969;
cursor: pointer;
padding: 15px;
text-decoration: none;
display: inline-block;
font-size: 4vh;
border-radius: 18px;
font-size: 1.9vh;
font-size: 1.9vw;
width: 12vw;
height: 10vh;
margin: 5vh;
background-color: #00b386;
}

#statisticsButton:hover {background-color: #008060}
#storageButton:hover {background-color: #008060}
#selectButton:hover {background-color: #008060}

#statisticsButton:active {border: 2px solid grey;}
#storageButton:active {border: 2px solid grey;}
#selectButton:active {border: 2px solid grey;}

.selectButtonClass, .statisticsButtonClass, .storageButtonClass{
  margin: auto;
}

</style>

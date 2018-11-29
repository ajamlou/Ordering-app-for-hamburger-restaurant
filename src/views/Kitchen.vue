
<template>
  <div>

<div class="header-grid">
    <div id="header1">
      <h1>{{ uiLabels.ordersInQueue }}</h1>
    </div>
    <div id="header2">
      <h1>{{ uiLabels.ordersPreparing }}</h1>
    </div>
    <div id="header3">
      <h1>{{ uiLabels.ordersFinished }}</h1>
    </div>
  </div>
  <div id="kitchen-grid">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">

    <div id="orders">

      <div>
        <OrderItemToPrepare class="toPrepare"
        v-for="(order, key) in orders"
        v-if="order.status == 'not-started'"
        v-on:done="markDone(key)"
        v-on:cancel = "markCanceled(key)"
        :order-id="key"
        :order="order"
        :ui-labels="uiLabels"
        :lang="lang"
        :key="key">
      </OrderItemToPrepare>
    </div>
  </div>

  <div id="preparing">

    <div>
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

<div id="finished">

  <div>
    <OrderItem class="orderFinished"
    v-for="(order, key) in orders"
    v-if="order.status === 'started'"
    :order-id="key"
    :order="order"
    :lang="lang"
    :ui-labels="uiLabels"
    :key="key">
  </OrderItem>
</div>
</div>
<div class = "statisticsButtonClass">
  <button  id = "statisticsButton" @click="toggleModal()">STATISTIK</button>
</div>
<div class = "storageButtonClass">
  <button  id = "storageButton" @click="toggleModal()">LAGER</button>
</div>
<div class = "selectButtonClass">
  <button  id = "selectButton" >MARKERA</button>
</div>

<StaffViewModals
  @switchVisibility="toggleModal"
  v-show= "modalVisibility === true">
</StaffViewModals>
<!-- <div class="backButtonClass">
  <button id = "backButton" @click = "backButton"> STATISTIK </button>
</div> -->
</div>

</div>

</template>
<script>
import StaffViewModals from '@/components/StaffViewModals.vue'
import OrderItem from '@/components/OrderItem.vue'
import OrderItemToPrepare from '@/components/OrderItemToPrepare.vue'
import OrderItemToCook from '@/components/OrderItemToCook.vue'
//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'
export default {
  name: 'Ordering',
  components: {
    OrderItem,
    OrderItemToPrepare,
    OrderItemToCook,
    StaffViewModals
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
  //the ordering system and the kitchen
  data: function(){
    return {
      chosenIngredients: [],
      price: 0,
      modalVisibility: false
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
      this.$store.state.socket.emit("markOrderCanceled", orderid);
    },
    toggleModal: function(){
      if (this.modalVisibility === true){
        this.modalVisibility = false;
      }
      else {
        this.modalVisibility = true;
      }
    },
    // backButton: function(){
    //   this.kitchenButtonData = "no show";
    // }
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

.header-grid {
  position: fixed;
  display: grid;
  grid-template-columns: 25% 50% 25%;
  color: white;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  height: 99vh;
}

#header1, #header2, #header3 {
  height: 10vh;
  line-height: 4vh;
  position: relative;
  font-size:16pt;
  border-radius: 4px;
  border: 1px solid white;
  text-shadow: 2px 2px #696969;
  margin: auto;
  font-size: 3vh;
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
  border: 2px solid white;
  border-radius: 6px;
}

#preparing {
  width: 50vw;
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
  height: 15vh;
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
width: 12vw;
height: 10vh;
margin: 5vh;
background-color: #00b386;
}

#statisticsButton:hover {background-color: #008060}
#storageButton:hover {background-color: #008060}
#selectButton:hover {background-color: #008060}

.selectButtonClass, .statisticsButtonClass, .storageButtonClass{
  margin: auto;
}

</style>

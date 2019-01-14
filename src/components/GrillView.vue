<template>
  <div id="GrillGrid">

    <!-- Här skapas beställningarna i "Inkomna". -->
    <div id="orders">
      <div id="header1">
        <button id="viewBtn" @click="menuView=!menuView">Byt vy</button>
        <h1>{{ uiLabels.ordersInQueue }}</h1>
        <img class="icon" src="../assets/w-exclamation.png"/>
      </div>
      <div class = "allOrders">
        <OrderItemToPrepare class = "toPrepare"
        v-for = "(order, key) in orders"
        v-if = "order.status === 'not-started'"
        v-on:cancel = "markCanceled(key)"
        v-on:cooked = "markCooked(key)"
        :order-id = "key"
        :order = "order"
        :ui-labels = "uiLabels"
        :lang = "lang"
        :menuView="menuView"
        :key = "key"
        :ingredients="ingredients">
      </OrderItemToPrepare>
    </div>
  </div>

  <!-- Här skapas beställningarna i "Tillagas". -->
  <div id="preparing">
    <div id="header2">
      <h1>{{ uiLabels.ordersPreparing }}</h1>
      <img class="icon" src="../assets/w-spatula.png"/>
    </div>
    <div class = "allOrders">
      <OrderItemIsCooking class = "isPreparing"
      v-for = "(order, key) in orders"
      v-if = "order.status === 'started'"
      v-on:cancel = "markCanceled(key)"
      :isPrepp = "false"
      :order-id = "key"
      :order = "order"
      :ui-labels = "uiLabels"
      :lang = "lang"
      :key = "key">
    </OrderItemIsCooking>
  </div>
</div>
</div>
</template>

<script>
// import sharedVueStuff from '@/components/sharedVueStuff.js'
import OrderItemToPrepare from '@/components/OrderItemToPrepare.vue'
import OrderItemIsCooking from '@/components/OrderItemIsCooking.vue'

export default {
  name: 'Ordering',
  components: {
    OrderItemToPrepare,
    OrderItemIsCooking
  },
  props: {
    ingredients: Array,
    uiLabels: Object,
    orders: Object,
    lang: String,
    isPrepp: Boolean
  },

  data: function(){
    return {
      menuView: false
    }
  },

  methods: {
    // Metoder nedan avgör vad som ska hända när man klickar på olika knappar
    // i beställningar:
    markCanceled: function (orderid) {
      this.$store.state.socket.emit("orderCanceled", orderid);
    },
    markCooked: function (orderid) {
      this.$store.state.socket.emit("orderStarted", orderid);
    }
  }
}
</script>

<style scoped>
#GrillGrid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  height:92vh;
}
.allOrders {
  overflow-y: auto;
  overflow-x: hidden;
  height:86%;
}
#header1, #header2 {
  display:grid;
  grid-template-columns: repeat(3,1fr);
  align-items:center;
  height: 2.5em;
  text-align: center;
  width: 100%;
  font-size: 5vh;
  border-radius: 4px;
  border-bottom: 3px solid white;
  color:white;
  text-shadow: 2px 2px #737373;
}
#header1 >h1, #header2 > h1{
  grid-column: 2/3;
}
#header1 {
  background: #DC143C;
  border-right: 2px solid white;
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
  overflow:hidden;
  height:inherit;
}
#viewBtn{
  border: 2px solid white;
  color: white;
  text-shadow: 2px 2px #696969;
  cursor: pointer;
  padding: 15px;
  text-decoration: none;
  font-size: 0.5em;
  border-radius: 18px;
  background-color: #00b386;
  width:5em;
  margin: auto;
}
#viewBtn:hover{
  background-color: #018765;
}
.icon{
  height:2em;
  justify-self:end;
  grid-column:3/4;
  padding-right:5px;
}
/*----- css för de svarta beställningsboxarna: ----*/
.toPrepare, .isPreparing {
  border: 2px solid white;
  font-size: 0.85em;
  float: left;
  min-height: 5em;
  width: 31%;
  margin: 3px;
  padding: 5px;
  border-radius: 20px;
  border: 3px solid white;
  background-color: black;
  color: white;
}
</style>

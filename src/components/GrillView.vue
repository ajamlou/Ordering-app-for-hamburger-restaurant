<template>
  <div id="GrillGrid">

    <!-- Här skapas beställningarna i "Inkomna". -->
    <div id="orders">
      <div id="header1">
        <h1>{{ uiLabels.ordersInQueue }}</h1>
        <img class="icon" src="../assets/w-spatula.png"/>
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
        :key = "key">
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
      v-on:done = "markDone(key)"
      :isPrepp= "false"
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
    //   OrderItem,
    OrderItemToPrepare,
    OrderItemIsCooking
  },
  props: {
    ingredients: Array,
    uiLabels: Object,
    orders: Object,
    lang: String
  },

  data: function(){
    return {
      chosenIngredients: [],
      price: 0,
    }
  },

  methods: {
    markCanceled: function (orderid) {
      this.$store.state.socket.emit("orderCanceled", orderid);
    },
    markDone: function (orderid) {
      this.$store.state.socket.emit("orderDone", orderid);
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
  height:100%;
}

.allOrders {
  overflow-y: auto;
  overflow-x: hidden;
  height:100%;
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
  height:90vh;
}
.icon{
  height:2em;
  justify-self:end;
  grid-column:3/4;
  padding-right:5px;
}

/*----- css för de svarta beställningsboxarna ----*/
.toPrepare, .isPreparing {
  border: 2px solid white;
  font-size: 1.8vh;
  float: left;
  min-height: 5em;
  width: 30%;
  margin: 8px;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 20px;
  border: 3px solid white;
  background-color: black;
  color: white;
}
/*-------------------------------------------------*/
</style>

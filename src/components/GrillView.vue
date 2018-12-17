<template>
  <div id="masterDivGrill">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">

    <!-- Här skapas beställningarna i "Inkomna". -->
    <div id="orders">
      <div id="header1">
        <h1>{{ uiLabels.ordersInQueue }}</h1>
      </div>
      <div class = "allOrders">
        <OrderItemToPrepare class = "toPrepare"
        v-for = "(order, key) in orders"
        v-if = "order.status === 'not-started'"
        v-on:cancel = "markCanceled(key)"
        v-on:done = "markCooking(key)"
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
    </div>
    <div class = "allOrders">
      <OrderItemIsCooking class = "isPreparing"
      v-for = "(order, key) in orders"
      v-if = "order.status === 'started'"
      v-on:done = "markHide(key)"
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
  // mixins: [sharedVueStuff],

  data: function(){
    return {
      chosenIngredients: [],
      price: 0,
    }
  },

  methods: {
    markHide: function (orderid) {
      this.$store.state.socket.emit("orderHidden", orderid);
    },
    markCanceled: function (orderid) {
      this.$store.state.socket.emit("orderCanceled", orderid);
    },
    markCooking: function (orderid) {
      this.$store.state.socket.emit("orderCooking", orderid);
    }
  }
}
</script>

<style scoped>
#masterDivGrill {
  display: grid;
  grid-template-columns: repeat(2,1fr);
}

.allOrders {
  margin-top: 10vh;
}

#header1, #header2 {
  height: 10vh;
  width: 50vw;
  /*position: fixed;*/
  font-size: 5vh;
  border-radius: 4px;
  border-bottom: 3px solid white;
  text-shadow: 2px 2px #737373;
  margin: auto;
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
  width: 50vw;
}

/* .toPrepare {
width: 42%;
}
.isPreparing {
width: 30%;
} */

/*----- css för de svarta beställningsboxarna ----*/
.toPrepare, .isPreparing {
  border: 2px solid white;
  font-size: 1.8vh;
  min-height: 10vh;
  width: 10vw;
  margin: 8px;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 20px;
  border: 3px solid white;
  background-color: black;
  color: white;
}
/*-------------------------------------------------*/

.isPreparing, .toPrepare,#orders, #header1, #preparing, #header2{
  overflow: auto
}

h1 {
  text-transform: uppercase;
  font-size: 1.4em;
  text-color: white;
}
</style>

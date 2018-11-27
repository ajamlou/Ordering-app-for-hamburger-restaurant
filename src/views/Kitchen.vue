
<template>
  <div id="kitchen-grid" v-show = "kitchenControl">
<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <div id="orders">
      <div id="header1">
        <h1>{{ uiLabels.ordersInQueue }}</h1>
      </div>
      <div>
        <OrderItemToPrepare class="toPrepare"
        v-for="(order, key) in orders"
        v-if="order.status !== 'done'"
        v-on:done="markDone(key)"
        :order-id="key"
        :order="order"
        :ui-labels="uiLabels"
        :lang="lang"
        :key="key">
      </OrderItemToPrepare>
    </div>
  </div>

  <div id="preparing">
    <div id="header2">
      <h1>{{ uiLabels.ordersPreparing }}</h1>
    </div>
    <div>
      <OrderItemToPrepare class="isPreparing"
      v-for="(order, key) in orders"
      v-if="order.status !== 'done'"
      v-on:done="markDone(key)"
      :order-id="key"
      :order="order"
      :ui-labels="uiLabels"
      :lang="lang"
      :key="key">
    </OrderItemToPrepare>
  </div>
  </div>

  <div id="finished">
    <div id="header3">
      <h1>{{ uiLabels.ordersFinished }}</h1>
    </div>
    <div>
      <OrderItem class="orderFinished"
      v-for="(order, key) in orders"
      v-if="order.status === 'done'"
      :order-id="key"
      :order="order"
      :lang="lang"
      :ui-labels="uiLabels"
      :key="key">
    </OrderItem>
  </div>
</div>
</div>
</template>
<script>
import OrderItem from '@/components/OrderItem.vue'
import OrderItemToPrepare from '@/components/OrderItemToPrepare.vue'

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

export default {
  name: 'Ordering',
  components: {
    OrderItem,
    OrderItemToPrepare
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
  //the ordering system and the kitchen
  data: function(){
    return {
      chosenIngredients: [],
      price: 0,
      kitchenControl: false
    }
  },
  methods: {
    markDone: function (orderid) {
      this.$store.state.socket.emit("orderDone", orderid);
    },
    openKitchen: function(){
      this.kitchenControl = true;
    }
  }
}
</script>
<style scoped>

#kitchen-grid {
  display: grid;
  grid-template-columns: 25% 50% 25%;
  color: white;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
}

<<<<<<< HEAD
#header1 {
  background: #DC143C;
=======
#header1, #header2, #header3 {
>>>>>>> 1d20a9b801e94285105c0c66bc211b6ff2828daf
  height: 60px;
  line-height: 20px;
  font-size:16pt;
  border-radius: 4px;
  border: 0.5px solid white;
}

#header1 {
  background: #DC143C;
}
#header2 {
  background: #00BFFF;
<<<<<<< HEAD
  height: 60px;
  line-height: 20px;
  font-size:16pt;
  border-radius: 4px;
  border: 0.5px solid white;
=======
>>>>>>> 1d20a9b801e94285105c0c66bc211b6ff2828daf
}
#header3 {
  background: #00FF7F;
<<<<<<< HEAD
  height: 60px;
  line-height: 20px;
  font-size:16pt;
  border-radius: 4px;
  border: 0.5px solid white;
=======
>>>>>>> 1d20a9b801e94285105c0c66bc211b6ff2828daf
}

#orders, #finished, #preparing {
  font-size: 1em;
  border: 1px solid white;
  border-radius: 4px;
}

.toPrepare, .orderFinished {
  width: 45%;
}

.isPreparing {
  width: 30%;
}

.toPrepare, .isPreparing, .orderFinished {
  border: 2px solid white;
  float: left;
  height: 100px;
  margin: 7px;
  padding: 5px;
  box-sizing: border-box;
}

.isPreparing, .toPrepare, .orderFinished, #orders, #header1, #preparing, #header2, #finished, #header3 {
  overflow: auto
}

h1 {
  text-transform: uppercase;
  font-size: 1.4em;
  text-color: white;
}
</style>

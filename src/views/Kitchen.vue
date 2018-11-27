
<template>
  <div id="kitchen-grid">
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
      price: 0
    }
  },
  methods: {
    markDone: function (orderid) {
      this.$store.state.socket.emit("orderDone", orderid);
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
}

#header1 {
  background: #DC143C;
  height: 60px;
  line-height: 20px;
  font-size:16pt;
  border-radius: 4px;
  border: 0.5px solid white;
}

#header2 {
  background: #00BFFF;
  height: 60px;
  line-height: 20px;
  font-size:16pt;
  border-radius: 4px;
  border: 0.5px solid white;
}

#header3 {
  background: #00FF7F;
  height: 60px;
  line-height: 20px;
  font-size:16pt;
  border-radius: 4px;
  border: 0.5px solid white;
}

#orders {
  font-size:15pt;
  border: 1px solid white;
  border-radius: 4px;
}

.toPrepare {
  border: 2px solid white;
}

#preparing {
  font-size:15pt;
  border: 1px solid white;
  border-radius: 4px;
}

.isPreparing {
  border: 2px solid white;
}

#finished {
  font-size:15pt;
  border: 1px solid white;
  border-radius: 4px;
}

.orderFinished {
  border: 2px solid white;
}

#orders, #header1, #preparing, #header2, #finished, #header3 { overflow: auto }


h1 {
  text-transform: uppercase;
  font-size: 1.4em;
  text-color: white;
}
</style>

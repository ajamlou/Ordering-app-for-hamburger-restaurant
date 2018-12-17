<template>
  <div id="PreppGrid">
  <!--  <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">-->

<!-- Hit skickas beställningarna som ska tillagas. -->
      <div id="preparing">
        <div id="header1">
          <h1>{{ uiLabels.ordersPreparing }}</h1>
          <img class="icon" src="../assets/w-spatula.png"/>
        </div>
        <div class="allOrders">
          <OrderItemIsCooking class="isCooking"
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

    <!-- Här hamnar beställningarna som är färdiga. -->
    <div id="finished">
      <div id="header2">
        <h1>{{ uiLabels.ordersFinished }}</h1>
        <img class="icon" src="../assets/w-burger.png"/>
      </div>
      <div class="allOrders">
        <OrderItemFinished class="isFinished"
        v-for="(order, key) in orders"
        v-if="order.status === 'cooked'"
        v-on:done="markDone(key)"
        :order-id="key"
        :order="order"
        :lang="lang"
        :ui-labels="uiLabels"
        :key="key">
      </OrderItemFinished>
    </div>
  </div>
</div>
</template>

<script>
// import sharedVueStuff from '@/components/sharedVueStuff.js'
import OrderItemIsCooking from '@/components/OrderItemIsCooking.vue'
import OrderItemFinished from '@/components/OrderItemFinished.vue'
// import OrderItem from '@/components/OrderItem.vue'

export default {
  name: 'Ordering',
  components: {
    //   OrderItem,
    OrderItemIsCooking,
    OrderItemFinished,
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
  markCooked: function (orderid) {
    this.$store.state.socket.emit("orderCooked", orderid);
  }
 }
}
</script>

<style scoped>
#PreppGrid {
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
  text-shadow: 2px 2px #737373;
}
#header1 >h1, #header2 > h1{
  grid-column: 2/3;
}

.icon{
  height:2em;
  justify-self:end;
  grid-column:3/4;
  padding-right:5px;
}

#header1 {
  background: #FFA500;
  border-right: 2px solid white;
}

#header2 {
  background: #00FF7F;
  border-left: 2px solid white;
  border-right: 3px solid white;
}

#preparing, #finished {
  font-size: 1em;
  border: 3px solid white;
  border-radius: 6px;
  overflow:hidden;
  height:90vh;
}

/*----- css för de svarta beställningsboxarna ----*/
.isCooking, .isFinished {
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

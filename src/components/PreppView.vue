<template>
  <div id="PreppGrid">

    <!-- Hit skickas beställningarna som ska tillagas. -->
    <div id="preparing">
      <div id="header1">
        <h1>{{ uiLabels.ordersPreparing }}</h1>
        <img class="icon" src="../assets/w-spatula.png"/>
      </div>
      <div class="allOrders">
        <OrderItemIsCooking class="isCooking"
        v-for = "(order, key) in orders"
        v-if="order.status === 'started'"
        v-on:done = "markDone(key)"
        v-on:cancel = "markCanceled(key)"
        :isPrepp = "true"
        :order-id = "key"
        :order = "order"
        :ui-labels = "uiLabels"
        :lang = "lang"
        :key = "key">
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
      v-if="order.status === 'done'"
      v-on:sent="markSentOut(key)"
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
import OrderItemIsCooking from '@/components/OrderItemIsCooking.vue'
import OrderItemFinished from '@/components/OrderItemFinished.vue'

export default {
  name: 'Ordering',
  components: {
    OrderItemIsCooking,
    OrderItemFinished,
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
      chosenIngredients: [],
      price: 0,
    }
  },
  methods: {
    // Orderns status i PreppView
    markDone: function (orderid) {
      this.$store.state.socket.emit("orderDone", orderid);
    },
    markCanceled: function (orderid) {
      this.$store.state.socket.emit("orderCanceled", orderid);
    },
    markSentOut: function(orderid){
      this.$store.state.socket.emit("orderSentOut", orderid);
    }
  }
}
</script>

<style scoped>
#PreppGrid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  height:92vh;;
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
  border-bottom: 3px solid #FFFFFF;
  color:white;
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
  border-right: 2px solid #FFFFFF;
}
#header2 {
  background: #00FF7F;
  border-left: 2px solid #FFFFFF;
  border-right: 3px solid #FFFFFF;
}
#preparing, #finished {
  font-size: 1em;
  border: 3px solid #FFFFFF;
  border-radius: 6px;
  height:inherit;
  overflow:hidden;
}

/*----- css för de svarta beställningsboxarna ----*/
.isCooking, .isFinished {
  font-size: 0.85em;
  border: 2px solid #FFFFFF;
  float: left;
  min-height: 5em;
  width: 31%;
  margin: 3px;
  padding: 5px;
  border-radius: 20px;
  border: 3px solid #FFFFFF;
  background-color: #000000;
  color: #FFFFFF;
}
</style>

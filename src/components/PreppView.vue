<template>
  <div class="master-div">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <div class="prepp-grid">

<!-- Hit skickas beställningarna som ska tillagas. -->
      <div id="preparing">
        <div id="header1">
          <h1>{{ uiLabels.ordersPreparing }}</h1>
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
      </div>
      <div class="allOrders">
        <OrderItemFinished class="isFinished"
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
</div>
</div>
</template>

<script>
import sharedVueStuff from '@/components/sharedVueStuff.js'
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
  mixins: [sharedVueStuff]
}

// methods: {
//   markCooked: function (orderid) {
//     this.$store.state.socket.emit("orderStarted", orderid);
//   }
// }
</script>

<style scoped>
.prepp-grid {
  color: white;
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
  background: #FFA500;
}
#header2 {
  background: #00FF7F;
}

#preparing {
  font-size: 1em;
  border: 3px solid white;
  border-radius: 6px;
  width: 50vw;
}

/* #preparing {

margin-right: 0;
padding-right: 0;
}
#finished {
margin-left: 0;
padding-left: 0;
}
#orders, #finished {
width: 25vw;
} */

/* .toPrepare {
width: 42%;
} */
.isCooking {
  width: 60%;
}

.isFinished {
  width: 40%;
}

.isCooking, .isFinished {
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

.isCooking, .isFinished, #header1, #header2, #preparing, #finished{
  overflow: auto
}
</style>

<template>
  <div class="master-div">
    <h1>Testheader</h1>
    <div id="preparing">
      <div id="header2">
        <h1>{{ uiLabels.ordersPreparing }}</h1>
      </div>
      <div class="allOrders">
        <OrderItemIsCooking class="isPreparing"
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
  </div>
</template>

<script>
 import sharedVueStuff from '@/components/sharedVueStuff.js'
 import OrderItemIsCooking from '@/components/OrderItemIsCooking.vue'
// import OrderItemFinished from '@/components/OrderItemFinished.vue'
// import OrderItem from '@/components/OrderItem.vue'

export default {
     name: 'Ordering',
     components: {
    //   OrderItem,
       OrderItemIsCooking,
    //   OrderItemFinished,
    //   KitchenViewFrontPage,
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
<style>

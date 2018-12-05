<template>
  <div class="master-div">
    <!-- <h1>Testheader</h1> -->
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

</script>

<style scoped>
#backButton{
  border: 2px solid white;
  color: white;
  text-shadow: 2px 2px #696969;
  background-color: #00b386;
  cursor: pointer;
  padding: 5px;
  text-decoration: none;
  font-size: 4vh;
  border-radius: 18px;
  font-size: 1.9vh;
  font-size: 1.9vw;
  width: 12vw;
  height: 10vh;
  margin-top: 1vh;
  margin-left: 0;
  margin-bottom: 1vh;
}
#backButton:hover {background-color: #008060}
#backButton:active {border: 2px solid grey;}
<style>

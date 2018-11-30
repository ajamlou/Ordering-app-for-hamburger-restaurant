<template>
  <!-- Note in this component that it is using another component -->
<div>
  <OrderItem
    :ui-labels="uiLabels"
    :lang="lang"
    :order-id="orderId"
    :order="order">
  </OrderItem>
  <button id="orderCookedButton" v-on:click="orderCooked">
    {{uiLabels.ready}}
  </button>
  <!-- <button id="maximizeButton" v-on:click="maximizeOrder">
    {{uiLabels.maximize}}
  </button> -->



</div>
</template>
<script>
import OrderItem from '@/components/OrderItem.vue'

export default {
  name: 'OrderItemToCook',
  components: { OrderItem },
  props: {
    uiLabels: Object,
    order: Object,
    orderId: String,
    lang: String
  },
  methods: {
    orderCooked: function () {
      // sending 'cooked' message to parent component or view so that it
      // can catch it with v-on:cooked in the component declaration
      this.$emit('cooked');
    }
  }
}
</script>
<style scoped>
#orderCookedButton {
  background-color: #7d90b5;
  border: 1px solid white;
  border-radius: 3em;
  color: white;
}

/* #maximizeButton {
  background-color: #4dff4d;
  border: 1px solid white;
  border-radius: 3em;
  color: black;
} */

#orderCookedButton:active {border: 2px solid #d9d9d9;}
/* #maximizeButton:active {border: 2px solid #d9d9d9;} */


</style>

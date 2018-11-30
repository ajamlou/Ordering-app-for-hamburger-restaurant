<template>
  <!-- Note in this component that it is using another component -->
  <div>
    <OrderItem
    :ui-labels="uiLabels"
    :lang="lang"
    :order-id="orderId"
    :order="order">
  </OrderItem>
  <button id="cancelButton" v-on:click="cancelOrder">
      {{uiLabels.cancel}}
    </button>
    <button id="sendToPreparing" v-on:click="orderDone">
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
  name: 'OrderItemToPrepare',
  components: { OrderItem },
  props: {
    uiLabels: Object,
    order: Object,
    orderId: String,
    lang: String
  },
  methods: {
    orderDone: function () {
      // sending 'done' message to parent component or view so that it
      // can catch it with v-on:done in the component declaration
      this.$emit('done');
    },
    cancelOrder: function () {
      this.$emit('cancel');
    }
  }
}
</script>
<style scoped>


#cancelButton {
  background-color: #ff3333;
  border: 1px solid white;
  border-radius: 3em;
  color: white;
}

#maximizeButton {

}

#sendToPreparing {
  background-color: #7d90b5;
  border: 1px solid white;
  border-radius: 3em;
  color: white;
}

#cancelButton:active {border: 2px solid #d9d9d9;}
#sendToPreparing:active {border: 2px solid #d9d9d9;}


.btn-cancel {

}

</style>

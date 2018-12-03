<template>
<!-- Egen komponent för att kunna hantera det som sker i "Tillagas" enklare -->
  <div>
    <div>
      <button id="cancelButton" v-on:click="cancelOrder">
        {{uiLabels.cancel}}
      </button>
      <button id="sendToPreparing" v-on:click="orderDone">
        {{uiLabels.ready}}
      </button>
      <b-btn v-b-toggle.order-id variant = "primary">
        Toggle Collapse
      </b-btn>
    </div>
    <div>
      <b-collapse class="mt-2" visible :id = "order-id">
        <OrderItem
        :ui-labels="uiLabels"
        :lang="lang"
        :order-id="orderId"
        :order="order">
      </OrderItem>
    </b-collapse>
  </div>
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


#sendToPreparing {
  background-color: #3366ff;
  border: 1px solid white;
  border-radius: 3em;
  color: white;
}

#cancelButton:active {border: 2px solid #d9d9d9;}
#sendToPreparing:active {border: 2px solid #d9d9d9;}

#cancelButton:hover {background-color: #b30000}
#sendToPreparing:hover {background-color: #0040ff}


.btn-cancel {

}

</style>

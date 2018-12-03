<template>
<!-- Egen komponent för att kunna hantera det som sker i "Färdiga" enklare -->
  <div>
    <div>
      <b-btn v-b-toggle='orderId' id="collapsibleButton">
        +
      </b-btn>
    </div>
    <div>
      <b-collapse class="mt-2"  :id = "orderId">
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

#collapsibleButton {
  background-color: #3366ff;
  border-radius: 3em;
}

#collapsibleButton:active {border: 2px solid #d9d9d9;}
#collapsibleButton:hover {background-color: #0040ff}

</style>

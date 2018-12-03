<template>
  <!-- Egen komponent för att kunna hantera det som sker i "Inkomna" enklare -->
  <div>
  <div>
    <button id="orderCookedButton" v-on:click="orderCooked">
      {{uiLabels.ready}}
    </button>
    <b-btn v-b-toggle='orderId'  visible id= "collapsibleButton">
      +
    </b-btn>
  </div>
    <div>
    <b-collapse class="mt-2"  :id="orderId">
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
  background-color: #4dffa6;
  border: 1px solid white;
  border-radius: 3em;
  color: white;
}
#orderCookedButton:active {border: 2px solid #d9d9d9;}
#collapsibleButton:active {border: 2px solid #d9d9d9;}

#orderCookedButton:hover {background-color: #00cc66}
#collapsibleButton:hover {background-color: #0040ff}

#collapsibleButton {
  background-color: #3366ff;
  border-radius: 3em;
}

</style>

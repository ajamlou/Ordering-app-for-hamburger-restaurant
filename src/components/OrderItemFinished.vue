<template>
<!-- Egen komponent för att kunna hantera det som sker i "Färdiga" enklare -->
  <div>
      <h4>#{{orderId}}</h4>
      <button id="cancelButton" v-on:click="orderCanceled">
        {{uiLabels.remove}}
      </button>
    <div>
      <b-btn v-b-toggle='orderId' id="collapsibleButton">
        +
      </b-btn>
    </div>
    <div>
      <b-collapse class="collapsibleBtn" visible :id = "orderId">
        <OrderItem
        :ui-labels="uiLabels"
        :lang="lang"
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
    orderDone: function () { //skickar 'done' till parent som kan fånga med v-on:done
      this.$emit('done');
    },
    orderCanceled: function () { //skickar 'canceled' till parent som kan fånga med v-on:canceled
      this.$emit('canceled');
    }
  }
}
</script>
<style scoped>
#cancelButton {
  border: 1px solid white;
  border-radius: 3em;
  color: white;
  margin: 0.5vh;
}

#cancelButton {
  background-color: #ff3333;
}
#collapsibleButton {
  background-color: #3366ff;
  border-radius: 3em;
}
#cancelButton:active {border: 2px solid #d9d9d9;}
#collapsibleButton:active {border: 2px solid #d9d9d9;}

#cancelButton:hover {background-color: #b30000}
#collapsibleButton:hover {background-color: #0040ff}

</style>

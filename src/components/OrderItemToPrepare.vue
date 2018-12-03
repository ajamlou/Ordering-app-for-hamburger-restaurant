<template>
  <!-- Egen komponent för att kunna hantera det som sker i "Tillagas" enklare -->
  <div>
      <h4>#{{orderId}}</h4>
    <div>
      <b-btn v-b-toggle='orderId' id="collapsibleButton">
        +
      </b-btn>
    </div>
    <button id="cancelButton" v-on:click="cancelOrder">
      {{uiLabels.cancel}}
    </button>
    <button id="sendToPreparing" v-on:click="orderDone">
      {{uiLabels.ready}}
    </button>
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


#cancelButton, #sendToPreparing {
  border: 1px solid white;
  border-radius: 3em;
  color: white;
  margin: 0.5vh;
}

#cancelButton {
  background-color: #ff3333;
}

#sendToPreparing {
  background-color: #4dffa6;
}

#collapsibleButton {
  background-color: #3366ff;
  border-radius: 3em;
  margin: 0.5vh;
}

#cancelButton:active {border: 2px solid #d9d9d9;}
#sendToPreparing:active {border: 2px solid #d9d9d9;}
#collapsibleButton:active {border: 2px solid #d9d9d9;}

#cancelButton:hover {background-color: #b30000}
#sendToPreparing:hover {background-color: #00cc66}
#collapsibleButton:hover {background-color: #0040ff}

</style>

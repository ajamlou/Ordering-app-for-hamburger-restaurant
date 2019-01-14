<template>
<!-- Egen komponent för att kunna hantera det som sker i "Färdiga" enklare -->
  <div>
      <h4>#{{orderId}}</h4>

      <b-btn :pressed.sync="myToggle" v-b-toggle='orderId' variant="outline-primary" id="collapsibleButton">
        <strong v-if="myToggle">+</strong>
        <strong v-if="!myToggle">-</strong>
      </b-btn>

    <div>
      <b-collapse class="collapsibleBtn" visible :id = "orderId">
        <OrderItem
        :ui-labels="uiLabels"
        :lang="lang"
        :order="order">
      </OrderItem>
    </b-collapse>

    <b-btn variant="success" id="checkButton" v-on:click="orderSent">
      <strong>✓</strong>
    </b-btn>
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
  data: function () {
    return {
      myToggle: false
    }
  },
  methods: {
    orderSent: function () { //skickar 'done' till parent som kan fånga med v-on:done
      this.$emit('sent');
    }
  }
}
</script>

<style scoped>
#collapsibleButton, #checkButton {
  height: 3em;
  width: 3em;
  display: block;
  margin: auto;
  text-align: center;
  border-radius: 50%;
}

#checkButton {
  margin-top: 10px;
}

#collapsibleButton:hover {background-color: #0040ff}

</style>

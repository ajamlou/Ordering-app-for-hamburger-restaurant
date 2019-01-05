<template>
<!-- Egen komponent för att kunna hantera det som sker i "Färdiga" enklare -->
  <div>
      <h4>#{{orderId}}</h4>
    <div>
      <b-btn v-b-toggle='orderId' id="collapsibleButton">
        <strong>+</strong>
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
    <button id="cancelButton" v-on:click="orderSent">
      <strong>✓ </strong>
    </button>
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
    orderSent: function () { //skickar 'done' till parent som kan fånga med v-on:done
      this.$emit('sent');
    },
    // orderCanceled: function () { //skickar 'cancel' till parent som kan fånga med v-on:cancel
    //   this.$emit('cancel');
    // }
  }
}
</script>
<style scoped>
#collapsibleButton,#cancelButton {
  display:block;
  margin: auto;
  border:0;
  color:white;
  padding:0;
  text-align: center;
  border-radius: 50%;
}

#cancelButton {
  margin-top: 10px;
  background-color: rgb(0,150,0);
  border: 1px solid white;
  height:3em;
  width:3em;
}

#collapsibleButton {
  background-color: #3366ff;
  height:2.7em;
  width:2.7em;
}

#cancelButton:active {border: 2px solid #d9d9d9;}
#collapsibleButton:active {border: 2px solid #d9d9d9;}

#cancelButton:hover {background-color: rgb(0,100,0)}
#collapsibleButton:hover {background-color: #0040ff}

</style>

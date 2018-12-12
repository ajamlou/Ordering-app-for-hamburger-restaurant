<template>
  <!-- Egen komponent för att kunna hantera det som sker i "Tillagas" enklare -->
  <div>
    <h4>#{{orderId}}</h4>
    <div>
    <button id="orderCookedButton" v-on:click="orderCooked">
      {{uiLabels.ready}}
    </button>
    <div id="plus">
      <button @click="show = !show">+</button>
      <transition name="fade">
        <p v-if="show">
          <OrderItem
          :ui-labels="uiLabels"
          :lang="lang"
          :order="order">
        </OrderItem>
        <button id="cancelButton" v-on:click="cancelOrder">
          {{uiLabels.cancel}}
        </button>
      </p>
    </transition>
  </div>
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
  data: function () {
    return {
      show: true
    }
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
#orderCookedButton, #cancelButton {
  border: 1px solid white;
  border-radius: 3em;
  color: white;
  margin: 1.5vh;
}
#orderCookedButton {
  background-color: green;
}
#cancelButton {
  background-color: red;
}

#orderCookedButton:active {border: 2px solid #d9d9d9;}

#orderCookedButton:hover {background-color: #008040}

</style>

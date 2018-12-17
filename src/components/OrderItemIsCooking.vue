<template>
  <!-- Egen komponent för att kunna hantera det som sker i "Tillagas" enklare -->
  <div>
    <h4>#{{orderId}}</h4>
    <div>
      <button id="plus" @click="show = !show">+</button>
      <button id="orderCookedButton" v-on:click="orderDone" v-if="isPrepp">
        {{uiLabels.ready}}
      </button>
      <transition name="slide">
        <p id="expanding" v-if="show">
          <OrderItem
          :ui-labels="uiLabels"
          :lang="lang"
          :order="order">
        </OrderItem>
        <button id="cancelButton" v-on:click="orderCanceled">
          {{uiLabels.cancel}}
        </button>
      </p>
    </transition>
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
    lang: String,
    isPrepp: Boolean
  },
  data: function () {
    return {
      show: true
    }
  },
  methods: {
    orderDone: function () { //skickar 'cooked' till parent som kan kalla med v-on:cooked
      this.$emit('done');
    },
    orderCanceled: function () { //skickar 'canceled' till parent som kan kalla med v-on:canceled
      this.$emit('cancel');
    }
  }
}
</script>

<style scoped>
#expanding {
  transform-origin: top;
  transition: .4s ease-in-out;
  overflow: hidden;
}
.slide-enter, .slide-leave-to {
  transform: scaleY(0);
}
#orderCookedButton, #cancelButton, #plus {
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
#plus {
  background-color: blue;
}

#orderCookedButton:active {border: 2px solid lightgreen;}
#cancelButton:active {border: 2px solid orange;}
#plus:active {border: 1px solid lightblue;}

#orderCookedButton:hover {background-color: darkgreen;}
#cancelButton:hover {background-color: darkred;}
#plus:hover {background-color: darkblue}

</style>

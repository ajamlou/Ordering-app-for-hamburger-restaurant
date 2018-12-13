<template>
  <!-- Egen komponent för att kunna hantera det som sker i "Tillagas" enklare -->
  <div>
    <h4>#{{orderId}}</h4>
    <div>
      <button id="plus" @click="show = !show">+</button>
      <button id="orderCookedButton" v-on:click="orderCooked">
        {{uiLabels.ready}}
      </button>
      <transition name="slide">
        <p id="expanding" v-if="show">
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

<template>
  <div>
    <div class="prep-head">
    <h4>#{{orderId}}</h4>
  </div>

    <b-btn v-b-toggle='orderId' id="collapsibleButton">
      <strong>+</strong>
    </b-btn>

    <div>
      <b-collapse class="collapsibleBtn" visible :id = "orderId">
        <OrderItem
        :ui-labels="uiLabels"
        :lang="lang"
        :order="order">
      </OrderItem>
    </b-collapse>

        <div class="btns">
          <button id="cancelButton" v-on:click="orderCanceled">
            ✖
          </button>

          <button
          id="doneButton"
          v-on:click="orderDone"
          v-if="isPrepp">
            ➤
          </button>
        </div>

  </div>
</div>
  <!-- Egen komponent för att kunna hantera det som sker i "Tillagas" enklare -->
  <!--<div>
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
</div>-->
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
    orderDone: function () { //skickar 'done' till parent som kan kalla med v-on:done
    this.$emit('done');
  },
  orderCanceled: function () { //skickar 'cancel' till parent som kan kalla med v-on:cancel
  this.$emit('cancel');
}
}
}
</script>

<style scoped>
.prep-head{
  display: grid;
  grid-template-columns: 50% 50%;
}
.prep-head > p{
  text-align: center;
}
.btns{
  display:grid;
  grid-template-columns: 50% 50%;
  width:100%;
}

#doneButton, #collapsibleButton,#cancelButton {
  border:0;
  color:white;
  padding:0;
  text-align: center;
  border-radius: 50%;
}

#doneButton {
  background-color: rgb(0,150,0);
  height:3em;
  width:3em;
  margin: 0 0 0 auto;
}

#collapsibleButton {
  background-color: #3366ff;
  height:2.7em;
  width:2.7em;
  display:block;
  margin: auto;
}

#cancelButton{
  background-color: #ff3333;
  border: 1px solid white;
  height:3em;
  width:3em;
  margin: 0 auto 0 0;
}

#cancelButton:active,
#doneButton:active,
#collapsibleButton:active {border: 2px solid #d9d9d9;}

#cancelButton:hover {background-color: #b30000}
#doneButton:hover {background-color: #00cc66}
#collapsibleButton:hover {background-color: #0040ff}
</style>

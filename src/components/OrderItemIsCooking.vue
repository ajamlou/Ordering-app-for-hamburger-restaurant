<template>
  <div>
    <div class="prep-head">
      <h4>#{{orderId}}</h4>
    </div>

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

    <div class="btns">
      <b-btn variant="danger" id="cancelButton" v-on:click="orderCanceled" :class="{'center':!isPrepp}">
        ✖
      </b-btn>

      <b-btn variant="success" id="doneButton" v-on:click="orderDone" v-if="isPrepp">
        ➤
      </b-btn>
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
    lang: String,
    isPrepp: Boolean
  },
  data: function () {
    return {
      show: true,
      myToggle: false
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
  display: grid;
  grid-template-columns: 50% 50%;
  width: 100%;
  padding-top: 10px;
}

#doneButton, #collapsibleButton,#cancelButton {
  width: 3em;
  height: 3em;
  text-align: center;
  border-radius: 50%;
}

#doneButton {
  margin: 0 0 0 auto;
}

#collapsibleButton {
  display: block;
  margin: auto;
}

#cancelButton{
  margin: 0 auto 0 0;
}

.center{
  grid-column: 1/3;
  display: block;
  margin: 10px auto auto auto !important;
}

#collapsibleButton:hover {background-color: #0040ff}
</style>

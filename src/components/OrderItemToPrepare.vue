<template>
  <!-- Egen komponent för att kunna hantera det som sker i "Inkomna" enklare -->
  <div>
    <div class="prep-head">
      <h4>#{{orderId}}</h4>
      <p>Antal Pattys: {{nrOfPattys}}</p>
    </div>

    <b-btn :pressed.sync="myToggle" v-b-toggle='orderId' variant="outline-primary" id="collapsibleButton">
      <strong v-if="myToggle">+</strong>
      <strong v-if="!myToggle">-</strong>
    </b-btn>

    <div>
      <!-- Det som collapsibleButton döljer -->
      <b-collapse class="collapsibleBtn" visible :id = "orderId">
        <OrderItem
        :onlypatty="true"
        :ui-labels="uiLabels"
        :lang="lang"
        :order="order"
        :ingredients="ingredients"
        :menuView="menuView"
        @total_pattys="setNrOfPattys">
      </OrderItem>
    </b-collapse>

    <div class="btns">
      <b-btn variant="danger" id="cancelButton" v-on:click="orderCanceled">
        ✖
      </b-btn>
      <b-btn variant="success" id="sendToPreparing" v-on:click="orderCooked">
        ➤
      </b-btn>
    </div>

  </div>
</div>
</template>

<script>
import OrderItem from '@/components/OrderItem.vue'

export default {
  name: 'OrderItemToPrepare',
  components: { OrderItem },
  props: {
    ingredients:Array,
    uiLabels: Object,
    order: Object,
    orderId: String,
    lang: String,
    menuView: Boolean
  },
  data:function(){
    return{
      nrOfPattys: 0,
      myToggle: false
    }
  },
  methods: {
    orderCooked: function () { //skickar 'cooked' till parent som kan fånga med v-on:cooked
    this.$emit('cooked');
  },
  setNrOfPattys: function(quantity){
    this.nrOfPattys=quantity;
  },
  orderCanceled: function () { //skickar 'cancel' till parent som kan fånga med v-on:cancel
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

#sendToPreparing, #collapsibleButton, #cancelButton {
  height: 3em;
  width: 3em;
  text-align: center;
  border-radius: 50%;
}

#sendToPreparing {
  margin: 0 0 0 auto;
}

#collapsibleButton {
  display: block;
  margin: auto;
}

#cancelButton{
  margin: 0 auto 0 0;
}

#collapsibleButton:hover {background-color: #0040ff}

</style>

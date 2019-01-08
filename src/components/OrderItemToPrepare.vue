<template>
  <!-- Egen komponent för att kunna hantera det som sker i "Inkomna" enklare -->
  <div>
    <div class="prep-head">
    <h4>#{{orderId}}</h4>
    <p>Antal Pattys: {{nrOfPattys}}</p>
  </div>

    <b-btn v-b-toggle='orderId' id="collapsibleButton">
      <strong>+</strong>
    </b-btn>

    <div>
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
          <button id="cancelButton" v-on:click="orderCanceled">
            ✖
          </button>
          <button id="sendToPreparing" v-on:click="orderCooked">
            ➤
          </button>
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
      nrOfPattys:0
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
  display:grid;
  grid-template-columns: 50% 50%;
  width:100%;
}

#sendToPreparing, #collapsibleButton,#cancelButton {
  border:0;
  color:white;
  padding:0;
  text-align: center;
  border-radius: 50%;
}

#sendToPreparing {
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
#sendToPreparing:active,
#collapsibleButton:active {border: 2px solid #d9d9d9;}

#cancelButton:hover {background-color: #b30000}
#sendToPreparing:hover {background-color: #00cc66}
#collapsibleButton:hover {background-color: #0040ff}

</style>

<template>
  <div id="checkout-div">
    <button @click="goBack">{{uiLabels.back}}</button>
    <div id="checkout-title">
      {{uiLabels.yourOrder}}
    </div>
    <div id="checkout-wrapper">
    <OrderInCheckout
    v-for = "(order, index) in orders"
    :key ="index"
    :id = "index"
    :order = "order"
    :uiLabels = "uiLabels"
    :lang="lang"
    @remove_order="removeOrder"
    @modify_order="modifyOrder">
    </OrderInCheckout>

    <p>{{uiLabels.sum}}: {{totalPrice}}:-</p>
      </div>

    </div>
</template>

<script>
import OrderInCheckout from '@/components/OrderInCheckout.vue'

export default{
  name:'CheckoutPage',

  components:{
    OrderInCheckout

  },
  props:{
    uiLabels:Object,
    orders: Array,
    lang: String
  },
  data: function(){
    return{

    }
  },
  methods:{
    goBack:function(){
      this.orders.pop();
      this.$emit('go_back');
    },
    removeOrder:function(index){
      this.orders.splice(index,1);
    },
    modifyOrder:function(ingredients,units,index){
      this.$emit('modify_order',ingredients,units,index);
      this.orders.splice(index,1);

    }

  },
  computed:{
    /*Räknar ut det totala priset av en beställning*/
    totalPrice:function(){
      let counter = 0;
      let i;
      for(i=0; i<this.orders.length; i++){
        counter += this.orders[i].price*this.orders[i].units;
      }
      return counter;
    },
  }
}
</script>

<style scoped>
</style>

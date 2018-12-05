<template>
  <div id="checkout-div">
    <div id="checkout-title">
      {{uiLabels.yourOrder}}
    </div>
    <div id="checkout-wrapper">
    <OrderInCheckout
    v-for = "(order, index) in orders"
    :key ="index"
    :id = "index"
    :item = "order"
    :uiLabels = "uiLabels">
    </OrderInCheckout>
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
    orders: Array
  },
  data: function(){
    return{

    }
  },
  methods:{

  }
}
</script>

<style scoped>
</style>

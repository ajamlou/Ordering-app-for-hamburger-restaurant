<template>
  <div id="checkout-div">
    <button @click="goBack">{{uiLabels.back}}</button>
    <div id="checkout-title">
      {{uiLabels.yourOrder}}
    </div>
    <div id="checkout-wrapper">
      <div id="add-btn-div" @click="newMenu">
        <div id="add-btn-top">
          <h5>Klicka för att lägga till en burgare</h5>
        </div>
        <p>+</p>
    </div>
    <OrderInCheckout
    v-for = "(menu, index) in menus"
    :key ="index"
    :id = "index"
    :menu = "menu"
    :uiLabels = "uiLabels"
    :lang="lang"
    @remove_menu="removeMenu"
    @modify_menu="modifyMenu">
    </OrderInCheckout>
    </div>
    <center>  <p>{{uiLabels.sum}}: {{totalPrice}}:-</p></center>

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
    menus: Array,
    lang: String
  },
  data: function(){
    return{

    }
  },
  methods:{
    goBack:function(){
      this.menus.pop();
      this.$emit('go_back');
    },
    removeMenu:function(index){
      this.menus.splice(index,1);
    },
    modifyMenu:function(ingredients,units,index){
      this.$emit('modify_menu',ingredients,units,index);
      this.menus.splice(index,1);
    },
    newMenu:function(){
      this.$emit('new_menu');
    }

  },
  computed:{
    /*Räknar ut det totala priset av en beställning*/
    totalPrice:function(){
      let counter = 0;
      let i;
      for(i=0; i<this.menus.length; i++){
        counter += this.menus[i].price*this.menus[i].units;
      }
      return counter;
    },
  }
}
</script>

<style scoped>
#checkout-wrapper{
  display:flex;
  text-align: center;
  margin:3em 0 0 1em;
}

#add-btn-div{
  display:flex;
  flex-direction: column;
  word-wrap: break-word;
  max-width:20%;
  align-items:stretch;
  background-color:rgba(255, 255, 255, 0.9);
  cursor:pointer;
}
#add-btn-div:hover{
  background-color:rgba(100, 100, 100, 0.9);
}
#add-btn-div>p{
  margin:auto;
  font-size: 2em;
}


</style>

<template>
  <div id="checkout-div">
    <button @click="goBack">{{uiLabels.back}}</button>
    <div id="checkout-title">
      {{uiLabels.yourOrder}}
    </div>
    <div id="btn-order-wrap">
    <div id="add-btn-div" @click="newMenu">
      <div id="add-btn-top">
        <h5>Klicka för att lägga till en burgare</h5>
      </div>
      <p>+</p>
    </div>
    <div id="checkout-wrapper">
      <OrderInCheckout
      class="flex-item"
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
  </div>
  <div id="checkout-foot">
    <center>  <p>{{uiLabels.sum}}: {{totalPrice}}:-</p></center>
    <button id="order-btn2" @click="placeOrder()">{{ uiLabels.placeOrder }}</button>
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
    },
    placeOrder: function () {
      if(this.menus.length>0){
        let menus = {menus: this.menus};
        // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
        this.$store.state.socket.emit('order', {order: menus});
        this.$emit('clear_all');
      }
      else{
        /*Lägg in en modal som varnar för att varukorgen är tom*/
      }
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
#btn-order-wrap{
  position:relative;
  display:flex;
  flex-wrap: nowrap;
}
#checkout-wrapper{
  display:flex;
  flex-wrap: nowrap;
  text-align: center;
  overflow-x: auto;
}
.flex-item{
  flex: 0 0 auto;
}

#add-btn-div{
  display:flex;
  flex-direction: column;
  word-wrap: break-word;
  text-align: center;
  max-width:15%;
  align-items:stretch;
  background-color:rgba(255, 255, 255, 0.9);
  cursor:pointer;
  flex: 0 0 auto;
}
#add-btn-div:hover{
  background-color:rgba(100, 100, 100, 0.9);
}
#add-btn-div>p{
  margin:auto;
  font-size: 2em;
}


</style>

<template>
  <div
  id="checkoutPage-backdrop">
  <div
  id="checkout-div">
  <div
  id="checkoutPage-title">
  {{uiLabels.checkout}}
</div>

<SlotModal
id="orderFinishedModal"
v-if="this.showSlotModal">
<div slot="header"></div>
<div id="slotTextFinished" slot="body">{{slotContent}}</div>

<!-- När man trycker på "Beställ" kommer en modal upp och innehållet baseras på om beställningen
är tom eller ej, orderFinished bestämmer vad som sker när man trycker på "OK" -->
<div slot="footer">
  <button
  type="button"
  class="btn-close"
  @click="orderFinished()">
  {{uiLabels.OKlabel}}
</button>
</div>
</Slotmodal>

<div id="btn-order-wrap">
  <button id="add-btn-div" @click="newBurger">
    {{uiLabels.addBurger}}
  </button>

  <div id="checkout-wrapper" :class="{'noBorder' : !menusInOrder}">
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

<div id="bottom-div">
  <button id="cancelOrder-btn" @click="cancelBtnModal()">{{uiLabels.cancelOrder}}</button>
  <div id="sumOfOrder">
    {{uiLabels.sum}}: {{totalPrice}}:-
  </div>
  <button id="order-btn2" @click="decideSlotContent();placeOrder()">{{ uiLabels.placeOrder }}</button>
</div>
</div>
</div>
</template>

<script>
import OrderInCheckout from '@/components/OrderInCheckout.vue'
import SlotModal from '@/components/SlotModal.vue'

export default{
  name:'CheckoutPage',

  components:{
    OrderInCheckout,
    SlotModal
  },
  props:{
    uiLabels:Object,
    menus: Array,
    lang: String,
    orderNumber: Number,
  },
  data: function(){
    return{
      showSlotModal:false,
      slotContent:"",
    }
  },
  methods:{
    // Om beställningen inte är tom skickas den iväg till köket och man kommer
    // tillbaka till framsidan.
    orderFinished: function(){
      if(this.menus.length>0){
        this.$emit('change_view','frontPage');
        this.$emit('clear_all');
        this.$emit('remove_backButton');
      }
      else this.showSlotModal=false;
    },
    //Oavsett om beställningen är tom eller avbryts den när man trycker på
    //"Avbryt beställning" i modalen.
    emptyOrder:function(){
      this.$emit('change_view','frontPage');
      this.$emit('clear_all');
      this.$emit('remove_backButton');
    },
    //Modal som kommer upp när en trycker på "Avbryt"
    cancelBtnModal: function(){
      this.$emit('cancel_btn_modal')
    },

    //Togglar en tom modal
    toggleSlotModal:function(){
      if(!this.showSlotModal){
        this.showSlotModal=true;
      }
      else{
        this.showSlotModal=false;
      }
    },
    removeMenu:function(index){
      this.menus.splice(index,1);
    },
    modifyMenu:function(ingredients,units,index,itemCounter){
      this.$emit('modify_menu',ingredients,units,index,itemCounter);
      this.menus.splice(index,1);
    },
    //Byter vy när en trycker på "Lägg till burgare"
    newBurger:function(){
      this.$emit('change_view','frontPage');
      this.$emit('new_burger');
    },
    // Bestämmer vad som ska visas i modalen. Om en order finns kommer ordernr och
    // bekräftelse upp, annars ett felmeddelande
    decideSlotContent:function(){
      if (this.menusInOrder){
        this.slotContent=this.uiLabels.checkoutFinished + "#" + (this.orderNumber + 1);
      }
      else if (!this.menusInOrder){
        this.slotContent=this.uiLabels.emptyCheckout;
      }
    },
    //Beställningsinformation emittas när en trycker på "Beställ"
    placeOrder:function(){
      this.toggleSlotModal();
      if(this.menusInOrder){
        this.$store.state.socket.emit('order', {menus: this.menus})
      }
    }
  },
  computed:{
    menusInOrder:function(){
      if (this.menus.length>0) {
        return true;
      }
      else {
        return false;
      }
    },
    /*Räknar ut det totala priset av en beställning*/
    totalPrice:function(){
      /*reduce() tar in en valfri variabel (sum) som sätts till
      ett värde (0) och itererar sedan över alla objekt i arrayen
      (jämför m. v-for="menu in menus")*/
      let totalPrice = this.menus.reduce((sum,menu) =>
      sum + menu.price*menu.units,0);
      return totalPrice;
    },
  }
}
</script>

<style scoped>
#checkout-div{
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-row-gap: 1vh;
  width: 90%;
  height: 100;
  margin: auto;
}
#checkoutPage-backdrop{
  background-color: rgba(255, 250, 224,0.99);
  border-radius: 5vh;
  width: 95%;
  justify-self: center;
  margin-bottom:2em;
  padding-bottom:1em;
}
#checkoutPage-title{
  grid-column: 1/9;
  grid-row: 1;
  text-align: center;
  align-self: center;
  font-family: 'Lobster', sans-serif;
  font-size: 14vmin;
  color: #ed6381;
  text-shadow: 2px 2px #444444;
  border-bottom: dotted;
  border-color: #ed6381;
}
#checkout-wrapper{
  text-transform: capitalize;
  grid-column: 1/9;
  grid-row: 1;
  display: flex;
  flex-wrap: nowrap;
  text-align: center;
  overflow-x: auto;
  background-color: #006622;
  border-radius: 10px;
  margin-top: 3vh;
}
#btn-order-wrap{
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  grid-column: 1/9;
}
#add-btn-div{
  max-width: 185.3px;
  background-color: #b9d7cb;
  cursor: pointer;
  border-radius: 10px;
  margin: 3vh 1vh 0 0;
  font-size: 25px;
}
#add-btn-div:hover{
  background-color: #6f8179;
}
#bottom-div{
  grid-row: 3/4;
  grid-column: 1/9;
  display:grid;
  grid-template-columns: repeat(8,1fr);
  justify-content: space-between;
}
#cancelOrder-btn{
  grid-column: 1/2;
  background-color: #e51e4a;
}
#cancelOrder-btn:hover{
  background-color: #a01533;
}
#sumOfOrder{
  justify-self: center;
  margin:auto;
  text-align:center;
  font-size: 2em;
  grid-column: 3/7;
}
#order-btn2{
  grid-column: 8/9;
  background-color: #c5e5be;
}
#order-btn2:hover{
  background-color: #89a085;
}
#order-btn2, #cancelOrder-btn{
  width:120px;
  height:80px;
  font-size: 25px;
  grid-row: 1;
}
.noBorder{
  border: 0 !important;
}
.btn-close{
  background-color: #c5e5be;
  border-radius: 10px;
  width: 5em;
  height: 2.5em;
  font-size: 2em;
  color: black;
}
button{
  color: #000000;
  font-size: 16px;
  text-align: center;
  border-color: black;
  border-width: thin;
  border-radius: 16px;
  text-transform: uppercase;
  margin: 4px 2px;
  cursor: pointer;
}

/*------------------ CSS för mindre skärmar ------------*/
@media screen and (max-width:1206px){
  #designPage-title{
    grid-row: 1;
    text-align: center;
    font-size: 12vw;
  }
}

@media screen and (max-width:740px){
  #checkoutPage-title{
    font-size: 13vw;
  }
  #btn-order-wrap{
    flex-direction: column;
    align-items: center;
  }
  #sumOfOrder{
    font-size: 2em;
  }
  #slotTextFinished{
    font-size: 24px;
  }
  .btn-close{
    background-color: #c5e5be;
    border-radius: 5px;
    width: 4em;
    height: 2em;
    font-size: 1.5em;
  }
}

@media screen and (max-width:500px){
  #order-btn2,#cancelOrder-btn{
    font-size: 18px;
    width: 80px;
    height: 60px;
  }
  #sumOfOrder{
    font-size: 25px;
  }
}
@media screen and (max-width:380px){
  #slotTextFinished{
    font-size: 20px;
  }
}
</style>

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
<div slot="body" class="slotBody">{{slotContent}}</div>
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

<SlotModal
v-if="this.showSlotModal && this.pressedAbortModal">
<div slot="body">{{uiLabels.areYouSure}}</div>
<div slot="footer">
  <button
  type="button"
  id="noBtn"
  @click="continueOrder();toggleSlotModal()">
  {{uiLabels.dontAbort}}
</button>
<button
type="button"
id="yesBtn"
@click="orderFinished()">
{{uiLabels.abort}}
</button>
</div>
</SlotModal>

<div id="btn-order-wrap">
  <div id="add-btn-div" @click="newBurger">
    <div id="addButtonText">
      <h5>{{uiLabels.addBurger}}</h5>
    </div>
    <!-- <p>+</p> -->
  </div>
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
  <p>{{uiLabels.sum}}: {{totalPrice}}:-</p>
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
      pressedAbortModal:false
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
    //Modal som kommer upp när en trycker på "Avbryt"
    cancelBtnModal: function(){
      this.toggleSlotModal();
      this.pressedAbortModal=true;
    },
    //Om en trycker på "Fortsätt beställa" i Avbryt-modalen
    //försvinner modalen
    continueOrder:function(){
      this.pressedAbortModal=false;
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
        // this.$emit('clear_all');
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
  margin-bottom: 1em;
  padding-bottom: 3em;
}

#checkoutPage-title{
  grid-column: 1/9;
  grid-row: 1;
  text-align: center;
  align-self: center;
  font-family: 'Lobster', sans-serif;
  font-size: 14vmin;
  color: #ed6381; /*rosa*/
  text-shadow: 2px 2px #444444;
  border-bottom: dotted;
  border-color: #ed6381;
}

#btn-order-wrap{
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  grid-column: 1/9;
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
  border: 1px solid #7a7a7a;
  margin-top: 3vh;
}

#add-btn-div{
  display: flex;
  text-align: center;
  max-width: 20vh;
  background-color: #b9d7cb;;
  cursor: pointer;
  border-radius: 10px;
  color: white;
  margin: 3vh 1vh 0 0;
}

#add-btn-div:hover{
  background-color: #6f8179;
  border-color: #000000;
}

/* #add-btn-div>p{
margin: auto;
font-size: 2em;
} */

#addButtonText{
  padding: 1em 2em;
}

#bottom-div{
  grid-column: 1/7;
  display:grid;
  justify-content: space-between;
}

#sumOfOrder{
  justify-self: center;
  margin: auto;
  text-align: center;
  font-size: 2em;
  grid-column: 4/6;
  grid-row: 4;
}

#order-btn2, #cancelOrder-btn, #yesBtn, #noBtn{
  border: 1px solid #7a7a7a;
}

#order-btn2{
  grid-column: 8/9;
  grid-row: 4/5;
  background-color: #c5e5be;
}

#order-btn2:hover{
  background-color: #89a085;
}

#cancelOrder-btn{
  grid-column: 1/2;
  grid-row: 4/5;
  background-color: #e51e4a;
}

#cancelOrder-btn:hover{
  background-color: #a01533; /*matchar #e51e4a; - mörkrosa*/
  border-color: #000000;
}

#yesBtn{
  background-color: #e51e4a;
  grid-column: auto;
  grid-row: auto;
}

#yesBtn:hover{
  background-color: #a01533; /*matchar #e51e4a; - mörkrosa*/
  border-color: #000000;
}

#noBtn{
  background-color: #c5e5be;
  grid-column: auto;
  grid-row: auto;
}

#noBtn:hover{
  background-color: #89a085;
  border-color: #000000;
}

.slotBody{
  padding: 3em;
}
.noBorder{
  border: 0 !important;
}

.btn-close{
  background-color: #33cc33;
  border-radius: 10px;
  width: 2em;
  height: 2em;
  font-size: 2em;
  color: white;
}

.btn-close:active{background-color: #1f7a1f}

button{
  color: black;
  font-size: 16px;
  padding: 10% 15%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 16px;
  text-transform: uppercase;
}

/*------------------ CSS för ipad/mobiler-isch ------------*/
@media screen and (max-width:1206px){
  #checkout-div{
  }
  #designPage-title{
    grid-row: 1;
    text-align: center;
    font-size: 12vw;
  }

  #sumOfOrder{
    grid-column: 6/8;
  }
  #order-btn2{
    grid-column: 8;
    grid-row: 4/5;
  }
}

/* -------------------- CSS för mobiler -----------------*/

@media screen and (max-width:740px){
  #checkoutPage-title{
    font-size: 13vw;
  }
  #btn-order-wrap{
    flex-direction: column;
    align-items: center;
  }
  #sumOfOrder{
    margin: auto;
    text-align: center;
    font-size: 2em;
    grid-column: 2/8;
    grid-row: 4;
  }
  #checkout-wrapper{
    /* Här vill jag få in att de ska vara mindre  */
    /* burgarrutor när det är mobilsize, typ kvadrater. */
  }

  #add-btn-div{
    /* Här vill jag få in att de vara samma size som burgarrutorna.*/
  }
}


</style>

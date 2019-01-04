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
      <div slot="body" class="slotBody">{{slotContent}}</div>
      <!-- När man trycker på "Beställ" kommer en modal upp och innehållet baseras på om beställningen
       är tom eller ej, orderFinished bestämmer vad som sker när man trycker på "OK" -->
      <div slot="footer"><button
        type="button"
        class="btn-close"
        @click="orderFinished()">
        {{uiLabels.OKlabel}}
      </button></div>
    </Slotmodal>

  <div id="btn-order-wrap">
    <div id="add-btn-div" @click="newBurger">


      <div id="add-btn-top">
        <div id="addButtonText">
          <h5>{{uiLabels.addBurger}}</h5>
        </div>
      </div>
      <!-- <p>+</p> -->
    </div>
    <div id="checkout-wrapper"
    :class="{'noBorder' : !menusInOrder}">

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
<!-- <div id="checkout-foot"> -->
  <center id="sumOfOrder"><p>{{uiLabels.sum}}: {{totalPrice}}:-</p></center>
  <button id="order-btn2" @click="decideSlotContent();placeOrder()">{{ uiLabels.placeOrder }}</button>
<!-- </div> -->

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
    orderNumber: Number
  },
  data: function(){
    return{
      showSlotModal:false,
      slotContent:""
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
    placeOrder:function(){
      this.toggleSlotModal();
      if(this.menusInOrder){
        let menus = {menus: this.menus};
        this.$store.state.socket.emit('order', {order: menus});
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
  display:grid;
  grid-template-columns: repeat(8, 1fr);
  grid-row-gap: 1vh;
  /* height:100%; */
  width: 90%;
  height: 100%
  margin: auto auto auto auto;
}
#checkoutPage-backdrop{
  background-color: rgba(255, 250, 224,0.99);
  border-radius:15px;
  width:95%;
  justify-self:center;
  margin-bottom: 1em;
  padding-bottom: 3em;

}

#checkoutPage-title{
  grid-column:1/9;
  grid-row:1;
  text-align: left;
  align-self: center;
  font-family: 'Lobster', sans-serif;
  font-size: 14vmin;
  /* font-family: 'Luckiest Guy', sans-serif; */
  color: #ed6381; /*rosa*/
  /* text-transform: uppercase; */
  text-shadow: 2px 2px #444444;
  border-bottom: dotted;
  border-color: #ed6381;
}

#btn-order-wrap{
  position:relative;
  display:flex;
  flex-wrap: nowrap;
  grid-column:1/9;
}
#checkout-wrapper{
  text-transform: capitalize;
  grid-column: 1/9;
  grid-row: 1;
  display:flex;
  flex-wrap: nowrap;
  text-align: center;
  overflow-x: auto;
  background-color: #006622;
  border-radius: 10px;
  border: 1px solid #7a7a7a;
  margin-top: 3vh;
}
.flex-item{
  flex: 0 0 auto;
}

#add-btn-div{
  display:flex;
  flex-direction: column;
  word-wrap: break-word;
  text-align: center;
  width:15%;
  min-width:200px;
  align-items:stretch;
  background-color:#b9d7cb;;
  cursor:pointer;
  flex: 0 0 auto;
  border-radius: 10px;
  color: white;
  margin:auto 5px auto 5px;
}
#add-btn-div:hover{
  background-color: #6f8179;
  border-color: #000000;
}
#add-btn-div>p{
  margin:auto;
  font-size: 2em;
}

#addButtonText{
  padding-top: 2em;
  padding-bottom: 2em;
  padding-left: 1em;
  padding-right: 1em;
}

/* #checkout-foot{
  grid-column: 1/9;
  grid-row: 3;
  margin-top: 5vh;
} */

#sumOfOrder{
  /* grid-column: 4/6;
  grid-row: 3;
  font-size: 2em; */
  justify-self: center;
  margin:auto;
  text-align:center;
  font-size: 2em;
  grid-column:6/8;
  grid-row:4;
}
#order-btn2{
  grid-column: 8;
  grid-row: 4/5;
  width:120px;
  height:80px;
  margin-right: 5vw;
  margin-bottom: 1.5em;
  justify-self:end;
  border:1px solid #7a7a7a;
  border-radius: 16px;
  color:white;
  background-color: #c5e5be;
  /* background: -moz-linear-gradient(to bottom, #70db70 51%, #33cc33 51%);
  background: -webkit-gradient(linear,left top, left bottom, color-stop(51%,#70db70), color-stop(51%,#33cc33));
  background: -webkit-linear-gradient(to bottom, #70db70 51%,#33cc33 51%);
  background: -o-linear-gradient(to bottom, #70db70 51%,#33cc33 51%);
  background: -ms-linear-gradient(top, #70db70 51%,#33cc33 51%);
  background: linear-gradient(to bottom, #70db70 51%,#33cc33 51%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#70db70', endColorstr='#33cc33',GradientType=0 ); */
}
/* #order-btn2:active{border: 2px solid #595959;} */
#order-btn2:hover{
  background-color: #89a085;
  border-color: #000000;
  /* background: -moz-linear-gradient(to bottom, #33cc33 51%, #248f24  51%);
  /*background: -webkit-gradient(linear,left top, left bottom, color-stop(51%,#ff4d4d), color-stop(51%,#ff0000));*/
  /* background: -webkit-linear-gradient(to bottom, #33cc33 51%,#248f24 51%);
  background: -o-linear-gradient(to bottom, #33cc33 51%,#248f24 51%);
  background: -ms-linear-gradient(top, #33cc33 51%,#248f24 51%);
  background: linear-gradient(to bottom, #33cc33 51%,#248f24 51%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#33cc33', endColorstr='#248f24',GradientType=0 ); */
}

.slotBody{
  margin-top: 5vh;
}

.noBorder{
  border:0 !important;
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
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 16px;
  text-shadow: 1px 1px 2px black;
  text-transform: uppercase;
}

/*------------------ CSS för ipad/mobiler-isch ------------*/
@media screen and (max-width:1206px){ /*När category-row bryts, skifta plats på alla element*/
  #checkout-div{
    margin: auto auto auto 3em;
  }
  #designPage-title{
    grid-row: 1;
    text-align: center;
    font-size: 12vw;
  }

  #sumOfOrder{
    margin:auto;
    text-align:left;
    font-size: 2em;
    grid-column:1/8;
    grid-row:4;
  }
  #order-btn2{
    grid-column: 8;
    grid-row: 4/5;
  }
}

/* -------------------- CSS för mobiler -----------------*/

@media screen and (max-width:670px){
  #checkoutPage-title{
    font-size: 13vw;
  }
  #btn-order-wrap{
    flex-direction: column;
    align-items: center;
  }
  #sumOfOrder{
    margin:auto;
    text-align:left;
    font-size: 2em;
    grid-column:1/8;
    grid-row:4;
  }
}


</style>

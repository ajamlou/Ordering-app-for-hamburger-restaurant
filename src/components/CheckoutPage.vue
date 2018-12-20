<template>
  <div id="checkout-div">
      <SlotModal
      id="orderFinishedModal"
      v-if="this.showSlotModal">
      <div slot="header"></div>
      <div slot="body" class="slotBody">{{slotContent}}</div>
      <div slot="footer"><button
        type="button"
        class="btn-close"
        @click="orderFinished()">
        {{uiLabels.OKlabel}}
      </button></div>
    </Slotmodal>

  <!-- <button id="back-btn" @click="goBack">{{uiLabels.back}}</button> -->

  <!-- <div id="checkout-title">
    {{uiLabels.yourOrder}}
  </div> -->
  <div id="btn-order-wrap">
    <div id="add-btn-div" @click="newMenu">


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
    orderFinished: function(){
      if(this.menus.length>0){
        this.$emit('go_to_front','frontPage');
        this.$emit('clear_all');
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
    newMenu:function(){
      this.$emit('new_menu');
    },
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
  border: 3px solid black;
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
  background-color:#3385ff;
  cursor:pointer;
  flex: 0 0 auto;
  border-radius: 10px;
  color: white;
  margin:auto 5px auto 5px;
}
#add-btn-div:hover{
  background-color:rgba(100, 100, 100, 0.9);
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
  grid-column: 4/6;
  grid-row: 3;
  font-size: 2em;
}
#order-btn2{
  grid-column: 7/9;
  grid-row: 4;
  width:120px;
  height:80px;
  margin-right: 5vw;
  margin-bottom: 1.5em;
  justify-self:end;
  border:1px solid #7a7a7a;
  border-radius: 16px;
  color:white;
  background: -moz-linear-gradient(to bottom, #70db70 51%, #33cc33 51%);
  background: -webkit-gradient(linear,left top, left bottom, color-stop(51%,#70db70), color-stop(51%,#33cc33));
  background: -webkit-linear-gradient(to bottom, #70db70 51%,#33cc33 51%);
  background: -o-linear-gradient(to bottom, #70db70 51%,#33cc33 51%);
  background: -ms-linear-gradient(top, #70db70 51%,#33cc33 51%);
  background: linear-gradient(to bottom, #70db70 51%,#33cc33 51%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#70db70', endColorstr='#33cc33',GradientType=0 );
}
#order-btn2:active{border: 2px solid #595959;}
#order-btn2:hover{
  background: -moz-linear-gradient(to bottom, #33cc33 51%, #248f24  51%);
  /*background: -webkit-gradient(linear,left top, left bottom, color-stop(51%,#ff4d4d), color-stop(51%,#ff0000));*/
  background: -webkit-linear-gradient(to bottom, #33cc33 51%,#248f24 51%);
  background: -o-linear-gradient(to bottom, #33cc33 51%,#248f24 51%);
  background: -ms-linear-gradient(top, #33cc33 51%,#248f24 51%);
  background: linear-gradient(to bottom, #33cc33 51%,#248f24 51%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#33cc33', endColorstr='#248f24',GradientType=0 );
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

@media screen and (max-width:650px){
  #btn-order-wrap{
    flex-direction: column;
    align-items: center;
  }
}


</style>

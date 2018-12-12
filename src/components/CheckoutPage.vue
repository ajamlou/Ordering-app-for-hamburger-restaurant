<template>
  <div id="checkout-div">
    <div id="orderFinishedModal">
      <SlotModal
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
  </div>

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
  <button id="order-btn2" @click="decideSlotContent();placeOrder()">{{ uiLabels.placeOrder }}</button>
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
    // goBack:function(){
    //   this.menus.pop();
    //   this.$emit('go_back');
    // },
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
      if (this.completedOrder){
        this.slotContent=this.uiLabels.checkoutFinished + "#" + (this.orderNumber + 1);
      }
      else if (!this.completedOrder){
        this.slotContent=this.uiLabels.emptyCheckout;
      }
    },
    placeOrder:function(){
      this.toggleSlotModal();
      if(this.completedOrder){
        let menus = {menus: this.menus};
        this.$store.state.socket.emit('order', {order: menus});
        // this.$emit('clear_all');
      }
    }
  },
  computed:{
    completedOrder:function(){
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
}
#checkout-wrapper{
  text-transform: capitalize;
  grid-column: 1/7;
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
  max-width:15%;
  align-items:stretch;
  background-color:#3385ff;
  cursor:pointer;
  flex: 0 0 auto;
  border-radius: 10px;
  color: white;
  margin-right: 5vw;
  margin-left: 3vw;
  margin-top: 10vh;
  height: 25vh;
}
#add-btn-div:hover{
  background-color:rgba(100, 100, 100, 0.9);
}
#add-btn-div>p{
  margin:auto;
  font-size: 2em;
}

#addButtonText{
  padding-top: 60px;
  padding-bottom: 60px;
  padding-left: 10px;
  padding-right: 10px;
}

#order-btn2{
  grid-column: 6/7;
  border:1px solid #7a7a7a;
  width: 7vw;
  height: 6vh;
  font-size: 1.5em;
  border-radius: 10px;
  grid-column: 6/7;
  grid-row:3;
  color:white;
  text-align: center;
  background: -moz-linear-gradient(to bottom, #70db70 51%, #33cc33 51%);
  background: -webkit-gradient(linear,left top, left bottom, color-stop(51%,#70db70), color-stop(51%,#33cc33));
  background: -webkit-linear-gradient(to bottom, #70db70 51%,#33cc33 51%);
  background: -o-linear-gradient(to bottom, #70db70 51%,#33cc33 51%);
  background: -ms-linear-gradient(top, #70db70 51%,#33cc33 51%);
  background: linear-gradient(to bottom, #70db70 51%,#33cc33 51%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#70db70', endColorstr='#33cc33',GradientType=0 );
  margin-left: 3px;
}
#order-btn2:active{border: 2px solid #595959;}

/* #back-btn{
  grid-column: 1/2;
  grid-row: 3;
  border: 1px solid #7a7a7a;
  color:white;
  background: -moz-linear-gradient(to bottom, #ff4d4d 51%, #ff0000 51%);
  background: -webkit-gradient(linear,left top, left bottom, color-stop(51%,#ff4d4d), color-stop(51%,#ff0000));
  background: -webkit-linear-gradient(to bottom, #ff4d4d 51%,#ff0000 51%);
  background: -o-linear-gradient(to bottom, #ff4d4d 51%,#ff0000 51%);
  background: -ms-linear-gradient(top, #ff4d4d 51%,#ff0000 51%);
  background: linear-gradient(to bottom, #ff4d4d 51%,#ff0000 51%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff4d4d', endColorstr='#ff0000',GradientType=0 );
}
#back-btn:hover{
  background: -moz-linear-gradient(to bottom, #ff0000 51%, #b30000 51%);
  /*background: -webkit-gradient(linear,left top, left bottom, color-stop(51%,#ff4d4d), color-stop(51%,#ff0000));*/
  /* background: -webkit-linear-gradient(to bottom, #ff0000 51%,#b30000 51%);
  background: -o-linear-gradient(to bottom, #ff0000 51%,#b30000 51%);
  background: -ms-linear-gradient(top, #ff0000 51%,#b30000 51%);
  background: linear-gradient(to bottom, #ff0000 51%,#b30000 51%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff0000', endColorstr='#b30000',GradientType=0 );
} */

#orderFinishedModal{
  /* font-size: 3em;
  text-align: center;
  line-height: 150%; */
}

.slotBody{
  margin-top: 5vh;
}

.btn-close{
  background-color: #33cc33;
  border-radius: 10px;
  margin-top: 10vh;
  position: relative;
  width: 6vw;
  height: 8vh;
  font-size: 3vw;
  color: white;
}

.btn-close:active{background-color: #1f7a1f}

center{
  font-size: 2em;
  margin-top: 5vh;
}


</style>

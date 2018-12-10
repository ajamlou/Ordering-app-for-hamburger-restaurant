<template>
  <div id="checkout-div">
    <SlotModal
    v-if="this.showSlotModal">
    <div slot="header"><button
          type="button"
          class="btn-close"
          @click="toggleSlotModal()">
          x
        </button></div>
    <div slot="body">{{slotContent}}</div>
    <div slot="footer"></div>
    </slotmodal>

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
    lang: String
  },
  data: function(){
    return{
      showSlotModal:false,
      slotContent:""
    }
  },
  methods:{
    toggleSlotModal:function(){
      if(!this.showSlotModal){
        this.showSlotModal=true;
      }
      else{
        this.showSlotModal=false;
      }
    },
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
    decideSlotContent:function(){
      if (this.completedOrder){
        this.slotContent="Ordern är klar.";
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
        this.$emit('clear_all');
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
  grid-column: 1/7;
  grid-row: 1;
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

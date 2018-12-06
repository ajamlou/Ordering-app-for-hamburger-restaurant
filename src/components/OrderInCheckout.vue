<template>
  <div class="ord-check-div">
    <h5>{{uiLabels.burger}} {{id +1}} </h5>
    <h6>Din burgare:</h6>
    <div
    v-for="(ingredient,index) in order.ingredients"
    v-if="ingredient.category < 5 "
    :key="index">
    {{ingredient["ingredient_"+ lang]}}
  </div>
  <br>

  <h6 v-if="existsExtras">{{uiLabels.extras}}:</h6>
  <div
  v-for="(ingredient,index) in order.ingredients"
  v-if="ingredient.category > 4 "
  :key="index">
  {{ingredient["ingredient_"+ lang]}}
</div>
<div class="ord-check-foot">
  {{uiLabels.unitprice}}: {{order.price}}:-
  <br>
  <div class="ord-quant">
    <label>{{uiLabels.quantity}}:</label><input
    type="number"
    v-model="order.units">
    <div class="btns">
      <button @click="removeOrder">{{uiLabels.remove}}</button>
      <button @click="modifyOrder">{{uiLabels.modify}}</button>
    </div>
  </div>
</div>
</div>
</template>
<script>
export default{
  name:"OrderInCheckout",
  components:{

  },
  props:{
    id: Number,
    order:Object,
    uiLabels: Object,
    lang: String
  },
  methods:{
    removeOrder:function(){
      this.$emit('remove_order',this.id);
    },
    modifyOrder:function(){
      this.$emit('modify_order', this.order.ingredients, this.order.units,this.id);
      this.$emit('change_view','designPage');
    },
  },
  computed:{
    existsExtras:function(){
      let extras = false;
      let i;
      for(i=0; i<this.order.ingredients.length;i++){
        if(this.order.ingredients[i].category > 4){
          extras = true;
          return extras;
        }
      }
      return extras;
    },

  }

}
</script>
<style scoped>

.ord-check-div{
  background-color:rgba(255,255,255,0.9);
  border: 1px solid rgb(100,100,100);
}

.ord-quant input{
  width:40px;
}

button{
  background-color: #ddd;
  border: none;
  color: black;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 16px;
}
button:hover{
  background-color: #000;
  color: white;
}
</style>

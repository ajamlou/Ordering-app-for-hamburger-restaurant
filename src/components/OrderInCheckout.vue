<template>
  <div class="ord-check-div">
    <h5>{{uiLabels.burger}} {{id +1}} </h5>
    <h6>Din burgare:</h6>
    <div
    v-for="(ingredient,index) in menu.ingredients"
    v-if="ingredient.category < 5 "
    :key="index">
    {{ingredient["ingredient_"+ lang]}}
  </div>
  <br>

  <h6 v-if="existsExtras">{{uiLabels.extras}}:</h6>
  <div
  v-for="(ingredient,index) in menu.ingredients"
  v-if="ingredient.category > 4 "
  :key="index">
  {{ingredient["ingredient_"+ lang]}}
</div>
<div class="ord-check-foot">
  {{uiLabels.unitprice}}: {{menu.price}}:-
  <br>
  <div class="ord-quant">
    <label>{{uiLabels.quantity}}:</label><input
    type="number"
    v-model="menu.units"
    min="1"
    max="99">
    <div class="btns">
      <button @click="removeMenu">{{uiLabels.remove}}</button>
      <button @click="modifyMenu">{{uiLabels.modify}}</button>
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
    menu:Object,
    uiLabels: Object,
    lang: String
  },
  methods:{
    removeMenu:function(){
      this.$emit('remove_menu',this.id);
    },
    modifyMenu:function(){
      this.$emit('modify_menu', this.menu.ingredients, this.menu.units,this.id,this.menu.itemCount);
      this.$emit('change_view','designPage');
    },
  },
  computed:{
    existsExtras:function(){
      let extras = false;
      let i;
      for(i=0; i<this.menu.ingredients.length;i++){
        if(this.menu.ingredients[i].category > 4){
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

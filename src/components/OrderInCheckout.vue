<template>
  <div class="ord-check-div">
    <h5>{{uiLabels.burger}} {{id +1}} </h5>
    <div class="ord-check-bod">
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
</div>
<div class="ord-check-foot">
  <p>  {{uiLabels.unitprice}}: {{menu.price}}:-</p>
  <br>

  <div class="ord-quant">
    <label>{{uiLabels.quantity}}:</label>
  <div class="num-input">

    <button @click="decrement()" ></button>
    <input
    type="number"
    v-model="menu.units"
    min="1"
    max="99">
    <button @click="increment()" class="plus"></button>
  </div>
</div>

  <div class="btns">
    <button @click="removeMenu">{{uiLabels.remove}}</button>
    <button @click="modifyMenu">{{uiLabels.modify}}</button>
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
    increment:function(){
      this.menu.units += 1;
    },
    decrement:function(){
      if(this.menu.units != 1){
      this.menu.units -= 1;}
    },
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
.ord-check-bod{
  grid-row:2;
  height:10em;
  overflow-y: auto;
  overflow-x: hidden;
}

.ord-check-div{
  display:grid;
  background-color:rgba(255,255,255,0.9);
  border: 1px solid rgb(100,100,100);
}

.ord-check-foot{
  grid-row:3;
  display:grid;
  grid-template-columns: repeat(2,1fr);
}
.ord-check-foot p{
  grid-column:1/3;
  grid-row:1;
  text-align: center;
}
.ord-quant{
  grid-column:1/3;
  grid-row:2;
  display:grid;
}
.num-input{
  border: 2px solid #ddd;
  display: inline-flex;
}

.num-input,
.num-input * {
  box-sizing: border-box;
}

.num-input input[type=number]{
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
  max-width: 5rem;
  padding: .5rem;
  border: solid #ddd;
  border-width: 0 2px;
  text-align: center;
}
.num-input input[type=number]::-webkit-inner-spin-button,
.num-input input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
.num-input button {
  outline:none;
  -webkit-appearance: none;
  background-color: transparent;
  border: none;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  margin: 0;
  position: relative;
}

.num-input button:before,
.num-input button:after {
  display: inline-block;
  position: absolute;
  content: '';
  width: 1rem;
  height: 2px;
  background-color: #212121;
  transform: translate(-50%, -50%);
}
.num-input button.plus:after {
  transform: translate(-50%, -50%) rotate(90deg);
}

.btns{
  grid-column:1/3;
  grid-row:3;
  display:grid;
  grid-template-columns: repeat(2,1fr);
}

.btns button{
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

<template>

  <div class="category"
  v-bind:class="{'extras':category >= 5}">
  <div class="cat-title">
    <h2>{{ category_name }}: </h2>
  </div>
  <div class="box-wrapper">

    <Ingredient
    v-for="(item, index) in added_items"
    v-if="item.category === category"
    :item="item"
    :lang="lang"
    :key="index"
    @ingredient_clicked="removeIngredient(item,index)">
  </Ingredient>

  <button @click="emitInfoToModal"
  class="PlusButton"
  v-show="threshold > item_count">
  +
</button>
</div>
</div>
</template>

<script>
import Ingredient from '@/components/Ingredient.vue'

export default {
  props: {
    category: Number,/*Denna bestämmer vilken kategori som preresenteras*/
    category_name: String,/*uiLabel för kategori-rubriken*/
    added_items: Array,/*Array av redan valda ingredienser*/
    lang: String,/*Bestämmer vilket språk ingredienserna displayas med*/
    threshold: Number,/*Tröskelvärde för hur många ingredienser som får väljas innan plusknappen försvinner*/
    item_count: Number/*Jämförs mot tröskelvärdet*/
  },
  components:{
    Ingredient
  },
  data:function(){
    return {}
  },
  methods: {
    /*emittar en meddelande som säger till vilken ingrediens som ska bort och på vilken
    plats denna ligger*/
    removeIngredient:function(item,index){
      this.$emit('remove_ingredient',item,index);
    },
    /*emittar vilken kategori categoryrow tillhör så att ingredientsmodal
    ska veta vilka ingredienser som ska visas*/
    emitInfoToModal:function(){
      this.$emit('info_to_modal', this.category)
    },
  }
}
</script>

<style scoped>
.cat-title{
  width:10%;
  min-width: 155px;
  text-align: center;
  align-self: center;
}
.box-wrapper{
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.category{ /*Denna styr en kategori-rad*/
  position:relative;
  display:flex;
  flex-wrap: wrap;
  background-color: #b9d7cb;
  border-radius: 15px;
  margin: 0 0.5em 1em 0;
  height:calc(6em + 6px);
  width:100%;
  overflow:hidden;
}
.PlusButton, .ingredient{
  border: 1px solid #ccd;
  background-color: rgba(255, 255, 255, 0.5);
  color: rgb(100,100,100);
  border-radius: 15px;
  width:180px;
  cursor:pointer;
}
.PlusButton{
  font-size: 1.5em;
  line-height:0;
  margin:auto;
  height:4em;
  padding:0;
  margin:3px 3px 3px 0;
}
.ingredient{
  text-align:center;
  overflow-wrap: break-word;
  margin:3px 3px 3px 0;
}
.extras{
  background-color: #b9d7cb;
}

.ingredient:hover{
  background-color:#ed6381;
  color: rgb(255,255,255);
}
.PlusButton:hover{
  background-color: rgba(100, 100, 100, 0.5);
  color: rgb(80,80,80);
}
@media screen and (max-width:1270px){
  .category{
    flex-wrap: wrap;
    justify-content: center;
    height:auto;
  }
  .cat-title{
    width:100%;
  }
  .box-wrapper{
    justify-content: space-around;
  }
  .ingredient{
    height:5em;
    width:160px;
  }
  .PlusButton{
    width:160px;
  }
}
</style>

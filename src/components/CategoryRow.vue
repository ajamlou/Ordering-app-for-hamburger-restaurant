<template>

  <div class="category"
  v-bind:class="{'extras':category >= 5}">
  <div class="cat-title">
    <h2>{{ category_name }}: </h2>
  </div>
    <div class="box-wrapper">

      <Ingredient
      v-for="(item, index) in added_items"
      v-if="item.category == category"
      :item="item"
      :lang="lang"
      :key="item.ingredient_id"
      @increment="IngredientClicked(item,index)">
    </Ingredient>

    <button @click="emitModalInfo"
    class="PlusButton"
    v-show="threshold > item_count">
      <slot>+</slot>
    </button>


  </div>
</div>

</template>

<script>
import Ingredient from '@/components/Ingredient.vue'

export default {
  props: {
    category: Number,
    category_name: String,
    added_items: Array,
    lang: String,
    threshold: Number,
    item_count: Number
  },
  components:{
    Ingredient
  },
  data:function(){
    return {}
  },
  methods: {
    IngredientClicked:function(item,index){
      console.log("Jag är i ingredientClicked");
      this.$emit('ingredient_clicked',item,index);
    },
    emitModalInfo:function(){
      this.$emit('modal_info', this.category)
    },
  }
}

</script>

<style scoped>
.cat-title{
  width:10%;
  min-width: 120px;
  text-align: center;
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
  background-color: rgba(0, 255, 0, 0.5);
  border-radius: 15px;
  margin: 0 0.5em 1em;
  overflow:hidden;
}
.PlusButton, .ingredient{
  border: 1px solid #ccd;
  background-color: rgba(255, 255, 255, 0.5);
  font-size: 1.5em;
  color: rgb(100,100,100);
  border-radius: 15px;
  width:8em;
  height:4em;
  margin:3px 3px 3px;
  cursor:pointer;
}
.ingredient{
  text-align:center;
  word-wrap: break-word;
}
.extras{
  background-color: rgba(255, 0, 0, 0.5);
}

.ingredient:hover{
  background-color:rgba(255, 255, 255, 0.5);
  color: rgb(100,100,100);
}
.PlusButton:hover{
  background-color: rgba(100, 100, 100, 0.5);
  color: rgb(80,80,80);
}
</style>

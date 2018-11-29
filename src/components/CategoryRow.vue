<template>

  <div class="category"
  v-bind:class="{'extras':category >= 5}">
  <div class="cat-title">
    <h2>{{ categoryName }}: </h2>
  </div>
    <div class="box-wrapper">

      <Ingredient v-for="item in addedItems"
      v-if="item.category == category"
      :item="item"
      :lang="lang"
      :key="item.ingredient_id">
    </Ingredient>

    <button @click="emitModalInfo"
    class="PlusButton"
    v-show="threshold > itemCount">
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
    categoryName: String,
    addedItems: Array,
    lang: String,
    threshold: Number,
    itemCount: Number
  },
  components:{
    Ingredient
  },
  data:function(){
    return {}
  },
  methods: {
    emitModalInfo:function(){
      this.$emit('ModalInfo', this.category)
    },
    countOrders: function(){

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
  font-size: 2em;
  color: rgb(100,100,100);
  border-radius: 15px;
  width:7em;
  height:3em;
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

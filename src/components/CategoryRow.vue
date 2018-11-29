<template>

  <div class="category">

    <h2>{{ categoryName }}: </h2>

    <div class="plusbutton-wrapper">

      <Ingredient v-for="item in addedItems"
      v-if="item.category == category"
      :item="item"
      :lang="lang"
      :key="item.ingredient_id">
    </Ingredient>

      <button @click="emitModalInfo" class="PlusButton">
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
  }
}

  </script>

  <style scoped>
  .plusbutton-wrapper{
    text-align: left;
  }
  .PlusButton{
    border: 1px solid #ccd;
    background-color: rgba(255, 255, 255, 0.5);
    font-size: 2em;
    color: rgb(100,100,100);
    border-radius: 15px;
    flex: 0 0 auto;
    width:7em;
    display:table-cell;
    height:100%
  }
  .PlusButton:hover{
    background-color: rgba(100, 100, 100, 0.5);
    color: rgb(80,80,80);
  }
  </style>

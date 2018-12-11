<template>
  <div class="ingredient"
  v-on:click="ingredientClicked">
    <div class="ingredient-name">
      {{item["ingredient_"+ lang]}}
    </div>
    <div class="ingredient-price">
       {{item.selling_price}}:-
     </div>
     <div class="ico-div">
     <img class="ico" src="../assets/dairyfree.png"
     v-if="item.milk_free"/>
     <img class="ico" src="../assets/vegan.png"
     v-if="item.vegan"/>
   </div>
  </div>
</template>
<script>
export default {
  name: 'Ingredient',
  props: {
    item: Object,
    lang: String
  },
    data: function () {
    return {
      counter: 0
    };
  },
  methods: {
    ingredientClicked: function () {
      this.counter += 1;
      // sending 'ingredient-clicked' message to parent component or view so that it
      // can catch it with v-on:increment in the component declaration
      this.$emit('ingredient_clicked');
    },
  /*  resetCounter: function () {
      this.counter = 0;
    }*/
  }
}
</script>
<style scoped>
.ingredient-name{
  grid-column:1/4;
  grid-row:1;
}
.ingredient-price{
  grid-column:1/4;
  grid-row:2;
}
.ico{
  height:1em;
  margin-left:2px;
  display:inline-block;
}
.ico-div{
  grid-column: 1/4;
  grid-row:3;
}

.ingredient{
  display:grid;
  align-content: center;
  grid-template-columns: repeat(3,1fr);
  word-wrap: break-word;
}
/*.ingredient{
  position:relative;
  text-align:center;
  overflow-wrap: break-word;
  border: 1px solid #ccd;
  background-color: rgba(255, 255, 255, 0.5);
  font-size: 1em;
  color: rgb(100,100,100);
  border-radius: 15px;
  width:8em;
  height:4em;
  margin:3px 3px 3px;
  cursor:pointer;
}*/

.ingredient:hover{
  background-color: rgba(100, 100, 100, 0.5);
  color: rgb(80,80,80);
}
.ingredient-price{
  margin:auto;
}

</style>

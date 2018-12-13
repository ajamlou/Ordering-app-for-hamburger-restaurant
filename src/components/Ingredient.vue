<template>
  <div class="ingredient"
  v-on:click="ingredientClicked">
    <p class="ingredient-name">
      {{item["ingredient_"+ lang]}}</p>
    <p class="ingredient-price">
       {{item.selling_price}}:-
     </p>
     <div class="ico-div">
     <img class="ico" src="../assets/dairy.png"
     v-if="!item.milk_free"/>
     <img class="ico" src="../assets/vegan.png"
     v-if="item.vegan"/>
     <img class="ico" src="../assets/gluten.png"
     v-if="!item.gluten_free"/>
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
  display:inline-block;
  word-wrap: break-word;
  grid-column:2/5;
  grid-row:1;
  margin-bottom: 0;
}
.ingredient-price{
  grid-column:2/5;
  grid-row:2;
}
.ico{
  height:1.3em;
  padding-bottom:3px;
  display:inline-block;
}
.ico-div{
  grid-column: 5/6;
  grid-row:1/3;
  display:grid;
  justify-content:end;
  align-content: center;
  padding-right:4px;
}

.ingredient{
  font-size: 1.2em;
  display:grid;
  align-content: center;
  /*Baserat på 2 marginaler utefter margin + height av .ico*/
  grid-template-columns: calc(1px + 1.1em) repeat(3,1fr) calc(1px + 1.4em);
  max-height:6em;
  -ms-word-break: break-all;
     word-break: break-all;
     word-break: break-word;
     text-transform: capitalize;
}

.ingredient:hover{
  background-color: rgba(100, 100, 100, 0.5);
  color: rgb(80,80,80);
}
.ingredient-price{
  margin:auto;
}

</style>

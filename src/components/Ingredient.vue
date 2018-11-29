<template>
  <div class="ingredient" v-on:click="incrementCounter">
    <div class="ingredient-name">
      {{item["ingredient_"+ lang]}}
    </div>
    <div class="ingredient-price">
       {{item.selling_price}}:-
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
    incrementCounter: function () {
      this.counter += 1;
      // sending 'increment' message to parent component or view so that it
      // can catch it with v-on:increment in the component declaration
      this.$emit('increment');
    },
    resetCounter: function () {
      this.counter = 0;
    }
  }
}
</script>
<style scoped>
.ingredient{
  position:relative;
}

.ingredient:hover{
  background-color: rgba(100, 100, 100, 0.5);
  color: rgb(80,80,80);
}
.ingredient-price{
  position:absolute;
  bottom:0;
  width:100%;
}

</style>

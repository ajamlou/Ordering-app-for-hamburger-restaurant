<template>
  <div>
    <div
    v-for="(ingredient,index) in ingredients"
    v-if="ingredient.ingredient_id === 3"
    :key="index">
      {{ingredient["ingredient_"+ lang]}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Favorite',
  data: function(){
    return{
      bun: "",
      protein: "",
      garnish: "",
      Sauce: ""
}
},
props:{
ingredients: Array,
lang: String
},
// computed:{
//   favBurgers.bun: function(){
//     return this.bun
//   }
// },
methods:{
}
}
</script>
<style scoped>

.favorites{
  background-color: white;
  border:5px solid rgb(255, 0, 0);
  width: 320px;
  height: 320px;
}

.wrapper{
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}

.header{
  text-align: center;
}

.image{
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.ingredients{
  text-align: center;
  list-style-type: none;

}


</style>

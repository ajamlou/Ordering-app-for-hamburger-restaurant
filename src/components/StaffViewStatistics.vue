<template>
  <div>
    <div class="modal-header">
        <div>
          Vara
        </div>
        <div>
          Antal Sålda
        </div>
        <div>
          %
        </div>
    </div>

    <div
    v-for="(ingredient) in ingredients"
    class="ing-container"
    :key="ingredient.ingredient_id">

    <div>
    {{ingredient.ingredient_sv}}
  </div>

  <div>
    {{calculateOccurrences()}}
  </div>

  <div>

  </div>

</div>
</div>
</template>

<script>
export default {
  name: 'StaffViewStatistics',
  props:{
    ingredients:Array,
    orders:Object
  },
  data: function(){
    return{
      totalIngredients:0
    }
  },
  methods: {}
}
</script>

<style scoped>
.modal-header{
  /* position: fixed; */
  display: grid;
  grid-template-columns: 33% 33% 33%;
  text-align: center;
  overflow: hidden;
  height:2em;
  padding:0;
}
.ing-container{
  display: grid;
  grid-template-columns: 33% 33% 33%;
  text-align: center;
  height:100%;
  overflow-x: hidden;
  overflow-y:auto;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}
</style>

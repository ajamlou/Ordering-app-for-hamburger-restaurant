<template>
  <div>
  <div class="modal-header">
      <div>
        Vara
      </div>
      <div>
        Antal
      </div>
      <div>
        Säljpris
      </div>
  </div>

  <div class="modal-body">
    <div v-for="ingredient in ingredients"
    class="ing-container"
    :key="ingredient.ingredient_id">
      <div>
        {{ingredient.ingredient_sv}}
      </div>
      <div>
        {{ingredient.stock}}
      </div>
      <div>
      {{ingredient.selling_price}}
      </div>
  </div>
</div>

  <div class="modal-footer">
    <slot name="footer">
    </slot>
  </div>
</div>
</template>

<!-- Hämta antal kvar av varje ingrediens. I ingredient kan jag skriva item.stock för att få antal.
Vill få in alla ingredienser och skriva ut allas antal.-->


<script>

export default {
  name: 'StaffViewStorage',
  props: {
    ingredients: Array
  },
  methods: {

  }
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

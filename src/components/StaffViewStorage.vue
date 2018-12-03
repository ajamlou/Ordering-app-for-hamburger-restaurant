<template>
  <div>
  <div class="modal-header">
    <slot name="header">
      Lagerstatus
    </slot>
  </div>

  <div class="modal-body">
    <div v-for="ingredient in ingredients"
    class="ing-container">
      <div>
        {{ingredient.ingredient_sv}}
      </div>
      <div>
        {{ingredient.selling_price}}
      </div>
      <div>
        {{ingredient.stock}}
      </div>
  </div>
</div>

  <div class="modal-footer">
    <slot name="footer">
      Footer
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
.ing-container{
  display:grid;
  grid-template-columns: 30% 30% 30%;
  text-align: center;
}

</style>

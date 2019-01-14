<template>
    <div class="storage-backdrop">
      <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
      <div class="storage-wrapper">
        <button
        type="button"
        class="close-button"
        @click='switchVisibility'>
        X
      </button>
      <div>
        Vara
      </div>
      <div>
        Antal i lager
      </div>
      <div>
        Säljpris
      </div>
      <div class="storage-body">
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
    </div>
  </div>
</template>

<script>
// import StaffViewStorage from '@/components/StaffViewStorage.vue'

export default {
  name: 'KitchenModal',
  props: {
    decideContent:String,
    ingredients: Array,
    // orders: Object
  },
  components: {
    // StaffViewStorage,
    // SlotModal
  },
  methods: {
    switchVisibility: function() {
      this.$emit("visibility")
    }
  }
}
</script>

<style scoped>
.storage-backdrop {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .6);
  transition: opacity 0.3s ease;
  color: black;
}

.storage-wrapper {
  position: fixed;
  text-align: center;
  display: grid;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #FFFFFF;
  border-radius: 15px;
  padding-bottom: 20px;
  width: 75%;
  text-underline-position: auto;
}

.storage-body {
  grid-column: 1/4;
  width: 100%;
  height: 50vh;
  background-color: #fff;
  font-family: 'Montserrat', sans-serif;
  overflow-y: auto;
  overflow-x: hidden;
  text-transform: capitalize;
}

.ing-container {
  display: grid;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  grid-template-columns: 33% 33% 33%;

}

.close-button {
  grid-column: 3/4;
  justify-self: end;
  border-radius: 15px;
  font-size: 23px;
  height: 2em;
  width: 2em;
  cursor: pointer;
  font-weight: bold;
  color: white;
  background: red;
}

.close-button:hover {background-color: #660000}

</style>

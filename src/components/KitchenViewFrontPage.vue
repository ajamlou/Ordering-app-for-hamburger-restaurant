<template>
  <div class="kitchenFrontPage">
      <button id = "grillButton" @click = "emitSwitchVisibility('grillPage')">GRILL</button>
      <button  id = "preppButton" @click = "emitSwitchVisibility('preppPage')">PREPP</button>
  </div>
</template>

<script>
export default {
  name: 'KitchenViewFrontPage',
  methods: {
    emitSwitchVisibility: function(view) {
      this.$emit('Visibility',view)
    }
  }
}
</script>

<style scoped>
.KitchenFrontPage{
  color: black;
  padding: 50px;
  display: grid;
  font-size: 3vh;
  border-radius: 10px;
  margin: 10% auto;
}

#favoritesButton{
  background-color: firebrick;
}

#createBurgerButton {
  background-color: royalblue;
}

</style>

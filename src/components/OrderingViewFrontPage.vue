<template>
  <div>
      <button id = "createBurgerButton" @click = "emitSwitchVisibility('designPage')">SKAPA DIN BURGARE</button>
      <button id = "favoritesButton" @click = "emitSwitchVisibility('favoritesPage')">VÄLJ BLAND VÅRA FAVORITER</button>
  </div>
</template>

<script>
export default {
  name: 'OrderingViewFrontPage',
  methods: {
    emitSwitchVisibility: function(view) {
      this.$emit('Visibility',view)
    }
  }
}
</script>

<style scoped>

#createBurgerButton, #favoritesButton{
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

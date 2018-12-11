<template>
  <div>
    <!-- <p>{{uiLabels.createYourBurger}}</p>
    <p>{{uiLabels.chooseAFavorite}}</p> -->
      <button id = "createBurgerButton" @click = "emitSwitchVisibility('designPage')">SKAPA EN EGEN BURGARE</button>
      <button id = "favoritesButton" @click = "emitSwitchVisibility('favoritesPage')">VÄLJ FRÅN VÅRA FAVORITER</button>
  </div>
</template>

<script>
export default {
  name: 'OrderingViewFrontPage',
  props:{
    uiLabels: Object
  },
  methods: {
    emitSwitchVisibility: function(view) {
      this.$emit('Visibility',view)
    }
  }
}
</script>

<style scoped>
#favoritesButton, #createBurgerButton {
  color: black;
  padding: 10vh;
  display: grid;
  font-size: 3vh;
  border-radius: 3vh;
  border-color: black;
  margin: 10vh auto;
  align-items: center;
  cursor: pointer;
}

#favoritesButton{
  background-color: firebrick;
}
#favoritesButton:hover {
  background-color: orange;
  border-color: orange;
}

#createBurgerButton {
  background-color: royalblue;
}
#createBurgerButton:hover {
  background-color: lightblue;
  border-color: lightblue;
}
</style>

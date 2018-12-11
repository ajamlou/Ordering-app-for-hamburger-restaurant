<template>
  <div>
      <button id = "createBurgerButton" @click = "emitSwitchVisibility('designPage')">{{uiLabels.createYourBurger}}</button>
      <button id = "favoritesButton" @click = "emitSwitchVisibility('favoritesPage')">{{uiLabels.chooseAFavorite}}</button>
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
  text-transform: uppercase;
  color: white;
  padding: 10vh;
  display: grid;
  font-size: 4vh;
  border-radius: 3vh;
  border-color: black;
  margin: 10vh auto;
  align-items: center;
  cursor: pointer;
  width: 30vw;
  height: 28vh;
}

#favoritesButton{
  background-color: #ffa64d;
}
#favoritesButton:hover {
  background-color: #e67300;
  border-color: #e67300;
}

#createBurgerButton {
  background-color: #00e699;
}
#createBurgerButton:hover {
  background-color: #008055;
  border-color: #008055;
}
</style>

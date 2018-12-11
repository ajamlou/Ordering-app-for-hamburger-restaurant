<template>
  <div>
    <div id="welcome">
      {{uiLabels.welcomeText}}
    </div>
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
  background-color: #ff7733;
}
#favoritesButton:hover {
  background-color: #cc4400;
  border-color: #cc4400;
}
#favoritesButton:active {
  border: 3.5px solid #802b00;
}
#createBurgerButton {
  background-color: #00e699;
}
#createBurgerButton:hover {
  background-color: #008055;
  border-color: #008055;
}
#createBurgerButton:active {
  border: 3.5px solid #004d26;
}

#welcome{
  text-transform: uppercase;
  text-align: center;
  font-size: 4em;
  color: #66d9ff;
  text-shadow: 2px 2px #0086b3;
}
</style>

<template>
  <div
  id="frontPage">
<link href="https://fonts.googleapis.com/css?family=Allerta+Stencil|Luckiest+Guy|Montserrat|Syncopate:700" rel="stylesheet">
    <div id="welcome">
      {{uiLabels.welcomeText}}
    </div>
    <div id="buttons">
      <button id = "createBurgerButton" @click = "emitSwitchVisibility('designPage')">{{uiLabels.createYourBurger}}</button>
      <button id = "favoritesButton" @click = "emitSwitchVisibility('favoritesPage')">{{uiLabels.chooseAFavorite}}</button>
    </div>
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
#frontPage{
  display:grid;
  height:100%;
}
#welcome{
  grid-row:1/2;
}
#buttons{
  grid-row:2/4;
}
#favoritesButton, #createBurgerButton {
  text-transform: uppercase;
  color: white;
  padding: 5vh;
  display: grid;
  font-size: 4vh;
  border-radius: 3vh;
  border-color: black;
  margin: 6vh auto auto auto;
  align-items: center;
  cursor: pointer;
  width: 30vw;
  height:inherit;
}

#favoritesButton{
  background-color: #ff884d;
}
#favoritesButton:hover {
  background-color: #e64d00;
  border-color: #e64d00;
}
#favoritesButton:active {
  border: 3.5px solid #802b00;
}
#createBurgerButton {
  background-color: #00e699;
}
#createBurgerButton:hover {
  background-color: #009966;
  border-color: #009966;
}
#createBurgerButton:active {
  border: 3.5px solid #004d26;
}

#welcome{
  font-family: 'Luckiest Guy', sans-serif;
  text-transform: uppercase;
  text-align: center;
  font-size: 4em;
  color: #66d9ff;
  text-shadow: 2px 2px #0086b3;
}
</style>

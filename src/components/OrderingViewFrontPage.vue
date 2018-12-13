<template>
  <div
  id="frontPage">
<link href="https://fonts.googleapis.com/css?family=Allerta+Stencil|Luckiest+Guy|Montserrat|Syncopate:700" rel="stylesheet">
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
#frontPage{
  display:grid;
  grid-template-rows: 6em 30% 30%;
  grid-row-gap: 1em;
  height:100%;
  justify-items:center;
}
#favoritesButton, #createBurgerButton {
  text-transform: uppercase;
  color: white;
  display: grid;
  font-size: 4vh;
  border-radius: 3vh;
  border-color: black;
  align-items: center;
  justify-content:center;
  cursor: pointer;
  width: 30vw;
  min-width:200px;
  height:inherit;
}

#favoritesButton{
  background-color: #ff884d;
  grid-row:3/4;
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
  grid-row:2/3;
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
  grid-row:1/2;
}
@media screen and (max-width:905px){
  #frontPage{
    grid-template-rows: 30% 30% 30%;
    grid-auto-rows: auto;
    justify-content: center;
    align-items: center;
  }
}

@media screen and (max-width:515px){
  #welcome{
    font-size:3em;
  }

  #favoritesButton, #createBurgerButton{
    width:4em;
    font-size: 1.5em;
  }
}
</style>

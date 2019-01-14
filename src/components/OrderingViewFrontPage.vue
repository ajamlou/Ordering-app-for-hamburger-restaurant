<template>
  <div
  id="frontPage">
  <div
  id="orderingFrontPage-backdrop">
  <div class="welcome">
    <div
    v-if = "this.breadcrumbs.length === 0">
      {{uiLabels.welcomeText}}
    </div>
    <div
    v-if = "this.breadcrumbs.length != 0">
      {{uiLabels.anotherBurger}}
    </div>
  </div>
      <button id = "createBurgerButton" @click = "emitSwitchVisibility('designPage')">{{uiLabels.createYourBurger}}</button>
      <button id = "favoritesButton" @click = "emitSwitchVisibility('favoritesPage')">{{uiLabels.chooseAFavorite}}</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'OrderingViewFrontPage',
  props:{
    uiLabels: Object,
    breadcrumbs: Array
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
  justify-items: center;
}
#orderingFrontPage-backdrop{
  display:grid;
  grid-template-rows: minmax(min-content,max-content) 30% 30%;
  grid-row-gap: 1em;
  justify-items:center;
  background-color: rgba(255, 250, 224,0.99);
  border-radius:15px;
  width:95%;
  margin-bottom: 3em;
  padding-bottom: 1em;
}
.welcome{
  font-family: 'Lobster', sans-serif;
  text-align: center;
  font-size: 8vw;
  color: #ed6381; /*mörkrosa*/
  text-shadow: 2px 2px #444444; /*samma grå som bakgrundsrutorna */
  grid-row: 1;
  border-bottom: dotted;
  border-color: #ed6381;
}
#favoritesButton, #createBurgerButton {
  background-color: #b9d7cb; /*ljusturkos*/
  text-transform: uppercase;
  color: #444444;
  display: grid;
  font-size: 2em;
  border-radius: 3vh;
  border-color: black;
  border-width: thin;
  align-items: center;
  justify-content:center;
  cursor: pointer;
  width: 30vw;
  min-width:200px;
  height:inherit;
}
#createBurgerButton {
  grid-row:2/3;
}
#favoritesButton{
  grid-row:3/4;
}
#createBurgerButton:hover,#favoritesButton:hover {
  background-color: #6f8179;
}

/*------------------ CSS för ipad/mobiler-isch ------------*/
@media screen and (max-width:650px){
   .welcome{
    font-size:3em;
  }
  #favoritesButton, #createBurgerButton{
    width:4em;
    font-size: 1.5em;
  }
}
@media screen and (max-width:405px){
  .welcome{
    font-size: 3em;
  }
}
</style>

<template>
<div
id="orderingFrontPage-backdrop">
  <div
  id="frontPage">
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

#orderingFrontPage-backdrop{
  background-color: rgba(255, 250, 224,0.99);
  /* rgba(255, 255, 240,0.98); */
  border-radius:15px;
  width:95%;
  justify-self:center;
  margin-bottom:3em;
  padding-bottom:1em;
  /* margin-top:3em; */
  /* -webkit-box-shadow: 10px 7px 14px 0px rgba(158,158,158,1);
  -moz-box-shadow: 10px 7px 14px 0px rgba(158,158,158,1);
  box-shadow: 10px 7px 14px 0px rgba(158,158,158,1); */
}

#frontPage{
  display:grid;
  grid-template-rows: 6em 30% 30%;
  grid-row-gap: 1em;
  height:100%;
  justify-items: center;
}

#favoritesButton, #createBurgerButton {
  text-transform: uppercase;
  color: white;
  display: grid;
  font-size: 2em;
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
  background-color: #b9d7cb; /*ljusturkos*/
  /* #9E283A; mörkrosa */
  /* #DC143C; */
  grid-row:3/4;
}
#favoritesButton:hover {
  background-color: #6f8179;
  border-color: #000000;
}
#favoritesButton:active {
  border: 3.5px solid #802b00;
}
#createBurgerButton {
  background-color: #b9d7cb; /*ljusturkos*/
  /* #DC143C; */
  grid-row:2/3;
}
#createBurgerButton:hover {
  background-color: #6f8179;
  border-color: #000000;
}
#createBurgerButton:active {
  border: 3.5px solid #004d26;
}


.welcome{
  font-family: 'Lobster', sans-serif;
  /* font-family: 'Luckiest Guy', sans-serif; */
  /* text-transform: uppercase; */
  text-align: center;
  font-size: 5em;
  color: #ed6381; /*rosa*/
  /* #DF532F; - orange*/
  /* #66d9ff; - ljusblå*/
  text-shadow: 2px 2px #444444; /*samma grå som bakgrundsrutorna */
  /* #9c3a20; mörkorange */
  grid-row:1/2;
}
@media screen and (max-width:905px){
  #frontPage{
    grid-template-rows: auto auto auto auto;
    grid-auto-rows: auto;
    justify-content: center;
    align-items: center;
  }
}

@media screen and (max-width:650px){
  #welcome{
    font-size:3em;
  }

  #favoritesButton, #createBurgerButton{
    width:4em;
    font-size: 1.5em;
  }
}
</style>

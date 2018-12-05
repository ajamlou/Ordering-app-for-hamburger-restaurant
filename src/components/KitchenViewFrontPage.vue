<template>
<div class="masterDivKitchenFront">
  <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">

  <div class="kitchenButtons">
      <button id = "grillButton" @click = "emitSwitchVisibility('grillPage')">GRILL</button>
      <button  id = "preppButton" @click = "emitSwitchVisibility('preppPage')">PREPP</button>
  </div>

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
.masterDivKitchenFront{
  font-family: 'Montserrat', sans-serif;
  height:100vh;
  margin-top:0px !important;
  padding-top:0px !important;
  background-color:#f8ffd6;
}

#grillButton, #preppButton{
  width: 25vw;
  height: 20vh;
  border-radius: 1vh;

  display: grid;
  grid-row-gap: 20vh;

  color: black; /*textcolor*/
  font-size: 5vh;

  cursor: pointer;

  /* width: 50vh;
  display: grid;
  grid-row-gap: 8vh;
  padding: 200px;
  border: none;
  margin: none;
  color: white;

  text-align: center;
  font-size: 30px;

  cursor: pointer; */
}

#grillButton{
  background-color: firebrick;
}

#preppButton {
  background-color: royalblue;
}

button{

}

button:hover{

}

</style>

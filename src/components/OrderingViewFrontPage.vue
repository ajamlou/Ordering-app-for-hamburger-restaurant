<template>
  <div class="frontPage">
    <div class = "createBurgerButtonClass">
      <button id = "createBurgerButton" @click = "emitSwitchVisibility">SKAPA DIN BURGARE</button>
    </div>
    <div class = "favoritesButtonClass">
      <button  id = "favoritesButton">VÄLJ BLAND VÅRA FAVORITER</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderingViewFrontPage',

  methods: {
    emitSwitchVisibility: function() {
      this.$emit('Visibility','designBurger')
    }
  }
}
</script>

<style scoped>
.frontPage{
}
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

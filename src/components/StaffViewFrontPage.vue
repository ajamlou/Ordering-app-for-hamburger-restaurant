<template>
  <div id = "buttonMesh">
    <div id = "statisticsId" class = "statisticsButtonClass">
      <button id = "statisticsButton">STATISTIK</button>
    </div>
    <div class = "kitchenButtonClass">
      <button  id = "kitchenButton" @click = "emitSwitchVisibility">ORDERBESTÄLLNINGAR</button>
    </div>
    <div class = "storageButtonClass">
      <button  id = "storageButton" >LAGERHÅLLNING</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'StaffViewFrontPage',

    methods: {
      emitSwitchVisibility: function() {
        this.$emit('Visibility')
      }
    }
  }
</script>

<style scoped>
#kitchenButton, #statisticsButton{
border: none;
color: black;
padding: 15px;
text-decoration: none;
display: inline-block;
font-size: 2.5vh;
border-radius: 4px;
}

#statisticsButton{
  background-color: magenta;
}

#kitchenButton {
  background-color: #4CAF50;
}

.kitchenButtonClass, .statisticsButtonClass{
  margin: auto;
}

</style>

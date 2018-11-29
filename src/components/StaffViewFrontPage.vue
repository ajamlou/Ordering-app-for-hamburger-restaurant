<template>
  <div id = "buttonMesh">
    <div class = "kitchenButtonClass">
      <button  id = "kitchenButton" @click = "emitSwitchVisibility">ORDERBESTÄLLNINGAR</button>
    </div>
    <div class = "statisticsButtonClass">
      <button id = "statisticsButton">STATISTIK</button>
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

#buttonMesh {

}

#kitchenButton, #statisticsButton, #storageButton{
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

#kitchenButton {
  background-color: #4CAF50;
}
#storageButton {
  background-color: #40E0D0;
}

.kitchenButtonClass, .statisticsButtonClass, .storageButtonClass{
  margin: auto;
}

</style>

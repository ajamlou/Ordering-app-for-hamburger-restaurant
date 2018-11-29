<template>
  <div id = "buttonMesh">
    <div class = "statisticsButtonClass">
      <button id = "statisticsButton" @click = "emitSwitchVisibility">STATISTIK</button>
    </div>
    <div class = "storageButtonClass">
      <button  id = "storageButton" >LAGER</button>
    </div>
    <div class = "selectButtonClass">
      <button  id = "selectButton" >MARKERA</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'StaffViewModals',

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

#selectButton, #statisticsButton, #storageButton{
border: none;
color: black;
padding: 15px;
text-decoration: none;
display: inline-block;
font-size: 2.5vh;
border-radius: 4px;
width: 9vw;
}

#statisticsButton{
  background-color: magenta;
}

#selectButton {
  background-color: #4CAF50;
}

#storageButton {
  background-color: #40E0D0;
}

.selectButtonClass, .statisticsButtonClass, .storageButtonClass{
  margin: auto;
}

</style>

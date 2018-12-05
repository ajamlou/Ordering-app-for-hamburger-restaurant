<template>
<div class="masterDivKitchenFront">
  <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">

  <button id = "grillButton" @click = "emitSwitchVisibility('grillPage')">GRILL</button>
  <button  id = "preppButton" @click = "emitSwitchVisibility('preppPage')">PREPP</button>

  <div class = "statisticsButtonClass">
  <button  id = "statisticsButton" @click="toggleVisibility(), decideContent('s')">STATISTIK</button>
  </div>
  <div class = "storageButtonClass">
  <button  id = "storageButton" @click="toggleVisibility(), decideContent('l')">LAGER</button>
  </div>

  <!-- Om modalen för statisitk- och lagerknappen ska visas eller ej-->
  <KitchenModal
  @switchVisibility = "toggleVisibility"
  :decideContent="decidedContent"
  :ingredients = "ingredients"
  v-show = "ModalVisibility === true">
  </KitchenModal>

</div>
</template>

<script>
import KitchenModal from '@/components/KitchenModal.vue'
import StaffViewStorage from '@/components/StaffViewStorage.vue'
import StaffViewStatistics from'@/components/StaffViewStatistics.vue'
import sharedVueStuff from '@/components/sharedVueStuff.js'


export default {
  name: 'KitchenViewFrontPage',
  components:{
    KitchenModal,
    StaffViewStorage,
    StaffViewStatistics
  },
  mixins: [sharedVueStuff],
  data: function(){
    return {
      ModalVisibility: false,
      decidedContent: ""
    }
  },
  methods: {
    emitSwitchVisibility: function(view) {
      this.$emit('Visibility',view)
    },
    toggleVisibility: function(){
      if (this.ModalVisibility === true){
        this.ModalVisibility = false;
      }
      else {
        this.ModalVisibility = true;
      }
    },
    decideContent: function(string){
      if (string === "l"){
        this.decidedContent = "storage";
      }
      else {
        this.decidedContent = "statistics";
      }
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
}

#grillButton{
  background-color: firebrick;
}

#preppButton {
  background-color: royalblue;
}

#statisticsButton, #storageButton{
border: 2px solid white;
color: white;
text-shadow: 2px 2px #696969;
cursor: pointer;
padding: 15px;
text-decoration: none;
display: inline-block;
font-size: 4vh;
border-radius: 18px;
font-size: 1.9vh;
font-size: 1.9vw;
width: 12vw;
height: 10vh;
margin: 5vh;
background-color: #00b386;
}

button{

}

button:hover{

}

</style>

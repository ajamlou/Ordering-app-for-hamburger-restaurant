<template>
<div id="frontPageGrid">
  <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">

  <button id = "grillButton" @click = "emitSwitchVisibility('grillPage')">GRILL</button>
  <button  id = "preppButton" @click = "emitSwitchVisibility('preppPage')">PREPP</button>

  <div id="modal-div">
  <button  id = "statisticsButton" @click="toggleVisibility(), decideContent('s')">STATISTIK</button>
  <button  id = "storageButton" @click="toggleVisibility(), decideContent('l')">LAGER</button>
  <button  id = "favoritesButton" @click="emitSwitchVisibility('f')">FAVORITER</button>
  </div>

  <!-- Om modalen för statisitk- och lagerknappen ska visas eller ej-->
  <KitchenModal
  @switchVisibility = "toggleVisibility"
  :decideContent="decidedContent"
  :ingredients = "ingredients"
  v-show = "ModalVisibility === true">
  </KitchenModal>

  <!-- Om modalen för ändra favoriter ska visas eller ej
  <SlotModal v-if ="currentView === 'f'">
    <div slot="header"><button
          type="button"
          class="backButton"
          @click="currentView = 'kitchenFrontPage'">
          Stäng
        </button></div>

        <div slot ="footer"><button
          type="button"
          class="backButton"
          @click="changeFavorites">
          Bekräfta
        </button></div>
  </SlotModal>-->

</div>
</template>

<script>
import KitchenModal from '@/components/KitchenModal.vue'
import StaffViewStorage from '@/components/StaffViewStorage.vue'
import StaffViewStatistics from'@/components/StaffViewStatistics.vue'
import SlotModal from'@/components/SlotModal.vue'


export default {
  name: 'KitchenViewFrontPage',
  components:{
    KitchenModal,
    StaffViewStorage,
    StaffViewStatistics,
    SlotModal
  },
  props:{
    ingredients: Array,
    uiLabels: Object
  },
  data: function(){
    return {
      ModalVisibility: false,
      decidedContent: ""
    }
  },
  methods: {
    //avgör om gå till grill eller prepp
    emitSwitchVisibility: function(view) {
      this.$emit('Visibility',view)
    },
    //om modalen ska visas eller inte
    toggleVisibility: function(){
      if (this.ModalVisibility === true){
        this.ModalVisibility = false;
      }
      else {
        this.ModalVisibility = true;
      }
    },
    //avgör om lager ellet statistik visas i modal
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
#frontPageGrid{
  display:grid;
  grid-template-rows: 15vh auto auto auto auto;
  justify-items:center;
  grid-gap:10px;
}
/*css för grill- och preppknappar*/
#grillButton, #preppButton{
  width: 25vw;
  height: 20vh;
  border-radius: 1vh;
  margin:auto;

  color: black; /*textcolor*/
  font-size: 5vh;

  cursor: pointer;
}
#grillButton{
  background-color: firebrick;
  grid-row:2;
}
#preppButton {
  background-color: royalblue;
  grid-row:3;
}

/*css för statistik- och lagerknappar*/
#modal-div{
  grid-row:4;
}
#modal-div > *{
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

</style>

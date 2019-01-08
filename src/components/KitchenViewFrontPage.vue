<template>
<div id="frontPageGrid">
  <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">

  <button id = "grillButton" @click = "emitSwitchVisibility('grillPage')">GRILL</button>
  <button  id = "preppButton" @click = "emitSwitchVisibility('preppPage')">PREPP</button>

  <div id="button-div">
  <!--<button  id = "statisticsButton" @click="toggleVisibility(), decideContent('s')">STATISTIK</button>-->
  <button  id = "storageButton" @click="toggleVisibility(), decideContent('l')">LAGER</button>
  <button  id = "favoritesButton" @click="emitSwitchVisibility('f')">FAVORITER</button>
  </div>

  <!-- Om modalen för statisitk- och lagerknappen ska visas eller ej-->
  <KitchenModal
  @switchVisibility = "toggleVisibility"
  :decideContent="decidedContent"
  :ingredients = "ingredients"
  :orders="orders"
  v-show = "ModalVisibility === true">
  </KitchenModal>


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
    orders:Object,
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
  min-width: 7em;
  height: 20vh;
  border-radius: 1vh;
  margin:auto;
  color: black; /*textcolor*/
  font-size: 5vh;
  text-shadow: 2px 2px #000000;
  background:rgba(255,255,255,0.2);
  cursor: pointer;
}
#grillButton{
  color: #e52c1a;
  border:10px double #e52c1a;
  grid-row:2;
}
#preppButton {
  color:#237aae;
  border:10px double #237aae;
  grid-row:3;
}

/*css för statistik- och lagerknappar*/
#button-div{
  grid-row:4;
}
#button-div > *{
border: 2px solid white;
color: white;
text-shadow: 2px 2px #696969;
cursor: pointer;
padding: 15px;
text-decoration: none;
display: inline-block;
font-size: 4vh;
border-radius: 18px;
font-size: 1.5em;
min-width: 7em;
height: 10vh;
margin: 5vh;
background-color: #00b386;
}

</style>

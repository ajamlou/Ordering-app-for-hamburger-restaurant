<template>
  <div id="frontPageGrid">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">

    <button id = "grillButton" @click = "emitSwitchVisibility('grillPage')">GRILL</button>
    <button  id = "preppButton" @click = "emitSwitchVisibility('preppPage')">PREPP</button>

    <div id="button-div">
      <button  id = "storageButton" @click='toggleVisibility'>LAGER</button>
      <button  id = "favoritesButton" @click="emitSwitchVisibility('f')">FAVORITER</button>
    </div>

    <!-- Om lagermodalen ska visas eller ej-->
    <KitchenModal
    :decidedContent = "storage"
    :ingredients = "ingredients"
    @visibility = "toggleVisibility"
    v-if = "this.showStorageModal">
  </KitchenModal>
</div>
</template>

<script>
import KitchenModal from '@/components/KitchenModal.vue'
// import StaffViewStorage from '@/components/StaffViewStorage.vue'
import SlotModal from'@/components/SlotModal.vue'

export default {
  name: 'KitchenViewFrontPage',
  components:{
    KitchenModal,
    // StaffViewStorage,
    SlotModal
  },
  props:{
    ingredients: Array,
    orders:Object,
    uiLabels: Object
  },
  data: function(){
    return {
      showStorageModal: false,
    }
  },
  methods: {
    //avgör om gå till grill eller prepp
    emitSwitchVisibility: function(view) {
      this.$emit('Visibility',view)
    },
    //om storage ska visas eller ej
    toggleVisibility: function(){
      this.showStorageModal = !this.showStorageModal;
    }
  }
}
</script>

<style scoped>
#frontPageGrid{
  display: grid;
  grid-template-rows: 15vh auto auto auto auto;
  justify-items: center;
  grid-gap: 10px;
}
/*css för grill- och preppknappar*/
#grillButton, #preppButton{
  width: 25vw;
  min-width: 7em;
  height: 20vh;
  border-radius: 1vh;
  margin: auto;
  color: white; /*textcolor*/
  font-size: 5vh;
  text-shadow: 2px 2px #000000;
  background: rgba(255,255,255,0.2);
  cursor: pointer;
}
#grillButton{
  color: #ff9999;
  border: 10px double #ff4d4d;
  grid-row: 2;
}
#preppButton {
  color: #80bfff;
  border: 10px double #3399ff;
  grid-row: 3;
}

/*css för lager- och favoritknappar*/
#button-div{
  grid-row: 4;
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

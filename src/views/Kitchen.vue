<template>
  <div id="masterDivKitchen">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">

    <button
    id="backButton"
    @click="currentView = 'kitchenFrontPage'"
    v-if = "currentView != 'kitchenFrontPage'">
    {{ uiLabels.back2 }}
  </button>

  <div
  class="contentPage"
  v-if = "currentView === 'kitchenFrontPage'">
  <KitchenViewFrontPage
  @Visibility="changeView"
  v-if = "currentView === 'kitchenFrontPage'"
  :ingredients="ingredients"
  :orders="orders"
  :uiLabels="uiLabels">
</KitchenViewFrontPage>
</div>

<!-- Om modalen för ändra favoriter ska visas eller ej -->
<ChangeFavorites id = "changeFavorites" v-if ="currentView === 'f'"
:ingredients= "ingredients"
:favBurgers= "favBurgers">
</ChangeFavorites>

<!-- GrillView -->
<!-- Använder class = grillPage i denna div för att sen kunna "skriva över"
med ett id i GrillView.vue -->
<div class="contentPage"
v-show="currentView === 'grillPage'">
<GrillView
:ingredients="ingredients"
:uiLabels="uiLabels"
:orders="orders"
:lang="lang">
</GrillView>
</div>

<!-- PreppView -->
<!-- Använder class = preppPage i denna div för att sen kunna "skriva över"
med ett id i PreppView.vue -->
<PreppView
class="contentPage"
v-show="currentView === 'preppPage'"
:ingredients="ingredients"
:uiLabels="uiLabels"
:orders="orders"
:lang="lang">
</PreppView>
</div>

</template>
<script>
import KitchenModal from '@/components/KitchenModal.vue'
import ChangeFavorites from '@/components/ChangeFavorites.vue'
import OrderItem from '@/components/OrderItem.vue'
import OrderItemToPrepare from '@/components/OrderItemToPrepare.vue'
import OrderItemIsCooking from '@/components/OrderItemIsCooking.vue'
import OrderItemFinished from '@/components/OrderItemFinished.vue'
import sharedVueStuff from '@/components/sharedVueStuff.js'
import KitchenViewFrontPage from '@/components/KitchenViewFrontPage.vue'
import PreppView from '@/components/PreppView.vue'
import GrillView from '@/components/GrillView.vue'
import SlotModal from '@/components/SlotModal.vue'

export default {
  name: 'Ordering',
  components: {
    OrderItem,
    OrderItemToPrepare,
    OrderItemIsCooking,
    OrderItemFinished,
    KitchenModal,
    KitchenViewFrontPage,
    PreppView,
    GrillView,
    SlotModal,
    ChangeFavorites
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
  //the ordering system and the kitchen
  data: function(){
    return {
      chosenIngredients: [],
      price: 0,
      currentView: "kitchenFrontPage"
    }
  },
  methods: {
    changeFavorites: function(){
    },
    changeView: function(view){
      this.currentView = view;
    },
  }
}
</script>
<style scoped>

#masterDivKitchen{
  font-family: 'Montserrat', sans-serif;
  min-height:100vh;
  margin-top:0 !important;
  padding-top:0 !important;
  background: url('../assets/CLP_blackboardSmooth.jpg');
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}
.contentPage{
  grid-row: 1;
  grid-column: 1/7;
}
#changeFavorites{
  grid-column: 1/7;
}
#backButton {
  grid-row: 2;
  grid-column: 1;
  border: 2px solid white;
  color: white;
  text-shadow: 2px 2px #696969;
  cursor: pointer;
  padding: 15px;
  text-decoration: none;
  border-radius: 18px;
  background-color: #dc143c;
}
#backButton:hover {
  background-color: #98102b
}
#backButton:active {
  border: 2px solid grey;
}
</style>

<template>

<div>
<h1>PREPPPPPING</h1>


<div class = "backButtonClass" @click="currentView = 'kitchenFrontPage'">
  <button id = "backButton">
    {{ uiLabels.back2 }}
    </button>
</div>
</div>

</template>

<script>
import sharedVueStuff from '@/components/sharedVueStuff.js'

export default {
  name: 'PreppPage',
  components: {

  }
  mixins: [sharedVueStuff],
}
// import KitchenViewFrontPage from '@/components/KitchenViewFrontPage.vue'
// import OrderItemIsCooking from '@/components/OrderItemIsCooking.vue'
// import OrderItemFinished from '@/components/OrderItemFinished.vue'
// import OrderItem from '@/components/OrderItem.vue'
//
// export default {
//   name: 'PreppView',
//   components: {
//     OrderItem,
//     OrderItemIsCooking,
//     OrderItemFinished,
//     KitchenViewFrontPage,
//     PreppView
//   },
//   data: function(){
//     return {
//       chosenIngredients: [],
//       price: 0,
//       // currentView: "kitchenFrontPage"
//     }
//   },
//   changeView: function(view){
//     this.currentView = view;
//   },
// }
//

</script>

<style scoped>
#backButton{
  border: 2px solid white;
  color: white;
  text-shadow: 2px 2px #696969;
  background-color: #00b386;
  cursor: pointer;
  padding: 5px;
  text-decoration: none;
  font-size: 4vh;
  border-radius: 18px;
  font-size: 1.9vh;
  font-size: 1.9vw;
  width: 12vw;
  height: 10vh;
  margin-top: 1vh;
  margin-left: 0;
  margin-bottom: 1vh;
}
#backButton:hover {background-color: #008060}
#backButton:active {border: 2px solid grey;}
</style>

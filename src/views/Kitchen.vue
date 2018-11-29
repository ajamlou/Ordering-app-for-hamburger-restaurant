
<template>
  <div>

<StaffViewFrontPage
  @Visibility="kitchenButton"
  v-if = "kitchenButtonData === 'no show'">
</StaffViewFrontPage>

    <div id="kitchen-grid" v-if = "kitchenButtonData === 'show'">
      <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
      <div id="orders">
        <div id="header1">
          <h1>{{ uiLabels.ordersInQueue }}</h1>
        </div>
        <div>
          <OrderItemToPrepare class="toPrepare"
          v-for="(order, key) in orders"
          v-if="order.status == 'not-started'"
          v-on:done="markDone(key)"
          :order-id="key"
          :order="order"
          :ui-labels="uiLabels"
          :lang="lang"
          :key="key">
        </OrderItemToPrepare>
      </div>
    </div>

    <div id="preparing">
      <div id="header2">
        <h1>{{ uiLabels.ordersPreparing }}</h1>
      </div>
      <div>
        <OrderItemToCook class="isPreparing"
        v-for="(order, key) in orders"
        v-if="order.status === 'done'"
        v-on:cooked="markCooked(key)"
        :order-id="key"
        :order="order"
        :ui-labels="uiLabels"
        :lang="lang"
        :key="key">
      </OrderItemToCook>
    </div>
  </div>

  <div id="finished">
    <div id="header3">
      <h1>{{ uiLabels.ordersFinished }}</h1>
    </div>
    <div>
      <OrderItem class="orderFinished"
      v-for="(order, key) in orders"
      v-if="order.status === 'started'"
      :order-id="key"
      :order="order"
      :lang="lang"
      :ui-labels="uiLabels"
      :key="key">
    </OrderItem>
  </div>
</div>
<div class="backButtonClass">
  <button id = "backButton" @click = "backButton"> TILLBAKA </button>
</div>
<div class="selectButton">
  Här tänkte jag att vi kan ha en markera-knapp längst åt höger.
</div>
</div>

</div>

</template>
<script>
import StaffViewFrontPage from '@/components/StaffViewFrontPage.vue'
import OrderItem from '@/components/OrderItem.vue'
import OrderItemToPrepare from '@/components/OrderItemToPrepare.vue'
import OrderItemToCook from '@/components/OrderItemToCook.vue'
//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'
export default {
  name: 'Ordering',
  components: {
    OrderItem,
    OrderItemToPrepare,
    OrderItemToCook,
    StaffViewFrontPage
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
  //the ordering system and the kitchen
  data: function(){
    return {
      chosenIngredients: [],
      price: 0,
      kitchenButtonData: "no show"
    }
  },
  methods: {
    markDone: function (orderid) {
      this.$store.state.socket.emit("orderDone", orderid);
    },
    markCooked: function (orderid) {
      this.$store.state.socket.emit("orderStarted", orderid);
    },
    kitchenButton: function(){
      this.kitchenButtonData = "show";
    },
    backButton: function(){
      this.kitchenButtonData = "no show";
    }
  }
}
</script>
<style scoped>

#kitchen-grid {
  display: grid;
  position: fixed;
  grid-template-columns: 25% 50% 25%;
  color: white;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  height: 99vh;
}

#header1, #header2, #header3 {
  height: 10vh;
  position: fixed;
  line-height: 4vh;
  font-size:16pt;
  border-radius: 4px;
  border: 1px solid white;
  text-shadow: 2px 2px #696969;
  margin: auto;
  font-size: 3vh;
}

#header1 {
  background: #DC143C;
  width: 25vw;
}
#header2 {
  background: #00BFFF;
  width: 50vw;
}
#header3 {
  background: #00FF7F;
  width: 25vw;
}

#orders, #preparing, #finished {
  font-size: 1em;
  border: 2px solid white;
  border-radius: 6px;
}

#preparing {
  width: 50vw;
}
#orders, #finished {
  width: 25vw;
}

.toPrepare, .orderFinished {
  width: 42%;
}
.isPreparing {
  width: 30%;
}

.toPrepare, .isPreparing, .orderFinished {
  border: 2px solid white;
  font-size: 2.5vh;
  float: left;
  height: 100px;
  margin: 8px;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 20px;
  border: 3px solid white;
  background-color: black;
}

.isPreparing, .toPrepare, .orderFinished, #orders, #header1, #preparing, #header2, #finished, #header3 {
  overflow: auto
}

h1 {
  text-transform: uppercase;
  font-size: 1.4em;
  text-color: white;
}

/* ccskod för knappar under denna kommentar */
#buttonMesh{
  display: grid;
}

.backButtonClass{
  margin: auto;
}

#backButton{
  border: none;
  color: black;
  padding: 15px 32px;
  text-decoration: none;
  display: inline-block;
  font-size: 2.5vh;
  border-radius: 4px;
}

#backButton {
  background-color: #FFA500;
}

.selectButton {
  width: 100%;
  margin: 10px;
  margin-left: 5px;
}

</style>

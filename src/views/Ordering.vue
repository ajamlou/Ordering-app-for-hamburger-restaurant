<template>

<div id="welcome">
<OrderingViewFrontPage
  @Visibility="createBurgerButton"
  v-if = "createBurgerButtonData === 'no show'">
</OrderingViewFrontPage>

<div id="ordering" v-if = "createBurgerButtonData === 'show'">
    <img class="example-panel" src="@/assets/exampleImage.jpg">
    <button v-on:click="switchLang()">{{ uiLabels.language }}</button>

    <h1>{{ uiLabels.myOrder }}</h1>
    <h2>{{ uiLabels.myBurger }} </h2>
    <modal ref="modal"
    :category="this.modalCategory"
    v-show="this.isModalVisible === true"
    :ingredients="ingredients"
    :lang="lang"
    @addOrder="addToOrder"
    @ModalInfo="switchVisibility">
  </modal>

    <div id="categories-wrapper">
      <CategoryRow v-for="category in burgerCategories"
      :key="category.categoryNr"
      :category="category.categoryNr"
      :addedItems="displayedIngredients"
      @ModalInfo="switchVisibility"
      :categoryName="uiLabels[category.label]"
      :lang="lang">
    </CategoryRow>

    <h1>{{uiLabels.sidesAndDrinks}}</h1>

 <CategoryRow v-for="category in extrasCategories"
:key="category.categoryNr"
:category="category.categoryNr"
:addedItems="displayedIngredients"
@ModalInfo="switchVisibility"
:categoryName="uiLabels[category.label]"
:lang="lang">
</CategoryRow>
<!--
<div class="category">
  <h2>{{ uiLabels.patty }}: </h2>
  <div id="patty" class="ingredient-wrapper">
  <Ingredient
  ref="ingredient"
  v-for="item in ingredients"
  v-on:increment="addToOrder(item)"
  v-if="item.category == 1"
  :item="item"
  :lang="lang"
  :key="item.ingredient_id">
</Ingredient>
</div>
</div> !-->

    </div>
<!--
    <h1>{{ uiLabels.order }}</h1>
    {{ displayedIngredients.map(item => item["ingredient_"+lang]).join(', ') }}, {{ price }} kr
    <button v-on:click="placeOrder()">{{ uiLabels.placeOrder }}</button>

    <h1>{{ uiLabels.ordersInQueue }}</h1>
    <div>
        <OrderItem
                   v-for="(order, key) in orders"
                   v-if="order.status !== 'done'"
                   :order-id="key"
                   :order="order"
                   :ui-labels="uiLabels"
                   :lang="lang"
                   :key="key">
    </OrderItem>
  </div> -->
    </div>
    </div>
</template>
<script>
//import the components that are used in the template, the name that you
//use for importing will be used in the template above and also below in
//components
import Ingredient from '@/components/Ingredient.vue'
import OrderItem from '@/components/OrderItem.vue'
//import PlusButton from '@/components/PlusButton.vue'
import CategoryRow from '@/components/CategoryRow.vue'
import Modal from '@/components/Modal.vue'
import OrderingViewFrontPage from '@/components/OrderingViewFrontPage.vue'

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

/* instead of defining a Vue instance, export default allows the only
necessary Vue instance (found in main.js) to import your data and methods */
export default {
  name: 'Ordering',
  components: {
    Ingredient,
    OrderItem,
    CategoryRow,
    Modal,
    OrderingViewFrontPage
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
  // the ordering system and the kitchen
  data: function() { //Not that data is a function!
    return {
      chosenIngredients: [],
      displayedIngredients: [],
      price: 0,
      createBurgerButtonData: "no show",
      orderNumber: "",
      modalCategory:0,
      isModalVisible: false,
      burgerCategories:[
        {categoryNr: 4,
        label:"bread"},
        {categoryNr: 1,
        label:"patty"},
        {categoryNr: 2,
        label: "garnish"},
        {categoryNr: 3,
        label:"sauce"}
      ],
      extrasCategories:[
        {categoryNr: 5,
        label:"sides"},
        {categoryNr: 6,
        label:"drinks"},
      ]
    }
  },
  created: function () {
    this.$store.state.socket.on('orderNumber', function (data) {
      this.orderNumber = data;
    }.bind(this));
  },
  methods: {
    switchVisibility: function(category) {
      if (this.isModalVisible === true){
        this.isModalVisible = false;
      }
      else {
      this.modalCategory=category;
      this.isModalVisible = true;
    }

    },
      createBurgerButton: function(){
      this.createBurgerButtonData = "show";
    },
    addToOrder: function (item) {
      this.displayedIngredients.push(item);
      if(item.category !== 5 && item.category !== 6){
      this.chosenIngredients.push(item);
    }
      this.price += +item.selling_price;
      this.isModalVisible = false;
    },
    placeOrder: function () {
      var i,
      //Wrap the order in an object
        order = {
          ingredients: this.chosenIngredients,
          price: this.price
        };
      // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
      this.$store.state.socket.emit('order', {order: order});
      //set all counters to 0. Notice the use of $refs
      for (i = 0; i < this.$refs.modal.$refs.ingredient.length; i += 1) {
        this.$refs.modal.$refs.ingredient[i].resetCounter();
      }
      this.price = 0;
      this.chosenIngredients = [];
      this.displayedIngredients = [];
    }
  }
}
</script>
<style scoped>
    /* scoped in the style tag means that these rules will only apply to elements, classes and ids in this template and no other templates. */
    #ordering {
        margin:auto;
        width: 90%;
    }

    .example-panel {
        position: fixed;
        left:0;
        top:0;
        z-index: -2;
    }


.ingredient { /*Styr 1 enskild ingrediens-ruta*/
  border: 1px solid #ccd;
  padding: 1em;
  background-image: url('~@/assets/exampleImage.jpg');
  color: white;
  border-radius: 15px;
  flex: 0 0 auto;
  width:7em;
  display:table-cell;
}

.ingredient-wrapper{ /*Denna styr horisontell scroll*/
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y:hidden;
  border-radius: 15px;
  /*display: grid;
  grid-gap: 0px;
  grid-template-columns: repeat(10,10%);
  grid-template-areas: "title";
  text-align: center;*/
}

.category{ /*Denna styr en kategori-rad*/
  position:relative;
  display:grid;
  text-align: center;
  grid-template-columns: 10% 90%;
  grid-template-rows: 12vh;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  margin: 0 0.5em 1em;
}


    button{
        float:right;
        background-color: #ddd;
        border: none;
        color: black;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 16px;
    }
    button:hover{
        background-color: #000;
        color: white;
    }
</style>

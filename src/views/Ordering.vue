<template>
  <div id="ordering">
    <button v-on:click="switchLang()">{{ uiLabels.language }}</button>

    <h1>{{ uiLabels.ingredients }}</h1>

    <Ingredient
      ref="ingredient"
      v-for="item in ingredients"
      v-on:increment="addToOrder(item)"  
      :item="item" 
      :lang="lang"
      :key="item.ingredient_id">
    </Ingredient>

    <h1>{{ uiLabels.order }}</h1>
    {{ chosenIngredients.map(item => item["ingredient_"+lang]).join(', ') }}, {{ price }} kr
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
    </div>
  </div>
</template>
<script>

//import the components that are used in the template
import Ingredient from '@/components/Ingredient.vue'
import OrderItem from '@/components/OrderItem.vue'

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

export default {
  name: 'Ordering',
  components: {
    Ingredient,
    OrderItem
  },
  mixins: [sharedVueStuff], // include stuff that is used in both 
                            // the ordering system and the kitchen
  data: function(){
    return {
      chosenIngredients: [],
      price: 0,
      orderNumber: "",
    }
  },
  created: function () {
    this.$store.state.socket.on('orderNumber', function (data) {
      this.orderNumber = data;
    }.bind(this));
  },
  methods: {
    addToOrder: function (item) {
      this.chosenIngredients.push(item);
      this.price += +item.selling_price;
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
      for (i = 0; i < this.$refs.ingredient.length; i += 1) {
        this.$refs.ingredient[i].resetCounter();
      }
      this.price = 0;
      this.chosenIngredients = [];
    }
  }
}
</script>
<style scoped>
#ordering {
  margin:auto;
  width: 40em;
}

.ingredient {
  border: 1px solid #ccd;
  padding: 1em;
}
</style>
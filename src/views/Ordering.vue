<template>
<div id="ordering">
    <img class="example-panel" src="@/assets/exampleImage.jpg">
    <button v-on:click="switchLang()">{{ uiLabels.language }}</button>

    <h1>{{ uiLabels.myOrder }}</h1>
    <h2>{{ uiLabels.myBurger }} </h2>


    <div id="categories-wrapper">

        <div class="category">
            <h2>{{ uiLabels.bread }}: </h2>
            <div id="bread" class="ingredient-wrapper">
                <PlusButton
                            ref="PlusButton"
                            :v-bind:items="ingredients"
                            :category=4>
    </PlusButton>
                <!---  <Ingredient
ref="ingredient"
v-for="item in ingredients"
v-on:increment="addToOrder(item)"
v-if="item.category == 4"
:item="item"
:lang="lang"
:key="item.ingredient_id">
    </Ingredient> !-->
    </div>
    </div>

        <div class="category">
            <h2>{{ uiLabels.patty }}: </h2>
            <div id="patty" class="ingredient-wrapper">
                <PlusButton
                            ref="PlusButton"
                            :v-bind:items="ingredients"
                            category="1">
    </PlusButton>
    </div>
    </div>

        <div class="category">
            <h2>{{ uiLabels.garnish }}: </h2>
            <div id="garnish" class="ingredient-wrapper">
                <PlusButton
                            ref="PlusButton"
                            :v-bind:items="ingredients"
                            category="2">
    </PlusButton>
    </div>
    </div>


            <div class="category">
                <h2>{{ uiLabels.sauce }}: </h2>
                <div id="sauce" class="ingredient-wrapper">
                    <PlusButton
                                ref="PlusButton"
                                :v-bind:items="ingredients"
                                category="3">
        </PlusButton>
        </div>
        </div>

<h2>{{ uiLabels.sidesAndDrinks }} </h2>


        <div class="category">
            <h2>{{ uiLabels.sides }}: </h2>
            <div id="sides" class="ingredient-wrapper">
                <PlusButton
                            ref="PlusButton"
                            :v-bind:items="ingredients"
                            category="5">
    </PlusButton>
    </div>
    </div>

        <div class="category">
            <h2>{{ uiLabels.drinks }}: </h2>
            <div id="drinks" class="ingredient-wrapper">
                <PlusButton
                            ref="PlusButton"
                            :v-bind:items="ingredients"
                            category="6">
    </PlusButton>
    </div>
    </div>

    </div>

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

    //import the components that are used in the template, the name that you
    //use for importing will be used in the template above and also below in
    //components
    import Ingredient from '@/components/Ingredient.vue'
    import OrderItem from '@/components/OrderItem.vue'
    import PlusButton from '@/components/PlusButton.vue'

    //import methods and data that are shared between ordering and kitchen views
    import sharedVueStuff from '@/components/sharedVueStuff.js'

    /* instead of defining a Vue instance, export default allows the only
necessary Vue instance (found in main.js) to import your data and methods */
    export default {
        name: 'Ordering',
        components: {
            Ingredient,
            OrderItem,
            PlusButton
        },
        mixins: [sharedVueStuff], // include stuff that is used in both
        // the ordering system and the kitchen
        data: function() { //Not that data is a function!
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
        color: black;
        border-radius: 15px;
        flex: 0 0 auto;
        width:7em;
        height:inherit;
    }

    .ingredient-wrapper{ /*Denna styr horisontell scroll*/
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        border-radius: 15px;
        /*display: grid;
        grid-gap: 0px;
        grid-template-columns: repeat(10,10%);
        grid-template-areas: "title";
        text-align: center;*/
    }

    .category{ /*Denna styr en kategori-rad*/
        display:grid;
        text-align: center;
        grid-template-columns: 10% 90%;
        grid-template-rows: 12vh;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 15px;
        margin: 0 0.5em 1em;
    }


    #categories-wrapper{

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

<template>
  <div>
    <div id = "burger1">
      <h1>Burger 1</h1>
      <p>Enter name of Burger: <p>
        <input v-model = 'rows.name'>
        <div v-for="(row, index) in rows" :key = 'row.index'>
          <p>{{row.title}}</p>
          <input v-model="row.value">
        </div>
        <button id = 'addRow' @click = "addrow">add ingedient</button>
        <br>
        <button id = 'confirm' @click = "updateInfo">Confirm</button>
      </div>
    </div>
  </template>

  <script>
  export default {
    name: 'ChangeFavorites',
    props:{
      ingredients: Array
    },
    data: function(){
      return{
        rows: [],
        counter: 1
      }
    },
    methods: {
      addrow: function(){
        this.rows.push({
          title: 'ingredient'+this.counter,
          value: ''
        })
        this.counter++
      },
      updateInfo: function(){
        let favoriteIngredients = [];
        let favoritePrice = 0;
        for (var i = 0; i< this.rows.length; i++){
          favoriteIngredients.push(this.ingredients.find(ingredient=>ingredient.ingredient_sv === this.rows[i].value)); /*lägger favoritingredienser i en array*/
          favoritePrice += (this.ingredients.find(ingredient=>ingredient.ingredient_sv === this.rows[i].value)).selling_price; /*räknar ut priset för de ingredienserna*/
          if(favoriteIngredients.length === 0 && favoritePrice === 0){
            favoriteIngredients.push(this.ingredients.find(ingredient=>ingredient.ingredient_en === this.rows[i].value)); /*Kollar om de skrivit in på engelska*/
            favoritePrice += (this.ingredients.find(ingredient=>ingredient.ingredient_en === this.rows[i].value)).selling_price;
          }
        }
          let burger = {
            "ingredients": favoriteIngredients,
            "price": favoritePrice
          }
          console.log(burger);
          this.$store.state.socket.emit('updateinfo', burger);
          this.rows = [];
        }
      }
    }
  </script>

  <style scoped>
  #confirm{
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }
  p{
    color:white;
  }
  h1{
    color: white;
  }
  </style>

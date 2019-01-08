<template>
  <div>
    <div id = "burger" >
      <h1>Burger 1</h1>
      <p>Enter name of Burger: <p>
        <input v-model = 'rows.name'>
        <p>Enter url to picture: <p>
          <input v-model = 'rows.url'>
          <div v-for="(row, index) in rows" :key = "index">
            <p>{{row.title}}</p>
            <input v-model="row.value"><button @click = "remove(index)">remove</button>
          </div>
          <button class = 'addRow' @click = "addrow">add ingedient</button>
          <br>
          <p>Which burger do you want to replace?:</p>
          <div v-for = "(item, i) in favBurgers" :key = "i">
            <input type="radio" v-model = 'rows.checked' :value = "i"><p>{{item.name}}</p>
            <br>
          </div>
          <br>
          <button class = 'confirm' @click = "updateInfo">Confirm</button>
        </div>

        <SlotModal
        v-if="this.showSlotModal">
        <div slot="header"><button @click = 'favError'>Go back</button></div>
        <div slot="body">Incorrect input, try again</div>
      </SlotModal>
    </div>
  </template>

  <script>

  import SlotModal from '@/components/SlotModal.vue'

  export default {
    name: 'ChangeFavorites',
    components:{
      SlotModal
    },
    props:{
      ingredients: Array,
      favBurgers: Array
    },
    data: function(){
      return{
        rows: [],
        counter: 1,
        showSlotModal: false
      }
    },
    methods: {
      addrow: function(){
        console.log(this.favBurgers)
        this.rows.push({
          title: 'ingredient'+this.rows.index,
          value: ''
        })
        this.counter++
      },
      updateInfo: function(){
        let favoriteIngredients = [];
        let favoritePrice = 0;
        try{
          for (var i = 0; i< this.rows.length; i++){
            favoriteIngredients.push(this.ingredients.find(ingredient=>ingredient.ingredient_sv === this.rows[i].value)); /*lägger favoritingredienser i en array*/
            favoritePrice += (this.ingredients.find(ingredient=>ingredient.ingredient_sv === this.rows[i].value)).selling_price; /*räknar ut priset för de ingredienserna*/
            if(favoriteIngredients.length === 0 && favoritePrice === 0){
              favoriteIngredients.push(this.ingredients.find(ingredient=>ingredient.ingredient_en === this.rows[i].value)); /*Kollar om de skrivit in på engelska*/
              favoritePrice += (this.ingredients.find(ingredient=>ingredient.ingredient_en === this.rows[i].value)).selling_price;
            }
          }
        }
        catch(err){
          this.favError();
        }
        if(this.checkIfChecked()){
          let burger = {
            "name": this.rows.name,
            "url": this.rows.url,
            "ingredients": favoriteIngredients,
            "price": favoritePrice,
            "index": this.rows.checked
          }
          this.$store.state.socket.emit('updateinfo', burger);
          this.rows = [];
          this.counter = 1;
        }
      },
      favError: function(){
        this.showSlotModal = !this.showSlotModal;
      },
      checkIfChecked: function(){
        if(this.rows.checked != null){
          return true;
        }
        else{
          this.favError();
        }
      },
      remove: function(index){
        this.rows.splice(index,1);
        this.counter--;
      }
    }
  }
  </script>

  <style scoped>
  .confirm{
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

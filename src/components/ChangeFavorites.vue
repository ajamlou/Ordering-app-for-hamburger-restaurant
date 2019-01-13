<template>
  <div>
    <div id = "favMaster" >
      <div id = "burger" >
        <h1 id = "header">Change the favorites</h1>
        <p>Enter name of Burger: <p>
          <input v-model = 'rows.name'>
          <p>Enter url to picture: <p>
            <input v-model = 'rows.url'>
            <div v-for="(row, index) in rows" :key = "index">
              <p>{{row.title}} {{index+1}}</p>
              <input v-model="row.value"><button @click = "remove(index)">remove</button>
            </div>
            <button class = 'addRow' @click = "addrow">add ingedient</button>
            <br>
            <p>Which burger do you want to replace?</p>
            <div v-for = "(item, i) in favBurgers" :key = "i">
              <p>{{item.name}}:</p>
              <input type="radio" class = "radio" v-model = 'rows.checked' :value = "i"><br>
            </div>
            <p>I want to add this as an additional Burger:</p>
            <input type="radio" class = "radio" v-model='rows.checked' value = 'add' >
            <br>
            <button class = 'confirm' @click = "updateInfo">Confirm</button>
          </div>
          <SlotModal
          v-if="this.showSlotModal">
          <div slot="header"><button @click = 'favError'>Go back</button></div>
          <div slot="body">Incorrect input, try again</div>
        </SlotModal>
      </div>
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
      addrow: function(){ //lägger till en ingrediens
        this.rows.push({
          title: 'ingredient'
        })
        this.counter++
      },
      //funktionen hittar ingredienserna baserat på ingrediensernas svenska
      //och engelska namn och skickar informationen till servern
      //funktionen har en inbyggd errrorhandler som hanterar fel som kan uppstå
      //och medddelar användaren
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
          this.favError(); //Kallar på funktionen som hanterar felet
        }
        if(this.checkIfChecked() && !this.showSlotModal){
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
      favError: function(){ //funktion som visar eller döljer felmodalen
        this.showSlotModal = !this.showSlotModal;
      },
      checkIfChecked: function(){ //kollar att någon radiobutton är checked, kallar på felhanteraren annars
        if(this.rows.checked != null){
          return true;
        }
        else{
          this.showSlotModal = true;
          return false;
        }
      },
      remove: function(index){ //tar bort en ingrediens
        this.rows.splice(index,1);
      }
    }
  }
  </script>

  <style scoped>

  #favMaster{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  #burger{
    grid-column: 2/3;
  }
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
  .radio{
    -webkit-appearance:button;
    -moz-appearance:button;
    appearance:button;
    border:4px solid #ccc;
    border-top-color:#bbb;
    border-left-color:#bbb;
    background:#fff;
    width:50px;
    height:50px;
    border-radius:50%;
  }
  .radio:checked{
    border:20px solid #4099ff;
  }
  p{
    color:white;
  }
  h1{
    color: white;
  }
  </style>

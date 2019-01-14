<template>
  <div>
    <div id = "favMaster" >
      <div id = "burger" >
        <h1 id = "header">ÄNDRA PÅ FAVORITERNA</h1>
        <p>Namn på ny burgare: <p>
          <input v-model = 'rows.name'>
          <p>URL till den nya bilden: <p>
            <input v-model = 'rows.url'>
            <p>Beskrivning av den nya burgaren: <p>
              <input v-model = 'rows.description'>
              <p>Rabatt på hamburgaren(ange i %): <p>
                <input v-model = 'rows.discount'>
            <div v-for="(row, index) in rows" :key = "`row-${index}`">
              <p>{{row.title}} {{index+1}}</p>
              <input v-model="row.value"><button id="cancelBtn" @click = "remove(index)">Ta bort</button>
            </div>
            <button class = 'addRow' @click = "addRow()">Lägg till ingrediens</button>
            <br>
            <br>
            <p>VILKEN BURGARE VILL DU ERSÄTTA?</p>
            <div
            v-for = "(item, index) in favBurgers"
            class = "existingBurger"
            :key = "`item-${index}`">
x
              <input type="radio" class = "radio" v-model = 'rows.checked' :value = "index">
              <label>{{item.name}}</label>
            </div>
            <div class ="existingBurger">
            <input type="radio" class = "radio" v-model='rows.checked' value = 'add' >
            <label>Lägg till som en ny hamburgare</label>
          </div>
            <button class = 'confirm' @click = "updateInfo">Bekräfta</button>
          </div>
          <SlotModal
          v-if="this.showSlotModal">
          <div slot="body"><h3>Fel inparametrar, testa igen!</h3></div>
          <div slot="footer"><button id="goBack" @click = 'favError'>Gå tillbaka</button></div>
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
        showSlotModal: false
      }
    },
    methods: {
      addRow: function(){ //lägger till en ingrediens
        this.rows.push({
          title: 'Ingrediens'
        })
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
            favoriteIngredients.push(this.ingredients.find(ingredient=>ingredient.ingredient_sv.toUpperCase() === this.rows[i].value.toUpperCase())); /*lägger favoritingredienser i en array*/
            favoritePrice += (this.ingredients.find(ingredient=>ingredient.ingredient_sv.toUpperCase() === this.rows[i].value.toUpperCase())).selling_price; /*räknar ut priset för de ingredienserna*/
            if(favoriteIngredients.length === 0 && favoritePrice === 0){
              favoriteIngredients.push(this.ingredients.find(ingredient=>ingredient.ingredient_en.toUpperCase() === this.rows[i].value.toUpperCase())); /*Kollar om de skrivit in på engelska*/
              favoritePrice += (this.ingredients.find(ingredient=>ingredient.ingredient_en.toUpperCase() === this.rows[i].value.toUpperCase())).selling_price;
            }
          }
        }
        catch(err){
          this.favError(); //Kallar på funktionen som hanterar felet
        }
        if(this.checkIfChecked() && !this.showSlotModal){
          /*Nedanstående if-sats kollar om längden på urlen är 0
          eller om urlen är 0 efter att vi trimmat den (dvs kollar om urlen
        bara är massa mellanslag)*/
          if (this.rows.url === undefined||this.rows.url.length === 0 || this.rows.url.trim().length === 0){
            this.rows.url='https://toppng.com/public/uploads/preview/fast-food-burger-11528345395r3cdlrs6sr.png';
          }
          if(this.rows.discount === undefined){
            this.rows.discount = 0;
          }
          let burger = {
            "name": this.capitalize(this.rows.name),
            "url": this.rows.url,
            "ingredients": favoriteIngredients,
            "price": Math.floor(favoritePrice*(1-(this.rows.discount/100))),
            "index": this.rows.checked,
            "selected": false,
            "description": this.rows.description
          }
          this.$store.state.socket.emit('updateinfo', burger);
          this.rows = [];
        }
      },
      favError: function(){ //funktion som visar eller döljer felmodalen
        this.showSlotModal = !this.showSlotModal;
      },
      /*Gör första bokstaven i namnet på burgaren till stor bokstav*/
      capitalize:function(string){
        let firstLetter = string.charAt(0).toUpperCase();
        let restOfString = string.slice(1);
        return firstLetter + restOfString;
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
    grid-template-columns: repeat(7, 1fr);
  }
  #burger{
    grid-column: 3/6;
  }

  #header{
    grid-column: 3/6;
  }

  #cancelBtn{
    background-color: red;
    color: white;
    border: 2px solid white;
    border-radius: 7px;
    margin-left: 5px;
    height: 5vh;
  }
  #cancelBtn:hover{
    background-color: #b30000;
  }

  .confirm, #goBack{
    background-color: #4CAF50; /* Green */
    border: 2px solid white;
    border-radius: 10px;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
  }

  .confirm{
    margin-left: 20vw;
    font-size: 16px;
  }
  #goBack{
    height: 10vh;
    width: 10vw;
    font-size: 18px;
  }

  .confirm:hover{background-color: #367c39}
  #goBack:hover{background-color: #367c39}

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

  .addRow{
    margin-top: 1vh;
    background-color: #1b61e4;
    color: white;
    border-radius: 7px;
    border: 1px solid white;
    height: 7vh;
  }
  .addRow:hover{background-color: #103a89}

  .existingBurger{
    display:grid;
    grid-template-columns: 50px auto;
    grid-gap: 10px;
    margin-bottom: 10px;
  }
  .existingBurger > *{
    margin: auto auto auto 0;
  }

  p, label, h1{
    color:white;
  }
  </style>

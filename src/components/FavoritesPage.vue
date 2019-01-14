<template>
  <div id = "favorites-backdrop">
    <div id ="favorites-master">
      <div id="favorites-title">
        {{uiLabels.chooseAFavorite}}
      </div>
      <div id="allergen-div"> <!--Div för row 2 i ordering grid -->
        <div id="gluten">
          <img src="../assets/gluten.png" class="icon"><span>{{uiLabels.gluten}}</span>
        </div>
        <div id="dairy">
          <img src="../assets/dairy.png" class="icon"><span>{{uiLabels.dairy}}</span>
        </div>
        <div id="vegan">
          <img src="../assets/vegan.png" class="icon"><span>{{uiLabels.vegan}}</span>
        </div>
      </div>
      <div id = "burger-wrapper">
        <div class = "background":class="{'selected': item.selected}" v-for = "(item, index) in favBurgers" :key = 'index' @click = "favToCheckout(index, item)">
        <div class ="burgers">
          <h1 class = "header">{{item.name}}</h1>
          <img :src= "item.url" class = "image">
          <div class = "description">
            {{item.description}}
          </div>
          <div class = "allergens">
            <div id="gluten-exp" v-if = "!item.gluten_free">
              <img src="../assets/gluten.png">
            </div>
            <div id="dairy-exp" v-if = "!item.lactose_free">
              <img src="../assets/dairy.png">
            </div>
            <div id="vegan-exp" v-if = "!item.vegan">
              <img src="../assets/vegan.png">
            </div>
          </div>
          <div v-b-tooltip.hover.right = "tooltip" class ="ingredient-tooltip">
            [ i ]
          </div>
          <p class = "price">{{uiLabels.sum}}: {{item.price}} :-</p>
        </div>
      </div>
    </div>
      <div id="extras-title">
        {{uiLabels.extras}}
      </div>
      <div id = 'category-wrapper'>
        <CategoryRow
        v-for="category in extrasCategories"
        :key="category.categoryNr"
        :category="category.categoryNr"
        :added_items="chosenIngredients"
        :category_name="uiLabels[category.label]"
        :lang="lang"
        :threshold="category.threshold"
        :item_count="categoryItemCounter[category.categoryNr -1]"
        @remove_ingredient="removeFromMenu"
        @info_to_modal="toggleShowIngredientsModal">
      </CategoryRow>
    </div>

<!-- Är onödig, men vänta lite med att ta bort -->
    <!-- Modal för avbryt-knappen. Tar in en boolean för att urskilja att det är
    avbrytknappen som tryckts på. -->
    <!-- <SlotModal
    v-if="this.showSlotModal && this.pressedAbortModal">
    <div slot="header"></div>
    <div slot="body">{{uiLabels.areYouSure}}</div>
    <div slot="footer" class="slotButtons">
      <button
      type="button"
      id="noBtn"
      @click="toggleSlotModal()">
      {{uiLabels.dontAbort}}
    </button>
    <button
    type="button"
    id="yesBtn"
    @click="emptyOrder()">
    {{uiLabels.abort}}
  </button>
</div> -->
<!-- </SlotModal> -->

<div id="bottom-div">
<button id="cancelOrder-btn" @click="cancelBtnModal()">{{uiLabels.cancelOrder}}</button>
<div id="price-div">
  {{uiLabels.sum}}: {{price}}:-
</div>
<button id="next-button" @click="addToCheckout();changeView('checkoutPage');">{{uiLabels.next}}</button>
</div>
</div>
</div>
</template>

<script>
import CategoryRow from '@/components/CategoryRow.vue'
import SlotModal from '@/components/SlotModal.vue'

export default {
  name: 'FavortiesPage',
  data: function(){
    return{
      tooltip: 'Oh yeaaah',
      showSlotModal:false,
      pressedAbortModal:false,
    }
  },
  props:{
    ingredients:Array,
    lang: String,
    uiLabels: Object,
    favBurgers: Array,
    extrasCategories: Array,
    chosenIngredients: Array,
    categoryItemCounter: Array,
    price: Number

  },
  components:{
    CategoryRow,
    SlotModal
  },
  beforeMount: function(){
    // for(let i =0;i<this.favBurgers.length;i++){
    //   for(let obj in this.favBurgers[i])
    //   obj.ingredients[]
    //
    // }

  },
  methods:{
    // skickar favoritburgaren som väljs till ordering och lägger in den där
    favToCheckout: function(index, item){
      this.$emit("clearburger");
      this.unselect();
      item.selected = !item.selected;
      for (var i = 0; i< item.ingredients.length; i++){
        this.$emit("fav-ingredient", item.ingredients[i]);
      }
    },
    unselect: function(){
      for(var i=0; i<this.favBurgers.length; i++){
        this.favBurgers[i].selected = false;
      }
    },
    removeFromMenu: function(item,index){
      this.$emit('remove_ingredient',item,index);
    },
    //visar ingrediensmodalen för tillbehör
    toggleShowIngredientsModal:function(data){
      this.$emit('info_to_modal', data);
    },
    //Skickar information om ordern till i varukorgen
    addToCheckout: function(){
      this.$emit('addToCheckout');
    },
    //Byter vy
    changeView: function(data){
      this.$emit('change_view',data);
    },
    //När en trycker på "Avbryt beställning" clearas allt och en tas tillbaka
    //till framsidan.
    emptyOrder:function(){
      this.$emit('change_view','frontPage');
      this.$emit('clear_all');
      this.$emit('remove_backButton');
    },
    //Funktion för avbrytknappen, den öppnar en modal och bestämmer vad som
    //ska vara där inne.
    cancelBtnModal: function(){
      this.$emit('cancel_btn_modal')
    },
    //Togglar en modal
    toggleSlotModal:function(){
      if(!this.showSlotModal){
        this.showSlotModal=true;
      }
      else{
        this.showSlotModal=false;
      }
    },
  }
}
</script>
<style scoped>
#favorites-master {
  display:grid;
  grid-template-columns: repeat(6, 1fr);
  margin: auto auto auto auto;
  width: 90%;
  grid-row-gap: 1vh;
}
#favorites-backdrop{
  background-color: rgba(255, 250, 224,0.99);
  border-radius:15px;
  width:95%;
  justify-self:center;
  margin-bottom:2em;
  padding-bottom:1em;
}
#favorites-title{
  grid-column:1/7;
  grid-row:2;
  align-self: center;
  font-family: 'Lobster', sans-serif;
  font-size: 10vmin;
  color: #ed6381; /*rosa*/
  text-shadow: 2px 2px #444444;
  border-bottom: dotted;
  border-color: #ed6381;
}
#allergen-div{
  grid-row:1;
  grid-column: 4/7;
  display:flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  font-size: 1.2em;
}
#burger-wrapper{
  grid-column: 1/7;
  grid-row:3;
  display:flex;
  flex-wrap: wrap;
  justify-content:center;
  /* border-bottom: dotted;
  border-color: #ed6381; /*rosa */
}

.background{
  width: 320px;
  height: 360px;
  border-radius: 160px;
}

.burgers{
  display:grid;
  grid-template-columns: repeat(3, 1fr);
}

.header{
  grid-column: 2;
  grid-row: 1;
  text-align: center;
  font-size: 2em;
}
.image{
  width: 150px ;
  height: 150px;
  grid-column: 2;
  grid-row: 2;
}
.icon{
  width: 50px ;
  height: 50px;
}
.description{
  grid-column: 1/4;
  grid-row:4;
  text-align: center;
}
.allergens{
  grid-column: 1/4;
  grid-row: 3;
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
}

.allergens img{
  width: 25px ;
  height: 25px;
}

.ingredient-tooltip{
  grid-column: 3;
  grid-row: 3;
  text-align: right;
  color: blue;
  font-weight:bold;
}
/* .ingredients{
grid-column: 1/3;
grid-row: 3;
display:flex;
flex-wrap: wrap;
} */
.price{
  grid-column: 2;
  grid-row:5;
  text-align:center;
}

#bottom-div{
  grid-column: 1/7;
  grid-row: 6;
  display:grid;
  justify-content: space-between;
}

#price-div{
  display:inline-block;
  justify-self: center;
  margin:auto;
  text-align:center;
  font-size: 2em;
  grid-column:3/5;
}

.selected{
  background-color: #b9d7cb;
}

#extras-title{
  grid-column: 1/7;
  grid-row: 4;
  font-size: 2em;
  /* border-top: dotted; */
  border-bottom: dotted;
  border-top: dotted;
  border-color: #ed6381; /*rosa*/
  text-transform: uppercase;
}

#category-wrapper{
  grid-column: 1/7;
  grid-row:5;
}

#next-button{
  grid-column: 6/7;
  width:120px;
  height:80px;
  justify-self:end;
  background-color: #c5e5be;
}
#next-button:active{
  border: 2px solid #595959;
}
#next-button:hover{
  background-color: #89a085;
  border-color: #000000;
}

#cancelOrder-btn{
  grid-column: 1/2;
  width:120px;
  height:80px;
  background-color: #e51e4a;
}

#cancelOrder-btn:hover{
  background-color: #a01533; /*matchar #e51e4a; - mörkrosa*/
  border-color: #000000;
}

button{
  color: black;
  text-transform: uppercase;
  text-align: center;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 16px;
  font-size: 25px;
  border-color: black;
  border-width: thin;
}

h1{
  font-size: 1.5em;
}


@media screen and (max-width:1206px){ /*När category-row bryts, skifta plats på alla element*/
  #favorites-title{
    grid-row: 1;
    text-align: center;
    font-size: 12vw;
  }
  #allergen-div{
    grid-column:1/7;
    grid-row:2;
    font-size: 1em;
  }
  #allergen-div img{
    width: 30px;
    height: 30px
  }
}

@media screen and (max-width:500px){
  #cancelOrder-btn,#next-button{
    font-size: 18px;
    width: 80px;
    height: 60px;
  }
  #price-div{
    font-size: 25px;
  }
  .burgers{
    border-bottom: dotted;
    border-color: #ed6381; /*rosa*/
  }

}
</style>

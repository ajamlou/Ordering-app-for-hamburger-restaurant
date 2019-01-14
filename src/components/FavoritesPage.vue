

<template>
  <div id = "favorites-backdrop">
    <div id ="favorites-master">
      <div id="favorites-title">
        {{uiLabels.chooseAFavorite}}
      </div>
      <div id = "burger-wrapper">
        <div class ="burgers" :class="{'selected': item.selected}" v-for = "(item, index) in favBurgers" :key = 'index' @click = "favToCheckout(index, item)">
          <h1 class = "header">{{item.name}}</h1>
          <img :src= "item.url" class = "image">
          <div class = "description">
            {{item.description}}
          </div>
          <div v-b-tooltip.hover.right = "tooltip" class ="ingredient-tooltip">
            [ i ]
          </div>
          <p class = "price">{{uiLabels.sum}}: {{item.price}} :-</p>
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

  <SlotModal
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
    </div>
  </SlotModal>
  <button id="cancelOrder-btn" @click="cancelBtnModal()">{{uiLabels.cancelOrder}}</button>
  <button id="next-button" @click="addToCheckout();changeView('checkoutPage');">{{uiLabels.next}}</button>
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
    categoryItemCounter: Array

  },
  components:{
    CategoryRow,
    SlotModal
  },
  created:{
    mountTooltipData: function(){
      this.tooltip = '';
      // for(var i = 0; i<this.favBurgers.length;i++){
      //   this.tooltip = this.tooltip + this.favBurgers[i].ingredients
      // }
    }
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
      this.$emit('removeIngredient',item,index);
    },
    //visar ingrediensmodalen för tillbehör
    toggleShowIngredientsModal:function(data){
      this.$emit('info_to_modal', data);
    },
    addToCheckout: function(){
      this.$emit('addToCheckout');
    },
    changeView: function(data){
      this.$emit('change_view',data);
    },
    emptyOrder:function(){
      this.$emit('change_view','frontPage');
      this.$emit('clear_all');
      this.$emit('remove_backButton');
    },
    cancelBtnModal: function(){
      this.toggleSlotModal();
      this.pressedAbortModal=true;
    },
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

#favorites-backdrop{
  background-color: rgba(255, 250, 224,0.99);
  border-radius:15px;
  width:95%;
  justify-self:center;
  margin-bottom:2em;
  padding-bottom:1em;
}

#favorites-master {
  display:grid;
  grid-template-columns: repeat(6, 1fr);
  margin: auto auto auto auto;
  width: 90%;
  grid-row-gap: 1vh;
}

#favorites-title{
  grid-column:1/7;
  grid-row:1;
  text-align: left;
  align-self: center;
  font-family: 'Lobster', sans-serif;
  font-size: 10vmin;
  /* font-family: 'Luckiest Guy', sans-serif; */
  color: #ed6381; /*rosa*/
  /* text-transform: uppercase; */
  text-shadow: 2px 2px #444444;
}

#burger-wrapper{
  grid-column: 1/7;
  grid-row:2;
  display:flex;
  flex-wrap: wrap;
  justify-content:center;
}

.burgers{
  width: 320px;
  height: 320px;
  border-radius: 160px;
  display:grid;
  grid-template-columns: repeat(3, 1fr);
}

.header{
  grid-column: 2;
  grid-row: 1;
  text-align: center;
}

.image{
  width: 150px ;
  height: 150px;
  grid-column: 2;
  grid-row: 2;
}

.description{
  grid-column: 1/4;
  grid-row:3;
  text-align: center;
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
  grid-row:4;
  text-align:center;
}


.selected{
  background-color: #b9d7cb;
}

#extras-title{
  grid-column: 1/7;
  grid-row: 3;
  font-size: 2em;
}

#category-wrapper{
  grid-column: 1/7;
  grid-row:4;
}

#next-button{
  grid-column: 6/7;
  grid-row:5;
  border:1px solid #7a7a7a;
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
  grid-row: 5;
  width:120px;
  height:80px;
  background-color: #e51e4a;
  border: 1px solid #7a7a7a;
}

#cancelOrder-btn:hover{
  background-color: #a01533; /*matchar #e51e4a; - mörkrosa*/
  border-color: #000000;
}

#yesBtn{
  background-color: #e51e4a;
  grid-column: auto;
  grid-row: auto;
}

#yesBtn:hover{
  background-color: #a01533; /*matchar #e51e4a; - mörkrosa*/
  border-color: #000000;
}

#noBtn{
  background-color: #c5e5be;
  grid-column: auto;
  grid-row: auto;
}

#noBtn:hover{
  background-color: #89a085;
  border-color: #000000;
}
button{
  color: black;
  text-transform: uppercase;
  border: none;
  text-align: center;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 16px;
  font-size: 25px;
}


h1{
  font-size: 1.5em;
}
</style>

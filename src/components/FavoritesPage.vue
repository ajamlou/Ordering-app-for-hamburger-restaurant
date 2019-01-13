

<template>
  <div class = "favorites">
    <div class ="burgers" :class="{'selected': item.selected}" v-for = "(item, index) in favBurgers" :key = 'index' @click = "favToCheckout(index, item)">
      <h1 class = "header">{{item.name}}</h1>
      <img :src= "item.url" style="border-style: none;" width="100px" height="100px" class = "image">
      <ul>
        <li  v-for = "(thing, index) in item.ingredients" :key = 'index'>
          {{thing["ingredient_"+ lang]}}
        </li>
        <p>{{uiLabels.sum}}: {{item.price}} :-</p>
      </ul>
    </div>

<h2>{{uiLabels.extras}}</h2>
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
  <button id="fav-next-btn" @click="addToCheckout();changeView('checkoutPage');">{{uiLabels.next}}</button>
  </div>
</template>

<script>
import CategoryRow from '@/components/CategoryRow.vue'

export default {
  name: 'FavortiesPage',
  data: function(){
    return{
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
    CategoryRow
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
      this.$emit('changeView',data);
    }
  }
}
</script>
<style scoped>


.wrapper{
  height: 100vh;
  width: 100vw;
}

.favorites{
  display:flex;
  flex-wrap: wrap;
  justify-content:center;
}

.burgers{
  border:5px solid rgb(255, 0, 0);
  width: 320px;
  height: 320px;
}

.selected{
  background-color: green;
}



.header{
  text-align: center;
}

.image{
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.ingredients{
  text-align: center;
}

h1{
  font-size: 1.5em;
}

li{
  list-style-type:none;
}


</style>

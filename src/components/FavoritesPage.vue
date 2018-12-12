<!-- kod som genererar favoritsidan -->
<!--Filterkod
data: function(){
ingredient_ids:[1,2,3],
chosenIngredients=[]
}

props:{
ingredients: Array
}


chosenIngredients = this.ingredients.filter(ingredient=>ingredient.ingredient_id === id[0] || id[1] || id[2])

Kommer inte fungera Out of the box, men you get the point -->


<template>
  <div  class = "wrapper">
    <div id = "favorites">
      <div class = "burgers" v-for = "item in favBurgers" :key = "item.id"  @click = "favToCheckout">
        <h1 class = "header">{{item.name}}</h1>
        <img :src= "item.pic" style="border-style: none;" width="200px" height="180px" class = "image">
        <ul>
          <li v-for = "item in chosenIngredients" :key = "item.ingredient_id">
            {{item["ingredient_"+ lang]}}
          </li>
        </ul>
        <p>{{uiLabels.sum}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Favorite from '@/components/Favorite.vue'
export default {
  name: 'FavortiesPage',
  data: function(){
    return{
      ingredient_ids:[1,2,3],
      chosenIngredients: [],
      price: 0,
      units: 1,
      categoryItemCounter: 1,
      favBurgers:[
        {name:'Beefinator',
        id: 1,
        pic: "http://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4160.png"
      },
      {name:'Vegginator',
      id: 2,
      pic: "http://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4160.png"
    },
    {name:'Veganinator',
    id:3,
    pic: "http://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4160.png"
  }
]
}
},
props:{
  ingredients:Array,
  lang: String,
  menu: Array,
  uiLabels: Object
},
components:{
  Favorite
},
methods:{
  // chooseIngredients: function(){
  //   let order ={"ingredients": this.chosenIngredients,
  //   "price":this.price,
  //   "units":this.units,
  //   "itemCount":this.categoryItemCounter};
  //   console.log(order);
  //   this.$emit("fav-checkout",order);
  // },
  favToCheckout: function(){
    this.$emit("clearburger");
    for (var i = 0; i< this.ingredient_ids.length; i++){
      this.$emit("fav-ingredient", this.ingredients.find(ingredient=>ingredient.ingredient_id === this.ingredient_ids[i]));
    }
    this.$emit("fav-checkout");
    console.log(this.menu)
  }
}
}
</script>
<style scoped>






/* .wrapper{
height: 100vh;
display: flex;
flex-wrap: wrap;
justify-content: space-evenly;
align-items: center;
} */

.wrapper{
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}

#favorites{
  grid-column: 1/7;
  grid-row: 1/3;
  margin:auto;
}
.burgers{
  float:left;
  background-color: white;
  border:5px solid rgb(255, 0, 0);
  width: 320px;
  height: 320px;
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
  list-style-type: none;

}


</style>

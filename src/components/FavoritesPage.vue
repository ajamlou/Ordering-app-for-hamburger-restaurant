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
  <div class = "wrapper">
    <div class = "favorites" v-for = "item in favBurgers" :key = "item.id" @click = "favToCheckout">
      <h1 class = "header">{{item.name}}</h1>
      <img :src= "item.pic" style="border-style: none;" width="200px" height="180px" class = "image">
    </div>
  </div>
</template>

<script>
import Favorite from '@/components/Favorite.vue'
export default {
  name: 'FavortiesPage',
  data: function(){
    return{
      favBurgers:[
        {name:'Beefinator',
        id: 1,
        pic: "http://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4160.png",
        bun: "Brioche",
        protein: "Hummer",
        sauce: "Grillsås"
      },
      {name:'Vegginator',
      id: 2,
      pic: "http://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4160.png",
      bun: "Brioche",
      protein: "Hummer",
      sauce: "Grillsås"
    },
    {name:'Veganinator',
    id:3,
    pic: "http://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4160.png",
    bun: "Brioche",
    protein: "Hummer",
    sauce: "Grillsås"
  }
]
}
},
props:{
ingredients:Array,
lang: String,
menu: Array
},
components:{
Favorite
},
methods:{
favToCheckout: function(){
  this.menu.push();
}
}
}
</script>
<style scoped>




.favorites{
  background-color: white;
  border:5px solid rgb(255, 0, 0);
  width: 320px;
  height: 320px;
}

.wrapper{
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
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

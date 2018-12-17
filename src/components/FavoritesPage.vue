

<template>
  <div  class = "wrapper">
    <div id = "favorites">
      <div class = "burgers" :id="{ selecburg : change }" v-for = "item in favBurgers" :key = "item.id"  @click = "burgerSelected">
        <h1 class = "header">{{item.name}}</h1>
        <img :src= "item.pic" style="border-style: none;" width="200px" height="180px" class = "image">
        <ul v-if = "item.id === 1">
          <li  v-for = "thing in favoriteBurger1.ingredients" :key = "thing.ingredient_id">
            {{thing["ingredient_"+ lang]}}
          </li>
          <p>{{uiLabels.sum}}: {{favoriteBurger1.price}} :-</p>
        </ul>
        <ul v-if = "item.id === 2">
          <li  v-for = "thing in favoriteBurger2.ingredients" :key = "thing.ingredient_id">
            {{thing["ingredient_"+ lang]}}
          </li>
          <p>{{uiLabels.sum}}: {{favoriteBurger2.price}} :-</p>
        </ul>
        <ul v-if = "item.id === 3">
          <li  v-for = "thing in favoriteBurger3.ingredients" :key = "thing.ingredient_id">
            {{thing["ingredient_"+ lang]}}
          </li>
          <p>{{uiLabels.sum}}: {{favoriteBurger3.price}} :-</p>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FavortiesPage',
  data: function(){
    return{
      price: 0,
      units: 1,
      categoryItemCounter: 1,
      change: false,
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
  uiLabels: Object,
  favoriteBurger1: Object,
  favoriteBurger2: Object,
  favoriteBurger3: Object,
  ingredient_ids: Array
},
components:{
},
methods:{
  // skickar favoritburgaren som väljs till ordering och lägger in den där
  favToCheckout: function(id){
    this.$emit("clearburger");
    for (var i = 0; i< ["favoriteBurger"+id].ingredients.length; i++){
      this.$emit("fav-ingredient", this.ingredients.find(ingredient=>ingredient.ingredient_id === this.ingredient_ids[i]));
    }
    this.$emit("fav-checkout");
  },
  burgerSelected: function(){
    this.change = !this.change;
  }
}
}
</script>
<style scoped>


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

#selecburg{
  float:left;
  background-color: green;
  border:5px solid rgb(255, 0, 0);
  width: 320px;
  height: 320px;
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

h1{
  font-size: 1.5em;
}

li{
  list-style-type:none;
}


</style>

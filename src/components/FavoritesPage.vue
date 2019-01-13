

<template>
      <div class = "favorites">
      <div class ="burgers" :class="{'selected': isSelected}" v-for = "(item, index) in favBurgers" :key = 'index' @click = "favToCheckout(index, item)">
        <h1 class = "header">{{item.name}}</h1>
        <img :src= "item.url" style="border-style: none;" width="100px" height="100px" class = "image">
        <ul>
          <li  v-for = "(thing, index) in item.ingredients" :key = 'index'>
            {{thing["ingredient_"+ lang]}}
          </li>
          <p>{{uiLabels.sum}}: {{item.price}} :-</p>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  name: 'FavortiesPage',
  data: function(){
    return{
      isSelected: false
}
},
props:{
  ingredients:Array,
  lang: String,
  uiLabels: Object,
  favBurgers: Array
},
components:{
},
methods:{
  // skickar favoritburgaren som väljs till ordering och lägger in den där
  favToCheckout: function(index, item){
   this.isSelected = !this.isSelected;
      for (var i = 0; i< item.ingredients.length; i++){
        this.$emit("fav-ingredient", item.ingredients[i]);
      }
  },
  //visar ingrediensmodalen för tillbehör
  toggleShowIngredientsModal:function(){
    this.$emit('info_to_modal', this.category)
  },
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
  background-color: white;
  border:5px solid rgb(255, 0, 0);
  width: 320px;
  height: 320px;
}

.selected{
  background-color: green;
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
}

h1{
  font-size: 1.5em;
}

li{
  list-style-type:none;
}


</style>

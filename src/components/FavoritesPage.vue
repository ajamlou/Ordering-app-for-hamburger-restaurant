<template>
  <div class = "favWrapper">
    <div class = "favorites" v-for = "item in favBurgers" :key = "item.id">
      <h1 class = "header">{{item.name}}</h1>
      <img :src= "item.pic" style="border-style: none;" width="200px" height="180px" class = "image">
      <ul class = "ingredients">
        <li>{{item.bun}}</li>
        <li>{{item.protein}}</li>
        <li>{{item.sauce}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FavortiesPage',
  data: function(){
    return{
      favBurgers:[
        {name:'Beefinator',
        id: 1,
        pic: "http://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4160.png",
        bun: "Brioshe",
        protein: "Hummer",
        sauce: "Grillsås"
      },
      {name:'Vegginator',
      id: 2,
      pic: "http://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4160.png",
      bun: "Brioshe",
      protein: "Hummer",
      sauce: "Grillsås"
    },
    {name:'Veganinator',
    id:3,
    pic: "http://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4160.png",
    bun: "Brioshe",
    protein: "Hummer",
    sauce: "Grillsås"
  }
]
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

.favWrapper{
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

<template>
  <div class = "favWrapper">
    <div class = "favorites" v-for = "item in favBurgers" :key = "item.id">
      <h1>{{item.name}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FavortiesPage',
  data: function(){
    return{
      favBurgers:[
        {name:'beefinator', id: 1},
        {name:'vegginator', id: 2},
        {name:'veganinator', id:3}
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


</style>

<template>
  <div>
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

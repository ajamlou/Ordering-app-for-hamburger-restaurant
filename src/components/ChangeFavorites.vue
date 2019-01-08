<template>
  <div>
    <h1>Burger 1</h1>
    <p>Enter name of Burger: <p>
      <input>
    <div id = "burger1" v-for="(row, index) in rows" :key = 'row.index'>
      <p>{{row.title}}</p>
      <input>
    </div>
    <button id = 'addRow' @click = "addrow">add ingedient</button>
    <button id = 'confirm'>Confirm</button>
  </div>
</template>

<script>
export default {
  name: 'ChangeFavorites',
  props:{
  },
  data: function(){
    return{
      rows: [],
      counter: 1
    }
  },
  methods: {
    addrow: function(){
      this.rows.push({
        title: 'ingredient'+this.counter
      })
      this.counter++
    }
  }
}
</script>

<style scoped>
#confirm{
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
p{
  color:white;
}
h1{
  color: white;
}
</style>

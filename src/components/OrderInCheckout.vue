<template>
  <h3>{{uiLabels.burger}} {{id}} </h3>
</template>
<script>
export default{
  name:"OrderInCheckout",
  components:{

  },
  props:{
    id: Number,
    item:Object,
    uiLabels: Array
  },
}
</script>
<style scoped>
</style>

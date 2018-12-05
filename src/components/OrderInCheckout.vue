<template>
  <div>
    <h5>{{uiLabels.burger}} {{id +1}} </h5>
    <h6>Din burgare:</h6>
    <div
    v-for="(ingredient,index) in order.ingredients"
    v-if="ingredient.category < 5 "
    :key="index">
    {{ingredient["ingredient_"+ lang]}}
  </div>
  <br>

  <h6>{{uiLabels.extras}}:</h6>
  <div
  v-for="(ingredient,index) in order.ingredients"
  v-if="ingredient.category > 5 "
  :key="index">
  {{ingredient["ingredient_"+ lang]}}
</div>
<div class="ord-check-foot">
  {{uiLabels.unitprice}}: {{order.price}}:-
  <br>
  <div class="ord-quant">
  <label>{{uiLabels.quantity}}:</label><input
  type="number"
  v-model="order.units">
</div>
</div>
</div>
</template>
<script>
export default{
  name:"OrderInCheckout",
  components:{

  },
  props:{
    id: Number,
    order:Object,
    uiLabels: Object,
    lang: String
  },
}
</script>
<style scoped>

.ord-quant{
  display: inline-block;
  vertical-align: middle;
}

.ord-quant input{
  width:40px;
}
</style>

<template>
<div class = "masterOrderitem">

	<!-- Bara visa pattys i ordern: -->
	<div
	v-if="onlypatty === true">
		<div v-for ="ingredient in order.ingredients"
		v-if="ingredient.category === 1">
			{{ingredient.ingredient_sv}}
		</div>
	</div>

	<!-- Visa alla delar av burgarna i ordern: -->
	<div v-else>
		{{orderId}} {{order.type}} {{ order.ingredients.map(item=>item["ingredient_"+ lang]).join(", ") }}
	</div>
</div>


</template>

<script>
export default {
  name: 'OrderItem',
  props: {
    uiLabels: Object,
    order: Object,
    orderId: String,
    lang: String,
		onlypatty: Boolean, /*Avgör om det bara är pattys som ska visas*/
		category: Number		/*För att veta vad som hör till patty-kategorin*/
  }
}
</script>
<style scoped>

</style>

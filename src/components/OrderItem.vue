<template>
<div class = "masterOrderitem">

 <!-- menusArray tas ut i computed, är en array med menyer som i sin tur är
arrayer innehållande varje menys ingrediensarray -->
	<!-- <div v-for="(menu,index) in menusArray"
	:key="index"> -->

	<div v-for="(menu, menuindex) in menusArray"
	:key="menuindex">

		<div
		v-if="onlypatty === true">
			<div v-for="(ingredient,index) in menu.ingredients"
			:key="index"
			v-if="ingredient.category === 1">
				{{ingredient.ingredient_sv}}
			</div>
		</div>

		<div v-else>
			<!-- Lägga in rad mellan varje menu -->
			{{orderId}} {{order.type}} {{ menusArray[menuindex].ingredients.map(item=>item["ingredient_"+ lang]).join(", ") }}
		</div>
	</div>

	<!-- </div> -->


	<!-- Bara visa pattys i ordern: -->
	<!-- <div
	v-if="onlypatty === true">
		<div v-for ="(ingredient,index) in order.ingredients"
		:id="index"
		v-if="ingredient.category === 1">
			{{ingredient.ingredient_sv}}
		</div>
	</div> -->

	<!-- Visa alla delar av burgarna i ordern: -->
	<!-- <div v-else>
		{{orderId}} {{order.type}} {{ order.ingredients.map(item=>item["ingredient_"+ lang]).join(", ") }}
	</div> -->

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
  },
	computed:{
		menusArray:function(){
			let menuArray = this.order.menus;
			return menuArray;
		}
	}
}
</script>
<style scoped>

</style>

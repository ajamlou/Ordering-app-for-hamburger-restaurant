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
		<div v-for="(occurrences,index,ingredient_id) in calculateOccurrences(menuindex)">

		{{calculateOccurrences(menuindex)}}
	</div>
	 <div v-for="(ingredient,index) in menu.ingredients"
		:key="index"
		v-if="ingredient.category === 1">
		{{ingredient.ingredient_sv}}
	</div>
	<div class="betweenBurgers">
	<!--Skiljelinje mellan olika burgare-->
	</div>
</div>

<div v-else>
	{{orderId}} {{order.type}} {{ menusArray[menuindex].ingredients.map(item=>item["ingredient_"+ lang]).join(", ") }}
	<div class="betweenBurgers">
		<!-- Skiljelinje mellan olika burgare -->
	</div>
</div>
</div>

<!-- </div> -->

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
		category: Number,		/*För att veta vad som hör till patty-kategorin*/
		ingredients: Array
	},
	computed:{
		menusArray:function(){
			let menuArray = this.order.menus;
			return menuArray;
		},
	},
	methods:{
		calculateOccurrences:function(index){
			let ingredients = this.menusArray[index].ingredients;
			/*Occurences är först en tom array som sparar antalet gånger ett ingredient ID förekommer*/
			let occurences = ingredients.reduce(function(occ,ingredient){
				occ[ingredient.ingredient_id] = (occ[ingredient.ingredient_id] || 0) + 1;
				return occ;
			},{})
			return occurences;
			}
	}
}
</script>
<style scoped>

.betweenBurgers{
	border: 1px solid white;
	margin: 4px;
}

</style>

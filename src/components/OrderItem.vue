<template>
<div class = "masterOrderitem">

<!--Förlåt för att jag är här å pillar, men jag var tvungen att se så
allting fungerade då de nya ordrarna nu inte bara är en array av ingredienser,
utan en array med arrayer av ingredienser. Det som händer nedan är att order
tas in som prop (ingen skillnad). Därefter tas this.order.menus = menusArray
ut i computed, detta blir alltså en array av arrayer. Nedan finns nu 3 divs
som (1) loopar över menyerna och sedan (2) loopar över ingredienserna
för sagd array, annars (3) visar alla ingredienserna.
Jag kommenterar bort allting (men låter det stå kvar) så ni inte behöver bry
 er om följande kod om ni inte vill.

	<div v-for="(menu,index) in menusArray"
	:key="index"
	v-if="onlypatty">
		<p>Burgare</p>
		<div v-for="(ingredient,index) in menu.ingredients"
		:key="index">
			{{ingredient.ingredient_sv}}
		</div>
	</div>
	<div v-else>
		{{orderId}} {{order.type}} {{ menusArray[0].ingredients.map(item=>item["ingredient_"+ lang]).join(", ") }}
	</div>
-->

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

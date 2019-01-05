<template>
	<div class = "masterOrderitem">

		<!-- menusArray tas ut i computed, är en array med menyer som i sin tur är
		arrayer innehållande varje menys ingrediensarray -->
		<div v-for="(menu, menuindex) in menusArray"
		class="mg4"
		:key="menuindex"
		:class="{'border-bottom':menuindex < (menusArray.length -1)}">
		<div class="quant">{{uiLabels.quantity}}: {{menu.units}}</div>
		<div
		v-if="onlypatty === true">
		<div v-for="(occurrences,id,OccIndex) in calculateOccurrences(menuindex,1)"
		:key="OccIndex">
			<!--Hitta första ingrediensen i ingredients med samma id som i calculateOccurences och displaya dess namn tillsammans med occurrences -->
			{{ingredients.find(item => item.ingredient_id == id)["ingredient_"+lang]}} × {{occurrences}}
		</div>
	</div>

	<div v-else
	v-for="(occurrences,id,OccIndex) in calculateOccurrences(menuindex)"
	:key="OccIndex">
	<!--Tar ut ingredienserna från menusArray, hittar de som matchar id:t i calculateOccurrences och skriver ut det på valt språk-->
	{{menusArray[menuindex].ingredients.find(item => item.ingredient_id == id)["ingredient_"+lang]}} × {{occurrences}}
</div>
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
		category: Number,		/*För att veta vad som hör till patty-kategorin*/
		ingredients: Array
	},
	beforeMount:function(){
		/*Denna metod tar ut alla värden (dvs förekomster) av
		ingredienserna i calculateOccurrences (filtrerad på kött)
		och adderar dessa, denna siffra skickas emittas sedan*/
		let i,
		sum=0;

		for(i=0; i<this.menusArray.length; i++){
			sum = sum + Object.values(this.calculateOccurrences(i,1)).reduce(
				(sum,curr)=>sum+curr,0) * this.menusArray[i].units;
		}
		this.$emit('total_pattys',sum);

	},
	computed:{
		menusArray:function(){
			let menuArray = this.order.menus;
			return menuArray;
		},
	},
	methods:{
		calculateOccurrences:function(index,category){
			let ingredients = this.menusArray[index].ingredients.slice();
			if(category != undefined){
				/*Filtrerar ut så enbart den aktuella kategorin räknas på*/
				ingredients=ingredients.filter((ingredient) => ingredient.category==category);
			}
			/*Nedanstående else-sats sorterar ingrediens-arrayen på kategori genom att använda JavaScript-metoden sort() med en manuell anonym sorteringsfunktion*/
			else{
				ingredients.sort(function(a,b){
					/*om a.category-b.category < 0 kommer a få ett lägre index än b, = 0 kommer a och b behålla sin relation i position och >0 kommer a få ett högre index än b*/
					return a.category - b.category;})
					}
					/*Occurences är först en tom array som sparar antalet gånger ett ingredient ID förekommer*/
					let occurrences = ingredients.reduce(function(occ,ingredient){
						occ[ingredient.ingredient_id] = (occ[ingredient.ingredient_id] || 0) + 1;
						return occ;
					},{})
					return occurrences;
				}
			}
		}
		</script>
		<style scoped>
		.masterOrderitem{
			text-transform: capitalize;
		}

		.border-bottom{
			border-bottom: 1px solid white;
		}

		.quant{
			text-decoration: underline;
		}

		.mg4{
			margin: 4px;
		}

		</style>

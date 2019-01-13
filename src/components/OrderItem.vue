<template>
	<div class="masterOrderitem">
		<!-- menusArray tas ut i computed, är en array med menyer som i sin tur är
		arrayer innehållande varje menys ingrediensarray -->
		<div
		v-if="menuView"
		v-for="(menu, menuindex) in menusArray"
		class="mg4"
		:key="menuindex"
		:class="{'border-bottom':menuindex < (menusArray.length -1)}">

		<div class="quant">{{uiLabels.quantity}}: {{menu.units}}</div>

		<div
		v-if="onlypatty">
		<div v-for="(occurrences,id,OccIndex) in calculateOccurrences(menuindex,1)"
		:key="OccIndex">
		<!--Hitta första ingrediensen i ingredients med samma id som i calculateOccurences och displaya dess namn tillsammans med occurrences -->
		{{menusArray[menuindex].ingredients.find(item => item.ingredient_id == id)["ingredient_"+lang]}} × {{occurrences}}
	</div>
</div>

<div v-else
v-for="(occurrences,id,occIndex) in calculateOccurrences(menuindex)"
:key="occIndex">
<!--Tar ut ingredienserna från menusArray, hittar de som matchar id:t i calculateOccurrences och skriver ut det på valt språk-->
{{menusArray[menuindex].ingredients.find(item => item.ingredient_id == id)["ingredient_"+lang]}} × {{occurrences}}
</div>
</div>

<div
v-if="!menuView && onlypatty"
v-for="(occurrences,id,occIndex) in calculateOccurrencesWholeOrder(1)"
class="mg4"
:key="occIndex">
{{ingredients.find((item) => item.ingredient_id == id)["ingredient_"+lang]}} × {{occurrences}}
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
		ingredients: Array,
		menuView: {
			default:true,
			type:Boolean
		}
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
			/*enbart till för att korta ner namnet på this.order.menus*/
			menusArray:function(){
				let menuArray = this.order.menus;
				return menuArray;
			},
		},
		methods:{
			/*Räknar ut antalet av varje ingrediens i varje beställning*/
			calculateOccurrencesWholeOrder:function(category){
				let i,
				flatArray = [],
				mergedMenusArray=[];

				/*Nedan börjar vi med att plocka ut ingredienserna, en burgare i taget,
				och räkna hur många	gånger denna ingrediens förekommer i en burgare.
				Detta antal måste sedan multipliceras med antalet av just denna burgare
				som blivit beställd. mergedMenusArray har i slutet formen
				{{id.1:antal.1, id.2:antal.2}, {id.a:antal.a, id.b:antal.b}*/
				for(i=0; i<this.menusArray.length; i++){
					mergedMenusArray.push(this.menusArray[i].ingredients.reduce((occ,ingredient)=>{
						if(category!=undefined){

							if(ingredient.category===category){
								occ[ingredient.ingredient_id] = (occ[ingredient.ingredient_id] || 0) + 1*this.menusArray[i].units;
							}
						}

						else{
							occ[ingredient.ingredient_id] = (occ[ingredient.ingredient_id] || 0) + 1*this.menusArray[i].units;
						}
						return occ;
					},{})
				);
			}
			/*När ovanstående kod utförts kvarstår problemet att olika objekt kan
			innehålla samma id. Detta löses genom en ny reduce.
			Då varje currentValue är ett objekt med nycklar, loopar vi här över
			nycklarna för varje objekt och kopierar över dessas värde till accumulator,
			ett till en början tomt objekt som sparar nycklarna och plussar på
			objektens values till sitt eget för respektive nyckel*/
			flatArray=mergedMenusArray.reduce((accumulator, currentValue) => {
				Object.keys(currentValue).forEach((key)=>{
					accumulator[key]=(accumulator[key] || 0) + currentValue[key]
				});
				return accumulator;
			}, {});
			return flatArray;
		},
		/*Räknar ut antalet av varje ingrediens för varje burgare*/
		calculateOccurrences:function(index,category){

			let ingredients = this.menusArray[index].ingredients.slice();
			if(category != undefined){
				/*Filtrerar ut så enbart den aktuella kategorin räknas på*/
				ingredients=ingredients.filter((ingredient) => ingredient.category===category);
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
		padding-bottom: 5px;
		border-bottom: 1px dotted white!important;
	}

	.quant{
		text-decoration: underline;
	}

	.mg4{
		margin: 4px;
	}

	</style>

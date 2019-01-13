<template>

  <div id="designPage-backdrop">
  <div
  id="ordering">
  <div
  id="designPage-title">
  {{uiLabels.yourOrder}}
  </div>
  <!--<img class="example-panel" src="@/assets/exampleImage.jpg"> -->
  <div id= "bestallning"><h2>{{ uiLabels.myBurger }}</h2></div>
  <div id="r2-div"> <!--Div för row 2 i ordering grid -->
    <div id="gluten-exp">
      <img src="../assets/gluten.png" class="icon"><span>{{uiLabels.gluten}}</span>
    </div>
    <div id="dairy-exp">
      <img src="../assets/dairy.png" class="icon"><span>{{uiLabels.dairy}}</span>
    </div>
    <div id="vegan-exp">
      <img src="../assets/vegan.png" class="icon"><span>{{uiLabels.vegan}}</span>
    </div>
  </div>


  <div id="categories-wrapper">
    <CategoryRow
    v-for="category in burgerCategories"
    :key="category.categoryNr"
    :category="category.categoryNr"
    :added_items="chosenIngredients"
    :category_name="uiLabels[category.label]"
    :lang="lang"
    :threshold="category.threshold"
    :item_count="categoryItemCounter[category.categoryNr-1]"
    @remove_ingredient="removeFromMenu"
    @info_to_modal="toggleShowIngredientsModal">
  </CategoryRow>

  <div id="extras">
    <h2>{{uiLabels.extras}}</h2>

    <CategoryRow
    v-for="category in extrasCategories"
    :key="category.categoryNr"
    :category="category.categoryNr"
    :added_items="chosenIngredients"
    :category_name="uiLabels[category.label]"
    :lang="lang"
    :threshold="category.threshold"
    :item_count="categoryItemCounter[category.categoryNr -1]"
    @remove_ingredient="removeFromMenu"
    @info_to_modal="toggleShowIngredientsModal">
  </CategoryRow>
  </div>
  </div>
  <div id="bottom-div">
  <button id="cancelOrder-btn" @click="cancelBtnModal()">{{uiLabels.cancelOrder}}</button>
  <div id="price-div">
    {{uiLabels.sum}}: {{price}}:-
  </div>
  <button id="next-btn" @click="addToCheckout();changeView();">{{uiLabels.next}}</button>
  </div>
  </div>
  </div>
</template>

<script>
import CategoryRow from '@/components/CategoryRow.vue'

export default {
  name: 'Ordering',
  components: {
    CategoryRow
  },
  props:{
    categoryItemCounter:Array,
    chosenIngredients: Array,
    price: Number,
    burgerCategories:Array,
    extrasCategories:Array,
    uiLabels: Object,
    lang:String
  },
  methods:{
    /*Berättar för parent vilket objekt som ska bort och vilket index
    denna har i arrayen chosenIngredients*/
    removeFromMenu:function(item,index){
      this.$emit('remove_from_menu',item,index)
    },
    /*Berättar för parent vilka ingredienser som ska visas i ingredientsmodal*/
    toggleShowIngredientsModal:function(category){
      this.$emit('info_to_modal',category)
    },
    /*Berättar för parent att någon försökt avbryta order*/
    cancelBtnModal:function(){
      this.$emit('cancel_btn_modal')
    },
    /*berättar för parent att ordern läggs i varukorgen*/
    addToCheckout:function(){
      this.$emit('add_to_checkout')
    },
    changeView:function(){
      this.$emit('change_view', 'checkoutPage')
    }


  }
}

</script>


<style scoped>
/* Rubrik designPage */
#designPage-title{
  grid-column:1/7;
  grid-row:1;
  text-align: left;
  align-self: center;
  font-family: 'Lobster', sans-serif;
  font-size: 14vmin;
  /* font-family: 'Luckiest Guy', sans-serif; */
  color: #ed6381; /*rosa*/
  /* text-transform: uppercase; */
  text-shadow: 2px 2px #444444;
}

#cancelOrder-btn{
  width:120px;
  height:80px;
  color: white;
  background-color: #e51e4a;
  border: 1px solid #7a7a7a;
  grid-row:4;
  grid-column: 1/2;
}
#cancelOrder-btn:hover{
  background-color: #a01533; /*matchar #e51e4a; - mörkrosa*/
  border-color: #000000;
}
#bottom-div{
  grid-column: 1/7;
  display:grid;
  justify-content: space-between;
}

#designPage-backdrop{
  background-color: rgba(255, 250, 224,0.99);
  border-radius:15px;
  width:95%;
  justify-self:center;
  margin-bottom:2em;
  padding-bottom:1em;
}
#ordering {
  display:grid;
  grid-template-columns: repeat(6, 1fr);
  margin: auto auto auto auto;
  width: 90%;
  grid-row-gap: 1vh;
}
#ordering h2{
  font-weight: bolder;
  text-transform: uppercase;
  text-align: left;
  border-top: dotted;
  border-bottom: dotted;
  border-color: #ed6381; /*rosa*/
}
#extras, #extras-favorites{
  margin-top:2em;
}

#bestallning{
  grid-column: 1/7;
  grid-row: 2;
  text-align: left;
}
#r2-div{
  grid-row:1;
  grid-column: 4/7;
  display:grid;
  grid-template-columns: repeat(3,1fr);
  grid-template-rows: auto;
  font-size:1em;
}
.icon{
  height:3em;
  padding:0 3px 3px 0;
}

#categories-wrapper{
  grid-column: 1/7;
  grid-row:3;
}
#next-btn:active{border: 2px solid #595959;}

#price-div{
  justify-self: center;
  margin:auto;
  text-align:center;
  font-size: 2em;
  grid-column:5/6;
  grid-row:4;
}

#next-btn{
  width:120px;
  height:80px;
  justify-self:end;
  border:1px solid #7a7a7a;
  grid-column: 6/7;
  grid-row:4;
  color:white;
  background-color: #c5e5be;

}
#next-btn:hover{
  background-color: #89a085;
  border-color: #000000;
}

.ingredient{
  border: 1px solid #ccd;
  background-color: rgba(255, 255, 255, 0.5);
  color: rgb(100,100,100);
  border-radius: 15px;
  text-align: center;
  margin:auto auto 7px auto;
}

.ingredient-wrapper{ /*Denna styr horisontell scroll*/
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y:hidden;
  border-radius: 15px;
}

button{
  background-color: #ddd;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 16px;
  text-shadow: 1px 1px 2px black;
  text-transform: uppercase;
}
button:hover{
  background-color: #000;
  color: white;
}
#price-div{
  display:inline-block;
  justify-self: center;
  margin:auto;
  text-align:center;
  font-size: 2em;
  grid-column:2/6;
  grid-row:4;
}
/*------------------ CSS för ipad/mobiler-isch ------------*/
@media screen and (max-width:1206px){ /*När category-row bryts, skifta plats på alla element*/
  #designPage-title{
    grid-row: 1;
    text-align: center;
    font-size: 12vw;
  }
  #bestallning{
    grid-column: 1/7;
    grid-row:3;
    text-align:center;
  }
  #r2-div{
    grid-column:1/7;
    grid-row:2;
    text-align:center;
    justify-items: center;
    align-items: center;
    justify-content: center;
    align-content: center;
  }
  #categories-wrapper{
    grid-row:4;
  }
  /*#price-div{
  grid-row:5;
  } */
  #ordering h2{
    font-size: 5vw;
  }
}
#ordering{
  margin:10px auto auto auto;
}

/* -------------------- CSS för mobiler -----------------*/
@media screen and (max-width:740px){
  #designPage-title{
    font-size: 13vw;
  }
  .icon{
    display:block;
    margin:auto;
  }
  #ordering h2{
    font-size:6.3vw;
  }
}


</style>

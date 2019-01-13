<template>
  <div id="ordering">
    <!--<img class="example-panel" src="@/assets/exampleImage.jpg"> -->
    <button v-on:click="switchLang();checkLang()"
    id="lang-btn"
    :class="{'sv' : isSv, 'en' : !isSv }">{{ uiLabels.language }}</button>

    <div id= "bestallning"><h1>{{ uiLabels.myOrder }}</h1></div>

    <div id="categories-wrapper">
      <h2>{{ uiLabels.myBurger }} </h2>
      <CategoryRow v-for="category in burgerCategories"
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

    <h2>{{uiLabels.extras}}</h2>

    <CategoryRow v-for="category in extrasCategories"
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
<div id="price-div">
  {{uiLabels.sum}}: {{price}}:-
</div>
<button id = "bck-btn"
@click= "goBack">
{{ uiLabels.back }}</button>
<button id="next-btn" @click="addToCheckout();changeView('checkoutPage');">{{uiLabels.next}}</button>
<button id="order-btn" @click="placeOrder()">{{ uiLabels.placeOrder }}</button>
</div>
</template>
<script>
</script>
<style scoped>

#designPage-backdrop{
  background-color: rgba(255, 250, 224,0.99);
  border-radius:15px;
  width:95%;
  justify-self:center;
  margin-bottom:2em;
  padding-bottom:1em;
  /* margin-top:2em; */
  /* -webkit-box-shadow: 10px 7px 14px 0px rgba(158,158,158,1);
  -moz-box-shadow: 10px 7px 14px 0px rgba(158,158,158,1);
  box-shadow: 10px 7px 14px 0px rgba(158,158,158,1); */
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
  /*
  font-family: 'Luckiest Guy', sans-serif;
  color: #66d9ff;
  text-shadow: 2px 2px #0086b3;*/
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

  /* #88bba7; /*mörkturkos matchar #b9d7cb; - ljusturkos*/

  /* background: -moz-linear-gradient(to bottom, #70db70 51%, #33cc33 51%);
  background: -webkit-gradient(linear,left top, left bottom, color-stop(51%,#70db70), color-stop(51%,#33cc33));
  background: -webkit-linear-gradient(to bottom, #70db70 51%,#33cc33 51%);
  background: -o-linear-gradient(to bottom, #70db70 51%,#33cc33 51%);
  background: -ms-linear-gradient(top, #70db70 51%,#33cc33 51%);
  background: linear-gradient(to bottom, #70db70 51%,#33cc33 51%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#70db70', endColorstr='#33cc33',GradientType=0 ); */
}
/* #next-btn:active{border: 2px solid #595959;} */
#next-btn:hover{
  background-color: #89a085;
  border-color: #000000;
  /* background: -moz-linear-gradient(to bottom, #33cc33 51%, #248f24  51%); */
  /*background: -webkit-gradient(linear,left top, left bottom, color-stop(51%,#ff4d4d), color-stop(51%,#ff0000));*/
  /* background: -webkit-linear-gradient(to bottom, #33cc33 51%,#248f24 51%);
  background: -o-linear-gradient(to bottom, #33cc33 51%,#248f24 51%);
  background: -ms-linear-gradient(top, #33cc33 51%,#248f24 51%);
  background: linear-gradient(to bottom, #33cc33 51%,#248f24 51%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#33cc33', endColorstr='#248f24',GradientType=0 ); */
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
  /*display: grid;
  grid-gap: 0px;
  grid-template-columns: repeat(10,10%);
  grid-template-areas: "title";
  text-align: center;*/
}
/* #order-btn{
grid-column: 6/7;
grid-row:4;
margin-bottom: 20px;
padding:20px 30px 20px 30px;
font-size: 2em;
background-color: rgb(0, 150, 0);
#order-btn:hover{
color:black;
background-color: rgb(0, 200, 0);
} */

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


</style>

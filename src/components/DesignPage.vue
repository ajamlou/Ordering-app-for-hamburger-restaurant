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
</style>

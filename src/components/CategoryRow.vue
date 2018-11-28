<template>

  <div class="category">

    <h2>{{ categoryName }}: </h2>

    <div class="ingredient-wrapper">

      <PlusButton
      ref="PlusButton"
      :category="category">
    </PlusButton>


  </div>
</div>

</template>

<script>

  export default {
    name: 'CategoryRow',
    props: {
      category: Number,
      categoryName: String
    },
    components:{
      PlusButton
    },
    data:function(){
      return{

      }
    }
  }

    import PlusButton from '@/components/PlusButton.vue'

  </script>

  <style scoped>
  .ingredient-wrapper{
    text-align: left;
  }
  </style>

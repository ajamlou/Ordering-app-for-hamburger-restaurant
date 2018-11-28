<template>

  <div class="category">

    <h2>{{ categoryName }}: </h2>

    <div class="plusbutton-wrapper">

      <button @click="emitModalInfo" class="PlusButton">
        <slot>+</slot>
      </button>


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
    methods: {
      emitModalInfo:function(){
        this.$emit('ModalInfo', this.category)
      },
    /*components:{
      PlusButton
    },*/
    data:function(){
      return{

      }
    }
  }
}

    //import PlusButton from '@/components/PlusButton.vue'

  </script>

  <style scoped>
  .plusbutton-wrapper{
    text-align: left;
  }
  .PlusButton{
    border: 1px solid #ccd;
    background-color: rgba(255, 255, 255, 0.5);
    font-size: 2em;
    color: rgb(100,100,100);
    border-radius: 15px;
    flex: 0 0 auto;
    width:7em;
    display:table-cell;
    height:100%
  }
  .PlusButton:hover{
    background-color: rgba(100, 100, 100, 0.5);
    color: rgb(80,80,80);
  }
  </style>

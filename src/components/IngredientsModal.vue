<template>
  <transition name="modal-fade">
  <div class="modal-backdrop">
    <div class="modal" id="ing-mod">
        <button
              type="button"
              class="btn-close"
              @click="$emit('modal_info')">
              <center>x</center>
            </button>
      <div class="mod-bod">
        <Ingredient
        class="ing-in-mod"
        ref="ingredient"
        v-for="item in ingredients"
        @ingredient_clicked="emitAddIngredient(item)"
        :item="item"
        :lang="lang"
        :key="item.ingredient_id">
      </Ingredient>
    </div>
    </div>
  </div>
</transition>
</template>

<script>
import Ingredient from '@/components/Ingredient.vue'

export default {
  name: 'IngredientsModal',
  components:{
    Ingredient
  },
  props: {
    ingredients: Array,
    lang: String
  },
  data:function(){
    return{
    hasClicked:false /*Hindrar användaren från att dubbelklicka och välja tex 2 bröd*/
  }
  },
  methods:{
    emitAddIngredient:function(item){
      if(this.hasClicked){
        return;
      }
      this.hasClicked=true;
    this.$emit('add_ingredient',item);
    /*Sätt hasClicked till false efter 1 sekund*/
    setTimeout(()=>{this.hasClicked=false},1000);
  }
  }
      }

</script>

<style scoped>
.modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9998;
  }

  .modal{
    text-align:center;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    align-content: start;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: hidden;
    border-radius: 15px;
    width:45em;
    max-width:85%;
    min-height:11em;
    max-height:70%;
    padding-bottom: 10px;
  }

  .mod-bod{
    grid-column: 1/4;
    height:100%;
    margin:auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width:100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding:3px;
  }

  .ingredient{
    border: 1px solid #ccd;
    margin-top: 3px;
    align-self:start;
    /*background-color: rgba(255, 255, 255, 0.5);
    font-size: 1.3em;
    color: rgb(100,100,100);*/
    border-radius: 15px;
    width:33%;
    height:6em;
    text-align: center;
    cursor:pointer;
  }

  .btn-close {
    grid-column:3/4;
    justify-self:end;
    border-radius: 15px;
    font-size: 23px;
    height:2em;
    width:2em;
    cursor: pointer;
    font-weight: bold;
    color: white;
    background: red;
  }
  @media screen and (max-width:500px){
    .modal{
      max-height:90%;
    }
    .ingredient{
      width:49%;
      margin-top:2%;
    }
  }
</style>

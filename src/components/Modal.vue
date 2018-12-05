<template>
  <transition name="modal-fade">
  <div class="modal-backdrop">
    <div class="modal" id="ing-mod">
        <button
              type="button"
              class="btn-close"
              @click="$emit('ModalInfo')">
              x
            </button>
      <div class="mod-bod">
        <Ingredient
        ref="ingredient"
        v-for="item in ingredients"
        @ingredient_clicked="emitAddOrder(item)"
        v-if="item.category == category"
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
  name: 'Modal',
  components:{
    Ingredient
  },
  props: {
    category: Number,
    ingredients: Array,
    lang: String
  },
  methods:{
    emitAddOrder:function(item){
    this.$emit('addOrder',item);
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

  .modal {
    text-align:center;
    display: flex; /*added*/
    flex-direction: column; /*added*/
    margin-top:20px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: hidden;
    overflow: visible;
    border-radius: 15px;
    width:45em;
    max-width:100%;
    height:70%;
    padding-bottom: 15px;
  }

  .mod-bod{
    margin:auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width:100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .ingredient{
    border: 1px solid #ccd;
    background-color: rgba(255, 255, 255, 0.5);
    font-size: 1.5em;
    overflow-wrap: break-word;
    color: rgb(100,100,100);
    border-radius: 15px;
    width:32%;
    height:4em;
    text-align: center;
    margin:5px auto 3px auto;
    cursor:pointer;
  }

  .btn-close {
    /*border: none;*/
    position:element(#ing-mod);
    transform: translate(1000%,-40%);
    font-size: 23px;
    padding: 20px;
    height:3em;
    width:3em;
    border-radius:3em;
    cursor: pointer;
    font-weight: bold;
    color: white;
    background: red;
  }
</style>

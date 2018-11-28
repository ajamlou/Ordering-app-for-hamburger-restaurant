<template>
<<<<<<< HEAD
  <button @click="onClick" class="PlusButton">
=======
  <button @click="showModal" class="PlusButton">
>>>>>>> origin/maxsbranch
    <slot>+</slot>
    <modal
    :category="category"
    v-show="isModalVisible"
    @close="closeModal"/>
  </button>
</template>
<script>
import Modal from '@/components/Modal.vue'

export default {
  name: 'PlusButton',
  components:{
    Modal
  },
  props: {
    category: Number
  },
  data () {
      return {
        isModalVisible: false,
      };
    },
    methods: {
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      }
    },
  };
</script>

<style scoped>
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

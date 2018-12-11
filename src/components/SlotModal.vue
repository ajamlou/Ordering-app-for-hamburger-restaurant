<template>
  <transition name="modal-fade">
  <div class="modal-backdrop">
    <div class="modal">
        <slot name="header"></slot>
        <slot name="body"></slot>
        <slot name="footer"></slot>
    </div>
  </div>
</transition>
</template>
<script>
export default {
  name: 'SlotModal',
  components:{
  },
  props: {
  },
  methods:{
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
    max-height:70%;
    padding-bottom: 15px;
    font-size: 2.5em;
    text-align: center;
    line-height: 150%;
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
    background-color: #33cc33;
    border-radius: 10px;
    margin-top: 20vh;
  }
</style>

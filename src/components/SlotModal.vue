<template>
  <transition name="modal-fade">
  <div class="modal-backdrop">
    <div class="modal">
        <slot name="header"></slot>
      <div class = "mod-bod">
        <slot name="body"></slot>
      </div>
        <slot name="footer"
        class="mod-foot"></slot>
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
    display: grid;
    grid-template-columns: repeat(5,1fr);
    grid-template-rows: repeat(2,1fr);
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
    height: 15em;
    max-width:80%;
    max-height:80%;
    padding-bottom: 10px;
  }

  .mod-bod{
    grid-column: 1/6;
    grid-row: 1/2;
    height:100%;
    font-size: 1.5em;
    margin:auto;
    justify-content: space-between;
    flex-wrap: wrap;
    width:90%;
    overflow-y: auto;
    overflow-x: hidden;
    padding:3px;
  }

  .mod-foot {
    grid-column:3/4;
    grid-row: 2/3;
    color: white;
    margin-top: none;
    margin-bottom: 1em;
  }
  /* @media screen and (max-width:500px){
    .modal{
      max-height:90%;
    } */

  }
</style>

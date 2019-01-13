<!-- Komponent för att skapa modaler. Modalen innehåller slots som går
att fylla på olika platser (header, body, footer) -->
<template>
  <transition name="modal-fade">
  <div class="modal-backdrop">
    <div class="modal">
        <slot name="header"></slot>
      <div class = "mod-bod">
        <slot name="body"></slot>
      </div>
        <slot name="footer" class ="mod-foot"></slot>
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
    text-align: center;
    display: grid;
    /* grid-template-columns: repeat(5,1fr);*/
    /* grid-template-rows: repeat(2,1fr); */
    /* align-content: start; */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #FFFFFF;
    /* box-shadow: 2px 2px 20px 1px;
    overflow-x: hidden; */
    border-radius: 15px;
    /* overflow: auto; */
    /* max-width:80%; */
    /* max-height:150%; */
    /* padding: 5vh; */
  }

  .mod-bod{
    grid-column: auto;
    grid-row: auto;
    /* height:100%; */
    /* width:90%; */
    font-size: 4vh;
    margin: auto;
    /* justify-content: space-between; */
    /* flex-wrap: wrap; */
    overflow: auto;
    /* overflow-x: hidden; */
    padding: 3vh;
  }

</style>

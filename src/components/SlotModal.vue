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
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #FFFFFF;
    border-radius: 15px;
  }

  .mod-bod{
    grid-column: auto;
    grid-row: auto;
    font-size: 4vh;
    margin: auto;
    overflow: auto;
    padding: 3vh;
  }

</style>

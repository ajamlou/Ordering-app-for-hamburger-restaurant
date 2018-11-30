<template>
  <transition name="modal">
    <div class="modal-mask">
      <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
      <div class="modal-wrapper">
        <div class="modal-container" id="ing-mod">
          <button
          type="button"
          class="close-button"
          @click="$emit('switchVisibility')">
          X
        </button>

        <StaffViewStorage v-show = "decideContent === 'storage'">
        </StaffViewStorage>

        <StaffViewStatistics v-show = "decideContent === 'statistics'">
        </StaffViewStatistics>


      </div>
    </div>
  </div>
</transition>
</template>

<script>
import StaffViewStorage from '@/components/StaffViewStorage.vue'
import StaffViewStatistics from '@/components/StaffViewStatistics.vue'
export default {
  name: 'KitchenModal',

  props: {
    decideContent:String

  },
  components:{
    StaffViewStorage,
    StaffViewStatistics
  },
  methods: {

  }
}


</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity 0.3s ease;
  color: black;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 50vw;
  height: 40vh;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: 'Montserrat', sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.close-button {
  transform: translate(27vw,-100%);
  font-size: 3.2vh;
  padding: 19px;
  height:1em;
  width:1em;
  border-radius:3em;
  cursor: pointer;
  font-weight: bold;
  color: white;
  background: #ff3333;
  margin: auto;
}

.close-button:hover {background-color: #660000}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

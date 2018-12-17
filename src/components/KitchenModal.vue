<template>
  <transition name="storage-modal">
    <div class="storage-backdrop">
      <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
      <div class="storage-wrapper">
        <button
        type="button"
        class="close-button"
        @click="$emit('switchVisibility')">
        X
      </button>
        <div class="storage-body" id="ing-mod">
        <StaffViewStorage
        v-show = "decideContent === 'storage'"
        :ingredients="ingredients">
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
    decideContent:String,
    ingredients: Array

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
.storage-backdrop {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .6);
  transition: opacity 0.3s ease;
  color: black;
}

.storage-wrapper {
  position: fixed;
  text-align:center;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: hidden;
  overflow: visible;
  border-radius: 15px;
  padding-bottom: 15px;
  width:75%;
}

.storage-body {
  grid-column: 1/4;
  display: table-cell;
  vertical-align: middle;
  width: 100%;
  height: 50vh;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 1px;
  font-family: 'Montserrat', sans-serif;
  overflow-y: scroll;
}

.close-button {
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

.close-button:hover {background-color: #660000}

/* .storage-modal-fade-enter,
  .storage-modal-fade-leave-active {
    opacity: 0;
  }

  .storage-modal-fade-enter-active,
  .storage-modal-fade-leave-active {
    transition: opacity .1s ease;
  } */

</style>

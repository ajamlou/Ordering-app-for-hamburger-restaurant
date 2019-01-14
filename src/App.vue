<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Ordering from "./views/Ordering.vue"
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);


export default {
  name: 'app',
  components: {
    Ordering
  }
}
</script>

<style>
body {
  height:100%;
  background: rgb(200,200,200);
  background-size: 200% 200%;
  width:100%;
  margin-top:0px !important;
  padding-top:0px !important;
  padding-left: 0px;
  margin-left: 0px;
}
</style>

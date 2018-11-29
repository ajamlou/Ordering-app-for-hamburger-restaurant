<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Ordering from "./views/Ordering.vue"

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
  margin-top:0px;
  padding-top:0px;
  padding-left: 0px;
  margin-left: 0px;
  /* animation: Gradient 20s linear infinite; */
}
/*
@keyframes Gradient {
  0% {
    background-position: 10% 10%
  }
  20% {
    background-position: 50% 50%
  }
  40% {
    background-position: 10% 90%
  }
  60% {
    background-position: 90% 90%
  }
  80% {
    background-position: 90% 10%
  }
  100% {
    background-position: 10% 10%
  }
}*/
</style>

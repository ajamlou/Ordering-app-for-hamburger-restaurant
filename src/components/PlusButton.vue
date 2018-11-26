<template>
  <button class="PlusButton">
    <slot>+</slot>
  </button>
</template>


<script>
export default {
  name: 'PlusButton',
  props: {
    ingredients: Array,
    category: Number
  },
  data: function () {
    return {
      counter: 0
    };
  },
  methods: {
    }

  }
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
  height:2em;
}
.PlusButton:hover{
  background-color: rgba(100, 100, 100, 0.5);
  color: rgb(80,80,80);
}
</style>

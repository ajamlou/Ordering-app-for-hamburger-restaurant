<template>
  <button @click="onClick" class="PlusButton">
    <slot>+</slot>
  </button>
</template>
<script>
export default {
  name: 'PlusButton',
  props: {
    item: [],
    category: 0,
    onClick: {
      type: Function,
      required: true
    }
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
  width:10em;
  height:inherit;
}
.PlusButton:hover{
  background-color: rgba(200, 200, 200, 0.5);
  color: rgb(100,100,100);
}
</style>

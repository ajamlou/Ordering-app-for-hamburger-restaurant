<template>
  <div>
    <div>
    <b-btn v-b-toggle.collapse1 variant = "primary">
      Toggle Collapse
    </b-btn>
    <b-collapse class="mt-2" v-model="showCollapse" id="collapse1">
      <b-card>
        Hej Kevin
      </b-card>
    </b-collapse>
  </div>
</div>
</template>

<script>
export default {
  name: 'StaffViewStatistics',
  data:function(){
  return{showCollapse:  false};
},
  methods: {
  }
}
</script>

<style scoped>

</style>

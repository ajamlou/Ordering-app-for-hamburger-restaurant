<template>
  <div>
    <div>
    <b-btn @click="showCollapse = !showCollapse"
           :class="showCollapse ? 'collapsed' : null"
           aria-controls="collapse4"
           :aria-expanded="showCollapse ? 'true' : 'false'">
      Toggle Collapse
    </b-btn>
    <b-collapse class="mt-2" v-model="showCollapse" id="collapse4">
      <b-card>
        I should start open!
      </b-card>
    </b-collapse>
  </div>
</div>
</template>

<script>
export default {
  name: 'StaffViewStatistics',
  data:function(){
     // showCollapse:  true
   },
  methods: {
  }
}
</script>

<style scoped>

</style>

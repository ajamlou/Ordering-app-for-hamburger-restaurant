
<template>
  <div>
  <div class="modal-header">
    <slot name="header">
      Statistics
    </slot>
  </div>

  <div class="modal-body">
    <slot name="body">
      Body
    </slot>
  </div>

  <div class="modal-footer">
    <slot name="footer">
      Footer
    </slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'StaffViewStorage',
  methods: {
  }
}
</script>

<style scoped>

</style>

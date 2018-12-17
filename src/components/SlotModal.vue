<template>
  <transition name="modal-fade">
  <div class="modal-backdrop">
    <div class="modal">
        <slot name="header"></slot>
      <div class = "mod-bod">
        <slot name="body"></slot>
      </div>
      <div class = "mod-foot">
        <slot name="footer"></slot>
      </div>
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
    text-align:center;
    display: grid;
    grid-template-columns: repeat(5,1fr);
    align-content: start;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: hidden;
    border-radius: 15px;
    width:45em;
    height: 20em;
    max-width:80%;
    max-height:80%;
    padding-bottom: 10px;
  }

  .mod-bod{
    grid-column: 1/6;
    grid-row: 1;
    height:100%;
    font-size: 1.5em;
    margin:auto;
    /* display: flex; */
    justify-content: space-between;
    flex-wrap: wrap;
    width:80%;
    overflow-y: auto;
    overflow-x: hidden;
    padding:3px;
  }



  .mod-foot {
    grid-column:3/4;
    grid-row: 2;
    justify-self:end;
    border-radius: 15px;
    font-size: 23px;
    height:2em;
    width:2em;
    color: white;
    margin-top: none;
    margin-bottom: 1em;
  }
  @media screen and (max-width:500px){
    .modal{
      max-height:90%;
    }
    .ingredient{
      width:49%;
      margin-top:2%;
    }
  }

  /* .modal {
    grid-template-columns: repeat(3,1fr);
    text-align:center;
    display: grid;
    flex-direction: column;
    margin-top:20px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: hidden;
    overflow: visible;
    border-radius: 15px;
    width:30em;
    height: 10em;
    max-width:80%;
    max-height:80%;
    padding-bottom: 15px;
    font-size: 2.5em;
    text-align: center;
    line-height: 150%;
  } */
/*
  .mod-bod{
    grid-column: 1/4;
    height:100%;
    margin:auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width:100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding:3px;
  } */

/*
  .mod-foot {
    grid-column: 1/4;
    position:element(#ing-mod);
    transform: translate(1000%,-40%);
    font-size: 23px;
    padding: 20px;
    height:3em;
    width:3em;
    border-radius:3em;
    cursor: pointer;
    font-weight: bold;
    color: white;
    background-color: #33cc33;
    border-radius: 10px;
    margin-top: 20vh;
  } */
</style>

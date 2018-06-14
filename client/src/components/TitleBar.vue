<template>
<div id="title-bar">
  <div id ="title-bar-btns">
      <button id="min-btn" @click="minHandler()">-</button>
      <button id="max-btn" @click="maxHandler()">+</button>
      <button id="close-btn" @click="closeHandler()">X</button>
  </div>
</div>
</template>

<script>
const remote = require('electron').remote

export default {
  data () {
    return {
     
    }
  },
  
  methods: {
      minHandler() {
          const remote = require('electron').remote
          let window = remote.getFocusedWindow()
          window.minimize()
      },
      maxHandler() {
          const remote = require('electron').remote
          let window = remote.getFocusedWindow()
          window.maximize()
      },
      closeHandler(){
          const remote = require('electron').remote
          let window = remote.getFocusedWindow()
          window.close()
      }
  },
  mounted() {
  }
}
</script>

<style scoped>
body {
 padding: 0px;
 margin: 0px; 
}
#title-bar {
    background-color:#2c3e50;
    -webkit-app-region: drag;
 height: 24px; 
 padding: none;
 margin: 0px; 

}

#title-bar-btns {
 -webkit-app-region: no-drag;
 position: fixed;
 top: 0px;
 right: 30px;
 width: 150px;
 color: white;
 font-size: 16px;
 font-family:  monospace;
}
#title-bar-btns button {
    padding: 0px 8px;
}

#title-bar-btns button :hover{
    background-color: rgba(7, 11, 31, 0.801);
}

</style>

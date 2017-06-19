<template>
  <div>
    <div>
      {{fileContent}}
    </div>
    <button v-on:click='open'>Click here</button>
  </div>
</template>

<script>
import fs from 'fs'
import path from 'path'
export default {
  data: function () {
    return {
      fileContent: ''
    }
  },
  methods: {
    open: function () {
      console.log('test')
      this.fileContent = fs.readFileSync(path.join(__static, '/someFile.txt'), 'utf8')
      console.log(this.fileContent)
    }
  }
}
</script>

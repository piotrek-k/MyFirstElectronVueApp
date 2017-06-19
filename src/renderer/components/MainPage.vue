<template>
  <div>
    <input ref='commandLine' v-model='commandLineContent' v-on:keyup.13='runCommand' />
    <div>
      {{fileContent}}
    </div>
    <p>
      {{commandLineContent}}
    </p>
    <button v-on:click='open'>Click here</button>
  </div>
</template>

<script>
import fs from 'fs'
import path from 'path'
export default {
  data: function () {
    return {
      fileContent: '',
      commandLineContent: ''
    }
  },
  mounted () {
    window.addEventListener('focus', this.pageFocused)
  },
  methods: {
    open: function () {
      console.log('test')
      this.fileContent = fs.readFileSync(path.join(__static, '/someFile.txt'), 'utf8')
      console.log(this.fileContent)
    },
    runCommand () {
      let currentCommand = this.$refs.commandLine.value
      console.log(currentCommand)
    },
    pageFocused () {
      console.log('pageFocused')
      console.log(this)
      this.$refs.commandLine.focus()
    }
  }
}
</script>

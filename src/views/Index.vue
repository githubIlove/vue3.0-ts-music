<template>
  <div class="index">
    <!-- <button @click="handleLogin">cline me</button> -->
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive } from 'vue'

import {Song} from '../api/interface/index'

export default defineComponent({
    setup() {
      const state = reactive({
        id: '6452',
      })

      const handleLogin = async () => {
        const res = await Song.getAllSong(state.id)
        console.log(res)
      }
      return {
        handleLogin
      }
    },
})
</script>

<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
import { markdown as markdownExt } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'

const props = defineProps<{
  markdown: string
  setMarkdown: (value: string) => void
}>()

const extensions = [markdownExt()]

const handleChange = (value: string) => {
  props.setMarkdown(value)
}
</script>

<template>
  <div class="textarea-container">
    <Codemirror
      :model-value="markdown"
      :extensions="extensions"
      :theme="oneDark"
      :style="{ height: '70vh', fontSize: '12px' }"
      v-on:change="handleChange"
    ></Codemirror>
  </div>
</template>

<script setup lang="ts">
import { Bold, Heading, List, Link, Table, Trash, Image } from 'lucide-vue-next'

const { markdown, setMarkdown } = defineProps<{
  markdown: string
  setMarkdown: (v: string) => void
}>()

const addBold = (): void => {
  setMarkdown(markdown + '**bold text** ')
}

const addHeading = (): void => {
  setMarkdown(markdown + '\n# ')
}

const addList = (): void => {
  setMarkdown(markdown + '\n- ')
}

const addLink = (): void => {
  setMarkdown(markdown + '\n[link text](https://) ')
}

const addTable = (): void => {
  setMarkdown(
    markdown +
      `\n| Column 1 | Column 2 |
|----------|----------|
| Text     | Text     |
`,
  )
}

const clearAll = (): void => {
  setMarkdown('')
}

const addImage = (): void => {
  const url = prompt('Enter image URL:')
  if (!url) return

  const alt = prompt('Enter alt text (optional):') || 'image'

  setMarkdown(markdown + `\n![${alt}](${url})\n`)
}
</script>

<template>
  <div class="toolbar-container">
    <div class="toolbar-container-item" role="button" aria-label="add Bold text" @click="addBold">
      <Bold :size="15" color="#e25d5d" aria-label="Bold" />
    </div>

    <div class="toolbar-container-item" role="button" aria-label="add Header" @click="addHeading">
      <Heading :size="15" color="#e25d5d" aria-label="Header" />
    </div>

    <div class="toolbar-container-item" role="button" aria-label="add List" @click="addList">
      <List :size="15" color="#e25d5d" />
    </div>

    <div class="toolbar-container-item" role="button" aria-label="add Table" @click="addTable">
      <Table :size="15" color="#e25d5d" />
    </div>

    <div class="toolbar-container-item" role="button" aria-label="add Link" @click="addLink">
      <Link :size="15" color="#e25d5d" />
    </div>

    <div
      class="toolbar-container-item"
      role="button"
      aria-label="remove all text"
      @click="clearAll"
    >
      <Trash :size="15" color="#e25d5d" />
    </div>

    <div class="toolbar-container-item" role="button" aria-label="add Image" @click="addImage">
      <Image :size="15" color="#e25d5d" />
    </div>
  </div>
</template>

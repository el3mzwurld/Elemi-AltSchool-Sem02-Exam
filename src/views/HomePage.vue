<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import { marked } from 'marked'
import { RouterLink } from 'vue-router' // ← ADD THIS
import { Sidebar, SidebarClose } from 'lucide-vue-next'
import loading_img from '@/assets/img/loading_img.svg'
import Toolbar from '@/components/ToolBar.vue'
import TextArea from '@/components/TextArea.vue'
interface Document {
  id: number
  name: string
  content: string
  updatedAt: string
}
type PreviewMode = 'Preview' | 'Raw' | 'HTML'

const templateString = `# Welcome to elemz.md 👋
Your lightweight, live Markdown editor!

This demo shows how to use **different Markdown features**.
Feel free to edit or remove anything as you type!

---

## 📤 Text Formatting

**Bold Text**
Use double asterisks or underscores:
\`**bold text**\` or \`__bold text__\`

*Italic Text*
Use single asterisks or underscores:
\`*italic text*\` or \`_italic text_\`

***Bold & Italic***
\`***bold and italic***\`

~~Strikethrough~~
\`~~strikethrough~~\`

> Blockquotes
Use \`>\` at the start of the line:
\`> This is a quote\`

Inline \`code\`
Wrap text in backticks:
\`console.log("Hello")\`

\`\`\`
Code Block
Use triple backticks:
\`\`\`js
function greet() {
  console.log("Hello, Markdown!");
}
\`\`\`
\`\`\`

---

## 📌 Headings

Use \`#\` symbols (1–6):

\`# Heading 1\`
\`## Heading 2\`
\`### Heading 3\`
\`#### Heading 4\`
\`##### Heading 5\`
\`###### Heading 6\`

---

## ✅ Lists

### • Unordered Lists
Use \`-\`, \`*\`, or \`+\`:
- Item 1
- Item 2
  - Nested Item

### • Ordered Lists
Use numbers:
1. First item
2. Second item
3. Third item

---

## 🔗 Links
Syntax: \`[link text](url)\`
Example:
[Visit Google](https://google.com)

---

## 🖼️ Images
Syntax: \`![alt text](image-url)\`
Example:
![Markdown Example](https://via.placeholder.com/200)

---

## 🧱 Tables
\`\`\`
| Name     | Role     | Age |
|----------|----------|-----|
| Alice    | Designer | 24  |
| Bob      | Developer| 27  |
| Charlie  | Writer   | 22  |
\`\`\`

| Name     | Role     | Age |
|----------|----------|-----|
| Alice    | Designer | 24  |
| Bob      | Developer| 27  |
| Charlie  | Writer   | 22  |

---

## 📏 Horizontal Rule
Use three or more:
\`---\`
\`***\`

---

## ✅ Task Lists
\`\`\`
- [x] Write markdown
- [ ] Add preview toggle
- [ ] Connect toolbar buttons
\`\`\`

- [x] Write markdown
- [ ] Add preview toggle
- [ ] Connect toolbar buttons

---

## 🎉 You're all set!
Start typing on the left – your preview updates instantly!
`

//States(refs)
const isSidebarOpen = ref<boolean>(false)
const markdownTxt = ref<string>(templateString)
const previewMode = ref<PreviewMode>('Preview')
const documents = ref<Document[]>([])
const isLoading = ref<boolean>(false)

//Parse any string in MarkdownTxt to HTML

const parsedString = computed(() => {
  return marked(markdownTxt.value || '')
})

//Load all the documents from localstorage on mount

onMounted(() => {
  try {
    const rawString = localStorage.getItem('Markdown_Docs')

    if (!rawString) {
      markdownTxt.value = templateString
      return
    }

    const savedDocs: Document[] = JSON.parse(rawString)

    if (savedDocs.length > 0) {
      const latestDoc = savedDocs[savedDocs.length - 1]

      if (typeof latestDoc && typeof latestDoc?.content === 'string') {
        markdownTxt.value = latestDoc.content
        documents.value = savedDocs
      } else {
        markdownTxt.value = templateString
      }
    }
  } catch (error) {
    console.log('Unable to get documents from local storage:', error)
    markdownTxt.value = templateString
  }
})
const nextId = (): number => {
  if (documents.value.length === 0) return 1
  const maxId = Math.max(...documents.value.map((doc) => doc.id))
  return maxId + 1
}
watch(markdownTxt, (newValue) => {
  if (!newValue.trim()) return

  const updatedDocs = [...documents.value]

  //if no document, create one. If one exists, Store it
  if (updatedDocs.length === 0) {
    updatedDocs.push({
      id: nextId(),
      name: 'untitled.md',
      content: newValue,
      updatedAt: new Date().toISOString(),
    })
  } else {
    const lastIndex = updatedDocs.length - 1
    const latestDoc = updatedDocs[lastIndex]

    if (latestDoc) {
      updatedDocs[lastIndex] = {
        ...latestDoc,
        content: newValue,
        updatedAt: new Date().toISOString(),
      }
    }
  }

  localStorage.setItem('Markdown_Docs', JSON.stringify(updatedDocs))
  documents.value = updatedDocs
})

//Helper functions

const saveFile = (): void => {
  const unfil = prompt('Please enter a file name:', 'Untitled.md')
  if (!unfil) return

  const fileName = unfil.endsWith('.md') ? unfil : `${unfil}.md`

  const Doc = {
    id: Date.now(),
    name: fileName,
    content: markdownTxt.value,
    updatedAt: new Date().toISOString(),
  }

  const updatedDocs = [...documents.value, Doc]
  localStorage.setItem('Markdown_Docs', JSON.stringify(updatedDocs))
  documents.value = updatedDocs
}

//Download a .md file

const downloadMd = (): void => {
  const unfil = prompt('Please enter a file name:', 'Untitled.md')
  if (!unfil) return

  const file = unfil.endsWith('.md') ? unfil : `${unfil}.md`

  const blob = new Blob([markdownTxt.value], { type: 'text/markdown' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = file
  link.click()
  URL.revokeObjectURL(link.href)
}

const clearStorage = (): void => {
  localStorage.clear()
  location.reload()
}

//Create a new doument
const initNewDoc = (): void => {
  const untitledCounter = documents.value.filter((doc) =>
    doc.name.toLowerCase().startsWith('untitled'),
  ).length

  const newDoc: Document = {
    id: nextId(),
    name: untitledCounter === 0 ? 'untitled.md' : `untitled(${untitledCounter}).md`,
    content: '',
    updatedAt: new Date().toISOString(),
  }

  const updatedDocs = [...documents.value, newDoc]
  localStorage.setItem('Markdown_Docs', JSON.stringify(updatedDocs))
  documents.value = updatedDocs
  markdownTxt.value = templateString
  // toggleSidebar()
}

const renderDoc = (id: number): void => {
  const doc = documents.value.find((d) => d.id === id)

  if (doc) {
    markdownTxt.value = doc.content
  }
}

// Import .md file from local device
const importLocal = (event: Event): void => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  // Check if the file is a .md file
  if (!file.name.endsWith('.md')) {
    markdownTxt.value = 'Invalid File, Import a markdown file'
    return
  }

  isLoading.value = true
  const reader = new FileReader()

  reader.onload = (e: ProgressEvent<FileReader>) => {
    setTimeout(() => {
      const importedContent = e.target?.result as string
      markdownTxt.value = importedContent

      const newDoc: Document = {
        id: Date.now(),
        name: file.name,
        content: importedContent,
        updatedAt: new Date().toISOString(),
      }

      const updatedDocs = [...documents.value, newDoc]
      localStorage.setItem('Markdown_Docs', JSON.stringify(updatedDocs))
      documents.value = updatedDocs

      isLoading.value = false
      input.value = ''
    }, 5000)
  }

  reader.onerror = () => {
    console.log('Error reading file')
    isLoading.value = false
    input.value = ''
  }

  reader.readAsText(file)
}

const setMarkdown = (value: string): void => {
  markdownTxt.value = value
}
const toggleSidebar = (): void => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div class="home-container">
    <header class="header">
      <nav class="nav" aria-label="Main navigation">
        <div class="nav_logo">
          <div class="side-logo" @click="toggleSidebar">
            <Sidebar color="#e25d5d" :size="20" class="ico" />
          </div>
          <h2>elemz.md</h2>
        </div>
        <div class="nav_dropdowns">
          <div class="nav_dropdowns_item">
            <p>{{ previewMode }}</p>

            <div class="nav_dropdowns_item_menu">
              <p @click="previewMode = 'Preview'">Preview</p>
              <p @click="previewMode = 'Raw'">Raw</p>
              <p @click="previewMode = 'HTML'">HTML</p>
            </div>
          </div>
          <div class="nav_dropdowns_item">
            <p>Import</p>

            <div class="nav_dropdowns_item_menu">
              <p @click="($refs.mdFileInput as HTMLInputElement).click()">.md</p>
            </div>
          </div>
          <div class="nav_dropdowns_item">
            <p>Download</p>

            <div class="nav_dropdowns_item_menu">
              <p @click="downloadMd">.md</p>
            </div>
          </div>
          <div class="nav_dropdowns_item">
            <RouterLink to="/error">Trigger error</RouterLink>
          </div>
        </div>
      </nav>
    </header>

    <aside
      :class="['sidebar', { active: isSidebarOpen }]"
      role="complementary"
      aria-label="Document History Sidebar"
    >
      <div class="sidebar_close" @click="toggleSidebar">
        <SidebarClose :size="30" color="#e25d5d" />
      </div>

      <div class="sidebar_content">
        <ul class="sidebar-content-container">
          <li class="sidebar-content-link">
            <p>DOCUMENTS</p>
            <ul role="list">
              <li v-if="documents.length === 0" key="empty" class="sidebar-content-link-item empty">
                No saved documents
              </li>
              <li
                v-else
                v-for="doc in documents"
                :key="doc.id"
                class="sidebar-content-link-item"
                role="button"
                tabindex="0"
                :aria-label="`Open ${doc.name}`"
                @click="renderDoc(doc.id)"
              >
                {{ doc.name }}
              </li>
            </ul>
          </li>
          <li class="sidebar-content-link" id="sidebar-btn-new-doc">
            <button @click="initNewDoc" role="button" aria-label="Create new Document">
              NEW DOCUMENT
            </button>
          </li>
          <li class="sidebar-content-link" id="sidebar-btn-save-sess">
            <button @click="saveFile" role="button" aria-label="Save document">SAVE SESSION</button>
          </li>
          <li
            class="sidebar-content-link"
            id="sidebar-btn-clr-doc"
            role="button"
            aria-label="Remove all documents from history"
            @click="clearStorage"
          >
            <p>DELETE ALL DOCUMENTS</p>
          </li>
          <li class="sidebar-content-link">
            <RouterLink to="/test-404">Test 404</RouterLink>
          </li>
        </ul>
      </div>
    </aside>

    <main class="main">
      <!-- Body of the mkd application -->
      <div
        v-if="isLoading"
        class="main-isLoading"
        role="status"
        aria-live="polite"
        aria-label="Loading Document"
      >
        <img :src="loading_img" alt="Loading" aria-label="Loading Image" />
      </div>

      <template v-else>
        <section class="editor-container" aria-label="Markdown editor section">
          <Toolbar :markdown="markdownTxt" :set-markdown="setMarkdown" />
          <!-- Tool bar to give a few quick access options to users -->
          <TextArea :markdown="markdownTxt" :set-markdown="setMarkdown" />
          <!-- Text area to allow users type their markdown text -->
        </section>

        <section class="preview-container" aria-label="Markdown Preview section">
          <div class="preview-language">
            <p>{{ previewMode.toUpperCase() }}</p>
            <p>PREVIEW</p>
          </div>
          <div class="preview-content">
            <!-- Raw, Preview, HTML -->
            <pre
              v-if="previewMode === 'Raw'"
              role="textbox"
              aria-label="Raw Markdown text preview"
              >{{ markdownTxt }}</pre
            >
            <div
              v-else-if="previewMode === 'Preview'"
              v-html="parsedString"
              role="textbox"
              aria-label="Styled preview"
            ></div>
            <pre v-else role="textbox" aria-label="HTML text preview">{{ parsedString }}</pre>
          </div>
        </section>
      </template>
    </main>

    <!-- Hidden file input -->
    <input ref="mdFileInput" type="file" accept=".md" style="display: none" @change="importLocal" />
  </div>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import errorImg from './assets/img/bug_fixing.svg'

const hasError = ref(false)
const errorMessage = ref<string>('')

onErrorCaptured((err: Error) => {
  hasError.value = true
  errorMessage.value = err.message
  console.error('Caught by ErrorBoundary:', err)
  return false // Prevent error from propagating further
})
</script>

<template>
  <div v-if="hasError" class="error-show">
    <header>
      <nav>
        <ul>
          <li>
            <RouterLink to="/" class="link" target="_blank"> Home </RouterLink>
          </li>
          <li>
            <RouterLink to="/error" class="link"> Error </RouterLink>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <section class="main_illustration">
        <p><span>Error</span> : {{ errorMessage }}</p>

        <img :src="errorImg" alt="error illustration" />
      </section>
    </main>
  </div>

  <RouterView v-else />
</template>

<style>
@import './assets/styles/global.css';
</style>

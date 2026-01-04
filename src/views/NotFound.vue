<script setup lang="ts">
import notFound from '@/assets/img/not-found.svg'
</script>

<template>
  <div class="notFound">
    <header>
      <nav>
        <ul>
          <li>
            <RouterLink to="/" class="notfound-link"> Go back home </RouterLink>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <section class="notFound_body">
        <img :src="notFound" alt="page not found" />
        <h2>404 : That page doesn't exist</h2>
      </section>
    </main>
  </div>
</template>

<style scoped></style>

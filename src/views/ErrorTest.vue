<script setup lang="ts">
// This component immediately throws an error when rendered

const throwError = (): never => {
  throw new Error('Intentional test error')
}

throwError()
</script>

<template>
  <div>This should never be visible</div>
</template>

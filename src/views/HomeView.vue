<script setup lang="ts">
import Resume from '@/components/Resume.vue'
import RightEditBox from '@/components/RightEditBox.vue'
</script>

<template>
  <main>
    <div class="edit_resume">
      <Resume />
      <RightEditBox />
    </div>
  </main>
</template>

<style>
body{
  margin:0;
}
@media (min-width: 1024px) {
  .edit_resume{
    background-color: #90909b;
    display: flex;
  }
}
</style>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Navbar from '@/components/Navbar.vue';

</script>

<template>
  <div class="w-[100%]">
    <Navbar />
    <RouterView />
  </div>
</template>
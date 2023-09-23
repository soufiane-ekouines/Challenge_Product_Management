<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Navbar from '@/components/Navbar.vue';

</script>

<template>
  <div w-full>
    <Navbar />
  </div>
  <RouterView />
</template>
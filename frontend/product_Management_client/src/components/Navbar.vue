<template>
  <nav class=" flex justify-around py-4 mx-auto bg-white border ">
    <div>
      <h3 class="text-2xl font-medium text-blue-500">Squa HR</h3>
    </div>
    <div class="flex items-center space-x-8">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink v-if="islogin" to="/create">Create</RouterLink>
      <div v-if="!islogin" class="flex items-center space-x-8">
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </div>
      <button  v-if="islogin"  @click="Logout">Logout</button>
    </div>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  data(){
    return{
      islogin:false
    }
  },
  beforeMount() {
    // Check if the token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      this.islogin = true; // Set islogin to true if the token exists
    }
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const islogin = computed(() => store.getters.isAuthenticated);


    const Logout = () => {
      localStorage.clear();
      router.push({ path: '/login' });
      window.location.reload();

    };
    return { Logout };
  },
};
</script>
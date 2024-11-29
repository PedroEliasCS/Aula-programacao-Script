<template>
  <div class="auth-layout">
    <header>
      <h1>Authentication</h1>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <p>&copy; 2023 Your Company</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
};
import { mapActions } from 'vuex';

export default {
    name: "AuthLayout",
    methods: {
        ...mapActions(['login', 'logout']),
    },
    created() {
        // Check if the user is already authenticated
        if (this.$store.state.auth.isAuthenticated) {
            this.$router.push({ name: 'Home' });
        }
    }
};
</script>

<style scoped>
.auth-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #f5f5f5;
  padding: 1rem;
  text-align: center;
}

main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

footer {
  background-color: #f5f5f5;
  padding: 1rem;
  text-align: center;
}
</style>

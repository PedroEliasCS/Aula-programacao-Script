<template>
  <!-- 
        Login Component
        This component provides a simple login form with fields for username and password.
        It includes basic styling and handles the form submission using the handleLogin method.
    -->
</template>

<script>
export default {
  data() {
    return {
      // Username entered by the user
      username: "",
      // Password entered by the user
      password: "",
    };
  },
  methods: {
    /**
     * Handle login logic
     * This method is triggered when the login form is submitted.
     * It currently logs the username and password to the console.
     */
    handleLogin() {
      console.log("Username:", this.username);
      console.log("Password:", this.password);

      // n implementarea finala, aceasta metoda ar trebui sa trimita datele catre server pentru autentificare
      // françes ?? pq?
    },
  },
};
</script>

<style scoped>
/* 
    Styles for the Login Component
    - .login-container: Styles the container of the login form
    - .form-group: Styles each form group (label and input)
    - label: Styles the labels of the form fields
    - input: Styles the input fields
    - button: Styles the submit button
    - button:hover: Styles the submit button on hover
*/
</style>

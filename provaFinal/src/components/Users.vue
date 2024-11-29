<template>
  <div class="user-container">
    <h1>User Information</h1>
    <div class="user-details">
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Age:</strong> {{ user.age }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      user: {
        name: "John Doe",
        email: "john.doe@example.com",
        age: 30,
      },
    };
  },
};
</script>

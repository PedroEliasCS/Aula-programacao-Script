<template>
  <!-- 
  This template renders a container with a title "Carts" and a filter section.
  The filter section includes:
  - A date input field bound to `filter.date`
  - A number input field bound to `filter.userId`
  - A button to apply the filter by calling `applyFilter` method

  Below the filter section, it displays a list of carts filtered by the criteria.
  Each cart item is a link to the cart details page.
  -->
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Carts",
  data() {
    return {
      filter: {
        date: "",
        userId: "",
      },
    };
  },
  computed: {
    ...mapGetters(["filteredCarts"]), // Computed property to get filtered carts from Vuex store
  },
  methods: {
    ...mapActions(["fetchCarts"]), // Method to fetch carts from Vuex store
    applyFilter() {
      this.fetchCarts(); // Fetch carts when filter is applied
    },
  },
  created() {
    this.fetchCarts(); // Fetch carts when component is created
  },
};
</script>

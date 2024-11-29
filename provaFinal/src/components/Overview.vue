<template>
  <!-- Container for the overview section -->
  <div class="container">
    <!-- Title for the overview section -->
    <h1 class="my-4">Overview</h1>
    <div class="row">
      <!-- Card for displaying total products -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <!-- Title for the total products card -->
            <h5 class="card-title">Total Products</h5>
            <!-- Display the total number of products -->
            <p class="card-text">{{ totalProducts }}</p>
          </div>
        </div>
      </div>
      <!-- Card for displaying total categories -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <!-- Title for the total categories card -->
            <h5 class="card-title">Total Categories</h5>
            <!-- Display the total number of categories -->
            <p class="card-text">{{ totalCategories }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Overview",
  computed: {
    // Map Vuex getters to local computed properties
    ...mapGetters(["allProducts", "allCategories"]),
    // Compute the total number of products
    totalProducts() {
      return this.allProducts.length;
    },
    // Compute the total number of categories
    totalCategories() {
      return this.allCategories.length;
    },
  },
  methods: {
    // Map Vuex actions to local methods
    ...mapActions(["fetchProducts", "fetchCategories"]),
  },
  created() {
    // Fetch products and categories when the component is created
    this.fetchProducts();
    this.fetchCategories();
  },
};
</script>

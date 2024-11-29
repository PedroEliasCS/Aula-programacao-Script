<template>
  <!--
  This template renders a list of products with search, category filter, and sorting options.
  It includes:
  - A search input to filter products by title.
  - A category dropdown to filter products by category.
  - A sorting dropdown to sort products by price or rating.
  - A list of product cards displaying product details and actions (view and delete).
  -->
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Products",
  data() {
    return {
      search: "", // Search query for filtering products by title
      selectedCategory: "", // Selected category for filtering products
      sortOrder: "price", // Selected sort order (price or rating)
    };
  },
  computed: {
    ...mapGetters(["allProducts", "allCategories"]),
    filteredProducts() {
      // Filters products based on search query and selected category
      let products = this.allProducts;
      if (this.search) {
        products = products.filter((product) =>
          product.title.toLowerCase().includes(this.search.toLowerCase())
        );
      }
      if (this.selectedCategory) {
        products = products.filter(
          (product) => product.category === this.selectedCategory
        );
      }
      return products;
    },
  },
  methods: {
    ...mapActions(["fetchProducts", "fetchCategories", "deleteProduct"]),
    viewProduct(id) {
      // Navigates to the product detail page
      this.$router.push(`/products/${id}`);
    },
    filterByCategory() {
      // Fetches products based on the selected category
      this.fetchProducts();
    },
    sortProducts() {
      // Sorts products based on the selected sort order (price or rating)
      if (this.sortOrder === "price") {
        this.allProducts.sort((a, b) => a.price - b.price);
      } else if (this.sortOrder === "rating") {
        this.allProducts.sort((a, b) => b.rating.rate - a.rating.rate);
      }
    },
  },
  created() {
    // Fetches products and categories when the component is created
    this.fetchProducts();
    this.fetchCategories();
  },
};
</script>

<style scoped>
/* Styles for the product card images */
.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>

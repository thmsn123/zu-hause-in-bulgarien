<template>
  <div class="single-post-page container my-3" v-if="currentSale">
    <post-details :currentPost="currentSale"></post-details>
  </div>
</template>

<script>
import PostDetails from "../../components/Posts/PostDetails";
import { mapGetters } from "vuex";

export default {
  name: 'SalesDetails',
  components: {
    PostDetails
  },
  computed: {
    ...mapGetters(["currentPost"]),
    currentSale() {
      return this.currentPost(this.$route);
    }
  }
};
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}
</style>
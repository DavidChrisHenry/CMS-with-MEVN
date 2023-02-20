<!-- @format -->
<template>
  <v-container>
    <v-row no-gutters>
      <v-col class="pa-4 mx-auto" sm="10">
        <v-card class="pa-2">
          <img :src="`/${post.image}`" :title="`${post.title}`" width="840" />
          <v-card-actions class="pb-0">
            <v-row class="mt-1 mx-1">
              <v-col sm="2">
                <v-btn small outlined color="primary">{{
                  post.category
                }}</v-btn>
              </v-col>
              <v-col class="d-flex justify-end" sm="10">
                <v-btn
                  color="success"
                  text
                  :to="{ name: 'edit-post', params: { id: post._id } }"
                  >Edit</v-btn
                >
                <v-btn color="error" text @click="removePost(post._id)"
                  >Delete</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
          <v-card-subtitle class="headline">
            <h3>{{ post.title }}</h3>
          </v-card-subtitle>
          <v-card-text style="color: black">
            <p>{{ post.content }}</p>
            <p>{{ post.create }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import API from "../api";
  export default {
    data() {
      return {
        post: {},
      };
    },
    async created() {
      const response = await API.getPostById(this.$route.params.id);
      this.post = response;
    },
    methods: {
      async removePost(id) {
        const response = await API.deletePost(id);
        this.$router.push({
          name: "home",
          params: { message: response.message },
        });
      },
    },
  };
</script>
<style></style>

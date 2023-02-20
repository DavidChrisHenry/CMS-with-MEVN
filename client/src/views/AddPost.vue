<!-- @format -->

<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col class="mx-auto" sm="10">
          <v-card class="pa-5">
            <v-card-title>Add New Post</v-card-title>
            <!-- <v-devider /> -->
            <v-form
              class="pa-5"
              ref="form"
              @submit.prevent="submitForm"
              enctype="multipart/form-data"
            >
              <v-text-field
                placeholder="Title"
                prepend-icon="mdi-note"
                :rules="rules"
                v-model="post.title"
              ></v-text-field>
              <v-text-field
                placeholder="Category"
                prepend-icon="mdi-view-list"
                :rules="rules"
                v-model="post.category"
              ></v-text-field>
              <v-textarea
                placeholder="Content"
                prepend-icon="mdi-note-plus"
                :rules="rules"
                v-model="post.content"
              ></v-textarea>
              <v-file-input
                :rule="rules"
                show-size
                counter
                multiple
                placeholder="Select Image (png, jpeg,...)"
                @change="selectFile"
              ></v-file-input>
              <v-btn class="mt-3" type="submit" color="primary">Add Post</v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
  import API from "../api";
  export default {
    data() {
      return {
        rules: [(value) => !!value || "This field is required!"],
        post: {
          title: "",
          category: "",
          content: "",
          image: "",
        },
        image: "",
      };
    },
    methods: {
      selectFile(file) {
        this.image = file[0];
      },
      async submitForm() {
        const formData = new FormData();
        formData.append("image", this.image);
        formData.append("title", this.post.title);
        formData.append("category", this.post.category);
        formData.append("content", this.post.content);
        if (this.$refs.form.validate()) {
          const response = await API.addPost(formData);
          this.$router.push({
            name: "home",
            params: { message: response.message },
          });
        }
      },
    },
  };
</script>
<style></style>

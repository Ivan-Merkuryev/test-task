<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      selectedUser: "",
    };
  },
  computed: {
    ...mapState(["posts", "users"]),
    ...mapGetters(["selectedUserPosts", "notifications"]),
    filteredPosts() {
      return this.selectedUser ? this.selectedUserPosts : this.posts;
    },
  },
  methods: {
    filterPosts() {
      this.$store.dispatch("filterPostsByUser", this.selectedUser);
    },
    getUserName(userId) {
      const user = this.users.find((user) => user.id === userId);
      return user ? user.name : "Неизвестный пользователь";
    },
    getComments(postId) {
      const comments = this.comments.find(
        (comment) => comment.postId === postId
      );
      return comments ? comments.length + 1 : 0;
    },
  },
  created() {
    this.$store.dispatch("fetchPosts");
    this.$store.dispatch("fetchUsers");
  },
};
</script>

<template>
  <header>
    <h1 class="h1">Список постов</h1>
    <span class="text-select">Посты от:</span>

    <select class="select" @change="filterPosts" v-model="selectedUser">
      <option class="option" value="">всех пользователей</option>
      <option class="option" v-for="user in users" :key="user.id" :value="user.id">
        {{ user.name }}
      </option>
    </select>
    <ul class="posts">
      <li class="post" v-for="post in filteredPosts" :key="post.id">
        <router-link :to="{ name: 'FullPost', params: { id: post.id } }">
          <p class="post-name">{{ getUserName(post.userId) }}</p>
          <p class="post-title">{{ post.title }}</p>
          <p class="post-body">{{ post.body }}</p>
        </router-link>
      </li>
    </ul>
  </header>
</template>

<style lang="sass">
.h1
  text-align: center
.text-select
  font-size: 16px
  margin-right: .5em
.select
  padding: 8px 4px
  font: inherit
  font-size: 16px
  appearance: none
  border: none
  cursor: pointer
  outline: none
  .option
    padding: 4px
    font-size: 16px
    outline: none
.posts
  display: flex
  flex-wrap: wrap
  align-content: center
  flex-direction: column
  gap: 10px
.post
  max-width: 600px
  border: 1px black solid
  padding: 12px 18px
  border-radius: 8px
  .post-name
    color: #858585
  .post-title
    text-align: center
    margin-top: 8px
    margin-bottom: 8px
    font-size: 20px
  .post-body
    display: -webkit-box
    -webkit-line-clamp: 1
    -webkit-box-orient: vertical
    overflow: hidden
.post:hover
  background-color: #f9f9f9

</style>

<script setup>
import AvatarIcon from "@/components/AvatarIcon.vue";
import DataLoading from "@/components/DataLoading.vue";
import { Toaster, toast } from "vue-sonner";
</script>
<script>
export default {
  data() {
    return {
      post: {},
      user: {},
      comments: [],
      commentEmail: "",
      commentName: "",
      commentBody: "",
      isLoading: true,
    };
  },
  async created() {
    const postId = this.$route.params.id;
    try {
      const postResponse = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      this.post = await postResponse.json();
      if (!postResponse.ok) {
        toast.error("Пост не найден");
      }
    } catch {
      toast.error("Пост не найден");
    }

    const userResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${this.post.userId}`
    );
    this.user = await userResponse.json();

    const commentsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    this.comments = await commentsResponse.json();
    this.isLoading = false;
  },
  methods: {
    submitComment() {
      if (this.commentBody.trim()) {
        this.comments.push({
          email: this.commentEmail,
          name: this.commentName,
          body: this.commentBody,
        });
        toast("Комментарий отправлен!");
        this.commentEmail = "";
        this.commentName = "";
        this.commentBody = "";
      }
    },
  },
};
</script>

<template>
  <nav class="nav">
    <router-link to="/" class="link">Главная</router-link>
  </nav>
  <main v-if="isLoading">
    <DataLoading />
    <Toaster position="bottom-right" />
  </main>
  <main v-else>
    <h1 class="title">{{ post.title }}</h1>

    <div class="post-content">
      <AvatarIcon />
      <div>
        <p class="post-author">Автор:</p>
        <p>{{ user.name }}</p>
        <p>{{ email }}</p>
        <p>{{ user.website }}</p>
        <p>{{ user.address.city }}</p>
      </div>
    </div>
    <p class="post-body">{{ post.body }}</p>
    <hr />
    <p class="text-comments">Комментарии:</p>
    <ul class="comments">
      <li class="comment" v-for="comment in comments" :key="comment.id">
        <div>
          <p class="comment-email">{{ comment.email }}</p>
          <p class="comment-name">{{ comment.name }}</p>
          <p class="comment-body">{{ comment.body }}</p>
        </div>
        <hr />
      </li>
    </ul>
    <form class="form">
      <input class="form-email" v-model="commentEmail" placeholder="Email:" />
      <input class="form-name" v-model="commentName" placeholder="Название:" />
      <textarea
        class="form-body"
        v-model="commentBody"
        placeholder="Текст:"
      ></textarea>
      <button type="button" @click="submitComment">Добавить комментарий</button>
    </form>
    <Toaster position="bottom-right" />
  </main>
</template>

<style lang="sass">
.nav
  margin-top: 18px
.link
  border: 1px solid #ccc
  padding: 8px 4px
  border-radius: 8px
.title
  text-align: center
.post-content
  display: flex
  gap: 8px
  align-items: center
.post-body
  margin-top: 16px
.post-author
  text-align: center
  margin-bottom: 4px
.text-comments
  margin-top: 18px
.comments
  display: flex
  flex-wrap: wrap
  align-content: center
  flex-direction: column
  gap: 10px
  .comment
    max-width: 600px
    .comment-email
      color: #858585
    .comment-name
      margin-top: 5px
      margin-bottom: 5px
      border-bottom: solid 1px #ccc
      display: inline-block
.form
  max-width: 600px
  margin: 20px auto
  padding: 15px
  border: 1px solid black
  border-radius: 8px
  outline: none
  display: flex
  flex-direction: column
  gap: 10px
  .form-name, .form-email
    border: 1px solid #ccc
    border-radius: 4px
    outline: none
    padding: 6px 12px
    font: inherit
    font-size: 16px
    max-width: 190px
  .form-name:focus, .form-email:focus,.form-body:focus
    outline: 1px solid black
  .form-body
    padding: 6px 12px
    margin-bottom: 15px
    border: 1px solid #ccc
    border-radius: 4px
    font-size: 16px
    font: inherit
    outline: none
    resize: none
button
  border: 1px solid #ccc
  border-radius: 4px
  padding: 4px 8px
  cursor: pointer
  font-size: 16px
  background-color: inherit
  display: inline-block
  max-width: 210px
  margin: 0 auto
  font: inherit
button:hover
  border: 1px solid black
</style>

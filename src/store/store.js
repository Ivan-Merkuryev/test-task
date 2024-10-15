import { createStore } from "vuex";

export default createStore({
  state: {
    posts: [],
    users: [],
    selectedUser: null,
    selectedPost: null,
    comments: [],
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_SELECTED_USER_POSTS(state, posts) {
      state.selectedPost = posts;
    },
    SET_COMMENTS(state, comments) {
      state.comments = comments;
    },
    SET_SELECTED_USER(state, userId) {
      state.selectedUser = userId;
    },
  },
  actions: {
    async fetchPosts({ commit }) {
      await fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => commit("SET_POSTS", json));
    },
    async fetchUsers({ commit }) {
      await fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => commit("SET_USERS", json));
    },
    filterPostsByUser({ commit, state }, userId) {
      commit("SET_SELECTED_USER", userId);
      const filteredPosts = state.posts.filter(
        (post) => post.userId === userId
      );
      commit("SET_SELECTED_USER_POSTS", filteredPosts);
    },
    async fetchComments({ commit }) {
      await fetch("https://jsonplaceholder.typicode.com/comments")
        .then((response) => response.json())
        .then((json) => commit("SET_COMMENTS", json));
    },
  },
  getters: {
    allPosts: (state) => state.posts,
    selectedUserPosts: (state) => state.selectedPost,
    users: (state) => state.users,
  },
});
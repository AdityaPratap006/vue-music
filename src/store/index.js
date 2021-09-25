import { createStore } from 'vuex';
import { firebaseAuth, usersCollection } from '@/includes/firebase';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
  },
  getters: {},
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth: (state) => {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  actions: {
    register: async ({ commit }, payload) => {
      const userCred = await firebaseAuth.createUserWithEmailAndPassword(
        payload.email,
        payload.password
      );

      await usersCollection.doc(userCred.user.uid).set({
        name: payload.name,
        email: payload.email,
        country: payload.country,
        age: payload.age,
      });

      await userCred.user.updateProfile({
        displayName: payload.name,
      });

      commit('toggleAuth');
    },

    init_login: ({ commit }) => {
      const user = firebaseAuth.currentUser;

      if (user) {
        commit('toggleAuth');
      }
    },

    login: async ({ commit }, payload) => {
      await firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password);

      commit('toggleAuth');
    },

    signOut: async ({ commit }) => {
      await firebaseAuth.signOut();

      commit('toggleAuth');
    },
  },
  modules: {},
});

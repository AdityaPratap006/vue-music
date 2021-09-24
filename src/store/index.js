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
    toggleAuthentication: (state) => {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  actions: {
    register: async ({ commit }, payload) => {
      await firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password);

      await usersCollection.add({
        name: payload.name,
        email: payload.email,
        country: payload.country,
        age: payload.age,
      });

      commit('toggleAuthentication');
    },
  },
  modules: {},
});

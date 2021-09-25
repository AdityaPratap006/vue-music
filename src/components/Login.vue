<template>
  <div class="text-white text-center font-bold p-5 mb-4" v-if="showAlert" :class="alertVariant">
    {{ alertMsg }}
  </div>
  <vee-form :validation-schema="schema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        type="email"
        class="
          block
          w-full
          py-1.5
          px-3
          text-gray-800
          border border-gray-300
          transition
          duration-500
          focus:outline-none focus:border-black
          rounded
        "
        placeholder="Enter Email"
      />
      <vee-error-message class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password"
        type="password"
        class="
          block
          w-full
          py-1.5
          px-3
          text-gray-800
          border border-gray-300
          transition
          duration-500
          focus:outline-none focus:border-black
          rounded
        "
        placeholder="Password"
      />
      <vee-error-message class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      class="
        block
        w-full
        bg-purple-600
        text-white
        py-1.5
        px-3
        rounded
        transition
        hover:bg-purple-700
      "
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      schema: {
        email: 'required|email',
        password: 'required|min:3|max:100',
      },
      inSubmission: false,
      showAlert: false,
      alertVariant: 'bg-blue-500',
      alertMsg: 'Please wait! Logging you in.',
    };
  },
  methods: {
    async login(values) {
      this.showAlert = true;
      this.inSubmission = true;

      console.log(values);

      try {
        await this.$store.dispatch('login', values);
      } catch (error) {
        this.alertVariant = 'bg-red-500';
        this.alertMsg = 'Failed! Could not log you in!';
        this.inSubmission = false;
        return;
      }

      this.alertVariant = 'bg-green-500';
      this.alertMsg = 'Success! You are logged in!';
      window.location.reload();
    },
  },
};
</script>

<template>
  <div class="text-white text-center font-bold p-5 mb-4" v-if="showAlert" :class="alertVariant">
    {{ alertMsg }}
  </div>
  <vee-form :validation-schema="schema" @submit="register" :initial-values="userData">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field name="name" :bails="false" v-slot="{ field, errors }">
        <input
          type="text"
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
          placeholder="Enter Name"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field name="email" :bails="false" v-slot="{ field, errors }">
        <input
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
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field name="age" :bails="false" v-slot="{ field, errors }">
        <input
          type="number"
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
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Password -->
    <input type="password" class="hidden" />
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
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
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        type="password"
        name="confirmPassword"
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
        placeholder="Confirm Password"
      />
      <vee-error-message class="text-red-600" name="confirmPassword" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        name="country"
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
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="India">India</option>
        <option value="Antarctica">Antarctica</option>
      </vee-field>
      <vee-error-message class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 flex flex-col items-start">
      <div class="flex gap-1 items-center">
        <vee-field type="checkbox" name="tos" value="1" class="w-4 h-4 rounded" />
        <label class="inline-block">Accept terms of service</label>
      </div>
      <vee-error-message class="text-red-600" name="tos" />
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
      :disabled="inSubmission"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|min:3|max:100|email',
        age: 'required|min_value:16|max_value:110',
        password: 'required|min:3|max:100',
        confirmPassword: 'passwords_mismatch:@password',
        country: 'required|country_excluded:Antarctica',
        tos: 'tos',
      },
      userData: {
        country: 'Germany',
      },
      inSubmission: false,
      showAlert: false,
      alertVariant: 'bg-blue-500',
      alertMsg: 'Please wait! Your account is being created.',
    };
  },
  methods: {
    async register(values) {
      this.showAlert = true;
      this.inSubmission = true;

      console.log(values);

      try {
        await this.$store.dispatch('register', values);
      } catch (error) {
        this.alertVariant = 'bg-red-500';
        this.alertMsg = 'Failed! Could not create the account!';
        this.inSubmission = false;

        return;
      }

      this.alertVariant = 'bg-green-500';
      this.alertMsg = 'Success! Your account has been created!';
      window.location.reload();
    },
  },
};
</script>

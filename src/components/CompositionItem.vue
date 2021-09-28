<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">
        {{ song.modifiedName }}
      </h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deleteSong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="toggleForm"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div class="text-white text-center font-bold p-4 mb-4" v-if="showAlert" :class="alertVariant">
        {{ alertMsg }}
      </div>
      <vee-form
        :validation-schema="schema"
        :initial-values="{ title: song.modifiedName, genre: song.genre }"
        @submit="edit"
      >
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
            name="title"
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
            placeholder="Enter Song Title"
            @input="updateUnsavedFlag(true)"
          />
          <vee-error-message class="text-red-600 text-xs" name="title" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
            name="genre"
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
            placeholder="Enter Genre"
            @input="updateUnsavedFlag(true)"
          />
          <vee-error-message class="text-red-600 text-xs" name="genre" />
        </div>
        <div class="flex justify-start items-center gap-2 mt-6">
          <button
            type="submit"
            class="py-1.5 px-3 rounded text-white bg-green-600"
            :disabled="inSubmission"
          >
            Submit
          </button>
          <button
            type="button"
            class="py-1.5 px-3 rounded text-white bg-gray-600"
            @click.prevent="toggleForm"
            :disabled="inSubmission"
          >
            Go Back
          </button>
        </div>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { songsCollection, firebaseStorage } from '../includes/firebase';

export default {
  name: 'CompositionItem',
  props: {
    song: {
      type: Object,
      required: true,
    },
    updateSong: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    removeSong: {
      type: Function,
      required: true,
    },
    updateUnsavedFlag: {
      type: Function,
    },
  },
  data() {
    return {
      showForm: false,
      schema: {
        title: 'required',
        genre: 'alpha_spaces',
      },
      inSubmission: false,
      showAlert: false,
      alertVariant: 'bg-blue-500',
      alertMsg: 'Please wait! Updating the song.',
    };
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    },
    async edit(values) {
      console.log(values);

      this.inSubmission = true;
      this.showAlert = true;
      this.alertVariant = 'bg-blue-500';
      this.alertMsg = 'Please wait! Updating the song...';

      const updatedValues = {
        modifiedName: values.title,
        genre: values.genre,
      };

      try {
        await songsCollection.doc(this.song.id).update({
          ...updatedValues,
        });
      } catch (error) {
        this.alertVariant = 'bg-red-600';
        this.alertMsg = 'Failed! Could not update the song!';
        console.log(error);
        return;
      }

      this.updateSong(this.index, {
        ...updatedValues,
      });
      this.updateUnsavedFlag(false);

      this.inSubmission = false;
      this.alertVariant = 'bg-green-500';
      this.alertMsg = 'Succes! Song updated!';
    },
    async deleteSong() {
      const storageRef = firebaseStorage.ref();
      const songRef = storageRef.child(`songs/${this.song.originalName}`);

      try {
        await songRef.delete();
      } catch (error) {
        console.log(error);
        return;
      }

      try {
        await songsCollection.doc(this.song.id).delete();
      } catch (error) {
        console.log(error);
        return;
      }

      this.removeSong(this.index);
    },
  },
};
</script>

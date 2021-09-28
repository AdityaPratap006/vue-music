<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <!-- Upload -->
        <app-upload :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item
              v-for="(song, idx) in songs"
              :key="song.id"
              :song="song"
              :updateSong="updateSong"
              :index="idx"
              :removeSong="removeSong"
              :updateUnsavedFlag="updateUnsavedFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppUpload from '../components/Upload.vue';
import CompositionItem from '../components/CompositionItem.vue';
import { songsCollection, firebaseAuth } from '../includes/firebase';

export default {
  name: 'Manage',
  components: {
    AppUpload,
    CompositionItem,
  },
  data() {
    return {
      songs: [],
      unsavedFlag: false,
    };
  },
  async created() {
    const snapshot = await songsCollection.where('uid', '==', firebaseAuth.currentUser.uid).get();
    snapshot.forEach((document) => {
      this.addSong(document);
    });
  },
  methods: {
    updateSong(index, values) {
      this.songs[index].modifiedName = values.modifiedName;
      this.songs[index].genre = values.genre;
    },
    removeSong(index) {
      this.songs.splice(index, 1);
    },
    addSong(songDocument) {
      const song = {
        ...songDocument.data(),
        id: songDocument.id,
      };

      this.songs.push(song);
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      next();
    } else {
      // eslint-disable-next-line no-restricted-globals, no-alert
      const leave = confirm('You have unsaved changes. Are you sure you wanna leave?');
      next(leave);
    }
  },
};
</script>

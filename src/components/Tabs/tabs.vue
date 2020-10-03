<template>
  <v-card>
    <v-tabs v-model="tab" fixed-tabs light>
      <v-tab>Home</v-tab>
      <v-tab>Style</v-tab>
    </v-tabs>
    <v-tabs-items :value="tab">
      <v-tab-item>
        <!-- This is the home tab -->
        <Home />
      </v-tab-item>
      <v-tab-item>
        <!-- This is the style tab -->
        <Colour />
        <ChooseFonts />
        <v-btn color="indigo" rounded dark block @click="previewPage()">
          <v-icon>mdi-eye</v-icon>Preview
        </v-btn>
        <br />
        <br />
        <br />
        <br />
      </v-tab-item>
    </v-tabs-items>
    <!-- General spinner controlled from store -->
    <v-overlay :value="this.linksLoaded">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
import Home from "../../views/Home";
import Colour from "../Colour/Colour";
import { mapState } from "vuex";
import ChooseFonts from "../Fonts/chooseFonts";
import router from "../../router";

export default {
  data: () => ({
    tab: null,
  }),
  components: {
    Home,
    Colour,
    ChooseFonts,
  },
  computed: {
    ...mapState(["linksLoaded", "userProfile"]),
  },
  methods: {
    previewPage() {
      router.push("/" + this.userProfile.username);
    },
  },
};
</script>

<style>
</style>
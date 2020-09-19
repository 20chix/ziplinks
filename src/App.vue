<template>
  <v-app>
    <NavBar v-if="currentUser" />
    <NavBarWithoutAuth v-else />
    <v-main>
      <router-view />
    </v-main>
    <v-footer width="100%" style=" bottom:0;" class="font-weight-medium">
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>
          Made with
          <v-icon>fas fa-heart</v-icon>by Hadi
        </strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import NavBarWithoutAuth from "./views/NavBars/NavBarWithoutAuth";
import NavBar from "./views/NavBars/NavBar";
import { mapState } from "vuex";
import firebase from 'firebase';


export default {
  name: "App",

  components: {
    NavBarWithoutAuth,
    NavBar,
  },

  data: () => ({
    //
  }),
  beforeMount() {
    //Initialize firebase analytics
    firebase.analytics();
  },
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>

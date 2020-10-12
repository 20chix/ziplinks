<template>
  <v-app>
    <div v-if="this.showNavBar">
      <NavBar v-if="currentUser " />
      <NavBarWithoutAuth v-else />
    </div>
    <v-main>
      <router-view />
    </v-main>
    <v-footer v-if="this.showFooter" width="100%" style=" bottom:0;" class="font-weight-medium">
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>
          Made with
          <v-icon>fas fa-heart</v-icon> by Hadi
        </strong>
      </v-col>
    </v-footer>

    <!-- <v-footer width="100%" style=" bottom:0;" :color="searchedUser.background_colour" fixed >
      <v-col class="text-center" cols="12">
        <a href="https://www.patreon.com/ziplinks?fan_landing=true" target="_blank"> <strong>
          Sponsor ZipLinks
        </strong>
        </a>
      </v-col>
    </v-footer> -->
  </v-app>
</template>

<script>
import NavBarWithoutAuth from "./components/NavBars/NavBarWithoutAuth";
import NavBar from "./components/NavBars/NavBar";
import { mapState } from "vuex";
import firebase from "firebase";

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
    ...mapState(["currentUser", "showFooter", "showNavBar","searchedUser"]),
  },
};
</script>
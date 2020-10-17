<template>
  <div class="profile" :style="{backgroundColor:searchedUser.background_colour , height:'100%' }">
    <v-flex>
      <center>
        <br />
        <div v-if="this.searchedUser.userProfileImage!= null && this.searchedUser.userExist">
          <v-avatar :size="180" color="grey lighten-4">
            <!-- TODO find a better way to update image from browser cache
            maybe use date and time-->
            <v-img
              v-if="this.searchedUser.userProfileImage != null"
              :src="this.searchedUser.userProfileImage"
              lazy-src="../assets/profileNotSet.png"
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>

            <v-img
              v-else
              src="../assets/profileNotSet.png"
              lazy-src="../assets/profileNotSet.png"
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-avatar>
        </div>
        <br />

        <h1
          v-if="!this.linksLoaded && this.searchedUser.userExist && this.mounted" :style="'font-family:'+ searchedUser.font +';color:'+searchedUser.buttons_colour "
        >@{{searchedUser.username}}</h1>
        <h1 class="display-1" v-else-if="!this.linksLoaded">
          This user
          <strong>doesn't exist</strong>, double check with whoever gave you the link
        </h1>
        <br />
        <v-col cols="12" sm="6" v-for="userLinks in this.userLinks" :key="userLinks.message">
          <v-btn
            :color="searchedUser.buttons_colour"
            class="ml-1"
            block
            x-large
            outlined
            :href="userLinks.linkUrl"
            target="_blank"
            :style="'font-family:'+ searchedUser.font "
          >
            <v-icon left large v-if="userLinks.iconButton == 'Snapchat'">mdi-snapchat</v-icon>
            <v-icon left large v-if="userLinks.iconButton == 'Facebook'">mdi-facebook</v-icon>
            <v-icon left large v-if="userLinks.iconButton == 'Instagram'">mdi-instagram</v-icon>
            <v-icon left large v-if="userLinks.iconButton == 'Twitch'">mdi-twitch</v-icon>
            <v-icon left large v-if="userLinks.iconButton == 'YouTube'">mdi-youtube</v-icon>
            <v-icon left large v-if="userLinks.iconButton == 'Twitter'">mdi-twitter</v-icon>
            <v-icon left large v-if="userLinks.iconButton == 'Linkedin'">mdi-linkedin</v-icon>
            <v-icon left large v-if="userLinks.iconButton == 'Just a normal Link'">mdi-link-variant</v-icon>
            <v-icon left large v-if="userLinks.iconButton == 'Email'">mdi-email</v-icon>
            <v-icon left large v-if="userLinks.iconButton == 'Apple'">mdi-apple</v-icon>
            <v-icon left large v-if="userLinks.iconButton == 'Tik Tok'">fab fa-tiktok</v-icon>
            <v-icon left large v-if="userLinks.iconButton == 'GitHub'">fab fa-github</v-icon>
            <v-icon left large v-if="userLinks.iconButton == 'Reddit'">fab fa-reddit</v-icon>
            <v-icon left large v-if="userLinks.iconButton == 'Google'">fab fa-google</v-icon>
            <v-icon left large v-if="userLinks.iconButton == 'Patreon'">fab fa-patreon</v-icon>
            <v-icon left large v-if="userLinks.iconButton == 'Telegram'">fab fa-telegram</v-icon>
            <v-icon left large v-if="userLinks.iconButton == 'Etsy'">fab fa-etsy</v-icon>
            <span style="margin-left: 5px;">{{ userLinks.nameButton }}</span>
          </v-btn>
        </v-col>

        <!-- <li v-for="userLinks in userLinks" :key="userLinks.message">{{ userLinks.nameButton }}</li> -->
      </center>
    </v-flex>

    <!-- Spinner for loading all this links -->
    <v-overlay :value="this.linksLoaded">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
/* eslint-disable */
import { mapState, mapGetters } from "vuex";
import { store } from "../store";
const fb = require("../firebaseConfig");
import router from "../router/";
import firebase from "firebase";

export default {
  data: () => ({
    mounted: false,
    tempColour: "#FFFFFF",
    tempFont: "",
  }),
  computed: {
    ...mapState([
      "userProfile",
      "currentUser",
      "searchedUser",
      "userLinks",
      "linksLoaded",
    ]),
  },
  methods: {},
  beforeMount() {
    this.$store.commit("setShowFooter", false);
    this.$store.commit("setShowNavBar", false);

    //this.$store.dispatch("incrementViews");

    if (this.searchedUser.background_colour === null) {
      this.tempColour == "#000000";
    } else {
      if (this.searchedUser.background_colour.indexOf("#") > -1) {
        this.tempColour = this.searchedUser.background_colour;
      } else {
        this.tempColour = "#" + this.searchedUser.background_colour;
      }
    }
  },
  mounted() {
    this.mounted = true;
    this.$store.commit("setSearchedUserUsername", this.$route.params.id);
    this.$store.dispatch("fetchUserFromLinkOrSearchBar");

    
  },
  created() {
    firebase.analytics().logEvent("profile",{
      name: this.searchedUser.username
    } );
  },
    //insert the following code for vue-meta to work
    metaInfo() {
        return {
            title: `${this.searchedUser.username}`,
            meta: [
                { name: 'description', content: this.searchedUser.username + ' ZipLinks profile'},
                { property: 'og:title', content: this.searchedUser.username},
                { property: 'og:site_name', content: 'ZipLinks'},
                { property: 'og:description', content: this.searchedUser.username + ' ZipLinks profile'},
                { property: 'og:type', content: 'profile'},
                { property: 'og:url', content: 'https://ziplinks.me/' + this.searchedUser.username},
                { property: 'og:image', content: this.searchedUser.userProfileImage }    
            ]
        }
    },
  watch: {
    // Check if the route is been called
    $route(to, from) {
      // react to route changes...
      // console.log("Component changed " + this.currentUser.uid);
      //This should never change if there you search for a different user
      // this.$store.dispatch('clearSearchedUserData')
      this.$store.commit("setSearchedUserUsername", this.$route.params.id);
      this.$store.dispatch("fetchUserFromLinkOrSearchBar");
      //this.$store.dispatch("getUserStatus");
      // console.log("My bool watch  " + this.getSearchedUserFollowBoolean);
    },
  },
};
</script>
<style scoped>
.icon_margin {
  margin-left: 1000px;
}
</style>


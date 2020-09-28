<template>
  <nav id="navbar">
    <v-app-bar class="white" flat app clipped-left>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-toolbar-title class="font-weight-bold">
        <router-link to="/" class="black--text" style="text-decoration: none">
          <v-avatar size="45px">
            <v-img contain src="../../assets/ziplinks_logo.png" transition="scale-transition" />
          </v-avatar> Zip Links
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn large depressed color="white" @click="logout()">
        <v-icon size="25">mdi-logout</v-icon>Logout
      </v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
/* eslint-disable */
const fb = require("../../firebaseConfig");
export default {
  data: () => ({}),

  methods: {
    logout() {
      fb.auth
        .signOut()
        .then(() => {
          this.$store.dispatch("clearData");
          this.$router.push("/landing");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
#navbar {
  .active-item {
    .v-list-item__icon {
      color: #bf8975 !important;
    }
  }
  .v-navigation-drawer__border {
    width: 0 !important;
  }

  .search {
    padding-top: 2%;
  }

  .vuebar-element {
    height: 250px;
    width: 100%;
    max-width: 500px;
    background: #dfe9fe;
  }

  .vb > .vb-dragger {
    z-index: 5;
    width: 10px;
    right: 0;
  }

  .vb > .vb-dragger > .vb-dragger-styler {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: rotate3d(0, 0, 0, 0);
    transform: rotate3d(0, 0, 0, 0);
    -webkit-transition: background-color 100ms ease-out, margin 100ms ease-out,
      height 100ms ease-out;
    transition: background-color 100ms ease-out, margin 100ms ease-out,
      height 100ms ease-out;

    margin: 5px 5px 5px 0;
    border-radius: 20px;
    height: calc(100% - 10px);
    display: block;
  }

  .v-navigation-drawer__content:hover .vb > .vb-dragger > .vb-dragger-styler {
    width: 10px;
    background-color: #e0e0e0;
  }

  .vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244, 0.3);
    background-color: rgba(255, 255, 255, 0.3);
  }

  .vb > .vb-dragger:hover > .vb-dragger-styler {
    margin: 0px;
    width: 10px;
  }

  .vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244, 0.5);
    margin: 0px;
    height: 100%;
  }

  .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244, 0.5);
  }
}
</style>

<template>
  <v-app>
    <NavBar v-if="currentUser" />
    <NavBarWithoutAuth v-else />
    <v-main>
           <router-view />

    </v-main>
  </v-app>
</template>

<script>
import NavBarWithoutAuth from "./views/NavBars/NavBarWithoutAuth";
import NavBar from "./views/NavBars/NavBar";
import { mapState } from "vuex";

export default {
  name: "App",

  components: {
    NavBarWithoutAuth,
    NavBar
  },

  data: () => ({
    //
  }),
  
  beforeMount(){
    //
  },
      computed: {
    ...mapState(["currentUser"])
  },

};
</script>

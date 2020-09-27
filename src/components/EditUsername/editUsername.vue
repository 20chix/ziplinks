<template>
  <v-col cols="12" sm="6">
    <v-text-field
      block
      prepend-icon="fas fa-at"
      label="Edit your username"
      large
      v-model="tempUsername"
    >
      <template v-slot:prepend></template>
      <template v-slot:append-outer>
        <v-btn @click="editUsername()">
          <v-icon left>fas fa-edit</v-icon>Update
        </v-btn>
      </template>
    </v-text-field>
  </v-col>
</template>

<script>
import { mapState } from "vuex";
import { store } from "../../store";

export default {
  name: "editUsername",
  data: () => ({
    tempUsername: ""
    
  }),
    computed: {
    ...mapState(["userProfile"]),
  },
  beforeMount(){
    this.tempUsername = this.userProfile.username 
  },
  methods:{
    editUsername(){
    
    store.dispatch("editUsername", this.tempUsername);

    }
  }
};
</script>

<style>
</style>
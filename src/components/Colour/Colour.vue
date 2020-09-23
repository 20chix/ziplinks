<template>
  <v-col cols="12" sm="6">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        prepend-icon="fas fa-fill-drip"
        label="Hex value of background colour, i.e. #7851A9"
        class="ma-1"
        :rules="colour"
        v-model="tempColour"
      >
        <template v-slot:append-outer>
          <v-btn @click="editUsername()" :disabled="!valid">
            <v-icon left>fas fa-edit</v-icon>Update
          </v-btn>
        </template>
      </v-text-field>
      <p class="subtitle-2 text-left">
        If you not sure about the hex value go to
        <a
          href="https://www.color-hex.com/"
          target="_blank"
        >this site</a> and choose a colour
      </p>
    </v-form>
  </v-col>
</template>

<script>
import { mapState } from "vuex";
import { store } from "../../store";

export default {
  name: "editUsername",
  data: () => ({
    tempColour: "",
    valid: false,
    colour: [
      (v) => !!v || "Colour required",
      (v) => (v && v.includes("#")) || "Must contain # at the beginning ",
    ],
  }),
  computed: {
    ...mapState(["userProfile"]),
  },
  beforeMount() {
    this.tempColour = this.userProfile.background_colour;

    if (this.tempColour == null) {
      this.tempColour = "#000000";
    }
    console.log("Colour " + this.tempColour);
  },
  methods: {
    editUsername() {
      store.dispatch("addUpdateColour", this.tempColour);
    },
  },
};
</script>
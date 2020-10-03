<template>
  <v-col cols="12" sm="6">
    <br />

    <v-card class="mx-auto" outlined>
      <v-card-text>
        <div class="display-1 text--primary">Background colour</div>
      </v-card-text>
      <v-form ref="form" v-model="validBackgroundColour" lazy-validation>
        <v-container>
          <v-text-field
            prepend-icon="fas fa-fill-drip"
            label="Hex value of background colour, i.e. #7851A9"
            class="ma-1"
            :rules="colour"
            v-model="tempColour"
          >
            <template v-slot:append-outer>
              <v-btn @click="editBackgroundColour()" :disabled="!validBackgroundColour">
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
        </v-container>
      </v-form>
    </v-card>
    <br />
    <v-card class="mx-auto" outlined>
      <v-card-text>
        <div class="display-1 text--primary">Buttons colour</div>
      </v-card-text>
      <v-form ref="form" v-model="validButtonsForm" lazy-validation>
        <v-container>
          <v-text-field
            prepend-icon="fas fa-fill-drip"
            label="Hex value of buttons colour, i.e. #7851A9"
            class="ma-1"
            :rules="colour"
            v-model="tempButtonsColour"
          >
            <template v-slot:append-outer>
              <v-btn @click="editButtonsColour()" :disabled="!validButtonsForm">
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
        </v-container>
      </v-form>
    </v-card>
    <br>
  </v-col>
</template>

<script>
import { mapState } from "vuex";
import { store } from "../../store";

export default {
  name: "editUsername",
  data: () => ({
    tempColour: "",
    tempButtonsColour: "",
    validBackgroundColour: false,
    validButtonsForm: false,
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
      this.tempColour = "#FFFFFF";
    }
    this.tempButtonsColour = this.userProfile.buttons_colour;
    if (this.tempButtonsColour == null) {
      this.tempButtonsColour = "#FFFFFF";
    }
    console.log(this.tempButtonsColour);
  },
  methods: {
    editBackgroundColour() {
      store.dispatch("addUpdateBackgroundColour", this.tempColour);
    },
    editButtonsColour() {
      store.dispatch("addUpdateButtonsColour", this.tempButtonsColour);
    }
  },
};
</script>
<template>
  <v-col cols="12" sm="6">
    <v-card class="mx-auto" outlined>
      <v-card-text>
        <div class="display-1 text--primary">Font</div>
      </v-card-text>
      <v-form ref="form" lazy-validation>
        <v-container>
          <p class="subtitle-2 text-left">
            Select a font from the list below. This will apply to all your
            buttons.
            <br />
            <br />
            Your current font is {{ radios || "null" }}
          </p>
          <v-radio-group v-model="radios">
            <v-radio label="Default" value="Default"></v-radio>
            <v-radio
              style="font-family: 'Bangers'"
              label="Bangers"
              value="Bangers"
            ></v-radio>
            <v-radio
              style="font-family: 'Lobster'"
              label="Lobster"
              value="Lobster"
            ></v-radio>
            <v-radio
              style="font-family: 'Dancing Script'"
              label="Dancing Script"
              value="Dancing Script"
            ></v-radio>
            <v-radio
              style="font-family: 'Architects Daughter'"
              label="Architects Daughter"
              value="Architects Daughter"
            ></v-radio>
            <v-radio
              style="font-family: 'Pacifico'"
              label="Pacifico"
              value="Pacifico"
            ></v-radio>
          </v-radio-group>
          <v-btn @click="editFontSelection()" block color="primary">
            <v-icon left>fas fa-edit</v-icon>Save
          </v-btn>
        </v-container>
      </v-form>
    </v-card>
    <br />
  </v-col>
</template>

<script>
import { store } from "../../store";
import { mapState } from "vuex";

export default {
  name: "chooseFonts",
  data() {
    return {
      radios: "Default",
    };
  },
  methods: {
    editFontSelection() {
      store.dispatch("addUpdateFont", this.radios);
    },
  },
  beforeMount() {
    if (this.searchedUser.font != "" && this.searchedUser.font != null) {
      this.radios = this.searchedUser.font;
    } else {
      this.radios = "Default";
    }
  },
  computed: {
    ...mapState(["searchedUser"]),
  },
};
</script>

<style>
</style>
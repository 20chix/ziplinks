<template>
  <center>
    <v-row>
      <v-col cols="12" sm="12">
        <v-text-field
          :prepend-icon="iconName"
          :label="labelName"
          large
          v-model="tempValueTextField"
        >
          <template v-slot:prepend></template>
          <template v-slot:append-outer>
            <v-btn @click="addSocialProfile()">
              <v-icon left>fas fa-plus</v-icon>Add
            </v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
  </center>
</template>

<script>
import { store } from "../../../store";

export default {
  name: "addSocialProfile",

  data: () => ({
    tempValueTextField: "",
    tempSocialLink: {
      linkUrl: "",
      nameButton: "",
      iconButton: "",
      docId: "",
    },
  }),
  props: ["labelName", "iconName", "valueTextfield"],
  methods: {
    addSocialProfile() {
      if (this.iconName == "mdi-instagram") {
        this.tempSocialLink.linkUrl =
          "http://instagram.com/" + this.tempValueTextField;
        this.tempSocialLink.iconButton = "Instagram";
        this.tempSocialLink.nameButton = "Instagram";
      }
      if (this.iconName == "mdi-facebook") {
        this.tempSocialLink.linkUrl =
          "http://facebook.com/" + this.tempValueTextField;
        this.tempSocialLink.iconButton = "Facebook";
        this.tempSocialLink.nameButton = "Facebook";
      }
      if (this.iconName == "mdi-twitter") {
        this.tempSocialLink.linkUrl =
          "http://twitter.com/" + this.tempValueTextField;
        this.tempSocialLink.iconButton = "Twitter";
        this.tempSocialLink.nameButton = "Twitter";
      }
      if (this.iconName == "fab fa-tiktok") {
        this.tempSocialLink.linkUrl =
          "http://www.tiktok.com/@" + this.tempValueTextField;
        this.tempSocialLink.iconButton = "Tik Tok";
        this.tempSocialLink.nameButton = "Tik Tok";
      }
      store.dispatch("addSocialProfile", this.tempSocialLink);
      this.tempSocialLink = {}
      this.tempValueTextField = ""
    },
  },
};
</script>

<style>
</style>
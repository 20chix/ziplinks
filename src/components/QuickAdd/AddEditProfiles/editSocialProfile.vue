<template>
  <v-row>
    <v-col cols="12" sm="12">
      <v-text-field
        block
        :prepend-icon="iconName"
        :label="labelName"
        large
        v-model="valueTextfield"
      >
        <template v-slot:prepend></template>
        <template v-slot:append-outer>
          <v-btn text  @click="updateSocialMediaProfile(valueBeforeFilter, valueTextfield)">
            <v-icon left>fas fa-edit</v-icon>Update
          </v-btn>
          <v-btn color="red" fab x-small dark @click="deleteSocialMediaProfile()">
            <v-icon>fas fa-trash</v-icon>
          </v-btn>
        </template>
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import { store } from "../../../store";

export default {
  name: "editSocialProfile",

  data: () => ({
    tempValueTextField: "",
    tempSocialLink: {
      linkUrl: "",
      nameButton: "",
      iconButton: "",
      docId: "",
    },
  }),

  props: [
    "labelName",
    "iconName",
    "valueTextfield",
    "valueBeforeFilter",
    "docId",
    "index",
  ],
  methods: {
    //Twitter
    //Tik Tok
    updateSocialMediaProfile(valueBeforeFilter, tempValueTextField) {
      if (this.iconName == "mdi-instagram") {
        this.tempSocialLink.linkUrl =
          "http://instagram.com/" + tempValueTextField;
        this.tempSocialLink.iconButton = "Instagram";
        this.tempSocialLink.nameButton = "Instagram";
      }
      if (this.iconName == "mdi-facebook") {
        this.tempSocialLink.linkUrl =
          "http://facebook.com/" + tempValueTextField;
        this.tempSocialLink.iconButton = "Facebook";
        this.tempSocialLink.nameButton = "Facebook";
      }
      if (this.iconName == "mdi-twitter") {
        this.tempSocialLink.linkUrl =
          "http://twitter.com/" + tempValueTextField;
        this.tempSocialLink.iconButton = "Twitter";
        this.tempSocialLink.nameButton = "Twitter";
      }
      if (this.iconName == "fab fa-tiktok") {
        this.tempSocialLink.linkUrl =
          "http://www.tiktok.com/@" + tempValueTextField;
        this.tempSocialLink.iconButton = "Tik Tok";
        this.tempSocialLink.nameButton = "Tik Tok";
      }
      this.tempSocialLink.docId = this.docId;
      store.dispatch("updateSocialProfile", this.tempSocialLink);
    },
    deleteSocialMediaProfile(){
      var tempIndex = this.index;
      var tempDocId = this.docId
      var payload = { tempIndex, tempDocId }
      store.dispatch("deleteSocialMediaProfile", payload);
      //console.log("index(edit comp): " + this.index)
    }
  },
};
</script>

<style>
</style>
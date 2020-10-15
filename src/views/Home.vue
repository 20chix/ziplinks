<template>
  <div class="home">
    <br />
    <div class="text-center">
      <h1 class="display-1">@{{ userProfile.username }}</h1>
      <v-btn class="mx-2" fab dark small color="primary" @click="showEditUsername = !showEditUsername">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <br>
      <center v-if="showEditUsername">
        <EditUsername />
      </center>
      <br />
    </div>

    <div class="text-center">
      <div v-if="this.userProfile.profileImage != null">
        <v-avatar
          :size="150"
          :max-height="150"
          :max-width="150"
          :min-height="150"
          :min-width="150"
          color="grey lighten-4"
        >
          <v-img
            :src="userProfile.profileImage"
            lazy-src="../assets/profileNotSet.png"
            class="grey lighten-2"
          />
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-avatar>
      </div>
      <v-btn class="ma-2" color="primary" @click="onPickFile" rounded>
        <v-icon>mdi-pencil</v-icon>Change Image
      </v-btn>

      <!-- Link copy component -->
      <v-container>
        <v-row>
          <v-col cols="12">
            <center>
              <v-tooltip v-model="showToolTip" top>
                <template v-slot:activator="{ on, attrs }">
                  <span icon v-bind="attrs" v-on="on"></span>
                </template>
                <span>Copied!</span>
              </v-tooltip>
            </center>
            <v-text-field
              class="ma-4"
              label="Here is your link "
              outlined
              rounded
              color="orange"
              large
              readonly
              :value="'ziplinks.me/' + userProfile.username"
            >
              <template v-slot:prepend>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                  </template>
                  Copy this link and share it with anyone
                </v-tooltip>
              </template>
              <template v-slot:append-outer>
                <v-btn
                  v-clipboard:copy="'ziplinks.me/' + userProfile.username"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                >
                  <v-icon left>fas fa-copy</v-icon>Copy
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <center>
        <QuickAdd :userLinks="this.userLinks" />
      </center>
      <!-- Need to have this in order to pick the image  -->
      <v-layout row>
        <v-flex xs12 lg6 offset-sm3>
          <input
            type="file"
            style="display: none"
            ref="fileInput"
            accept="image/*"
            @change="onFilePicked"
          />
        </v-flex>
      </v-layout>
    </div>

    <center>
      <v-col
        cols="12"
        sm="6"
        v-for="_userLinks in userLinks"
        :key="_userLinks.message"
      >
        <!-- Only show links that are not int quick link list -->
        <v-card
          class="mx-auto"
          outlined
          v-if="
            !_userLinks.linkUrl.includes('instagram.com') &&
            !_userLinks.linkUrl.includes('facebook.com') &&
            !_userLinks.linkUrl.includes('twitter.com') &&
            !_userLinks.linkUrl.includes('tiktok.com')
          "
        >
          <v-col cols="12" sm="12">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                :rules="nameRules"
                v-model="_userLinks.nameButton"
                filled
                label="Name this button"
                clearable
              ></v-text-field>
              <v-text-field
                :rules="linkRules"
                v-model="_userLinks.linkUrl"
                @keydown.space.prevent
                filled
                label="Paste your link here"
                clearable
              ></v-text-field>
              <v-select
                v-model="_userLinks.iconButton"
                :items="items"
                label="Icon for your button (optional)"
                required
              ></v-select>

              <v-container grid-list-xl>
                <v-layout row justify-space-around>
                  <v-flex md8>
                    <v-btn
                      :disabled="!valid"
                      color="primary"
                      class="mr-4"
                      block
                      @click="overrwriteLink(_userLinks)"
                    >
                      <v-icon>mdi-pencil</v-icon>Update this link
                    </v-btn>
                  </v-flex>
                  <v-flex md1>
                    <v-btn icon color="red" @click="deleteLink(_userLinks)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-col>
        </v-card>
      </v-col>
    </center>
    <center>
      <v-col cols="12" sm="6">
        <v-card class="mx-auto" outlined v-if="this.showForm">
          <v-card-text>
            <div class="display-1 text--primary">Let's add this link!!!</div>
          </v-card-text>
          <v-col cols="12" sm="12">
            <v-form ref="form" v-model="validAddLink" lazy-validation>
              <v-text-field
                :rules="nameRules"
                v-model="link.nameButton"
                filled
                label="Name this button"
                clearable
              ></v-text-field>
              <v-text-field
                :rules="linkRules"
                v-model="link.linkUrl"
                @keydown.space.prevent
                filled
                label="Paste your link here"
                clearable
              ></v-text-field>
              <v-select
                v-model="link.iconButton"
                :items="items"
                label="Icon for your button (optional)"
                required
              ></v-select>
              <v-btn
                :disabled="!validAddLink"
                color="primary"
                class="mr-4"
                block
                @click="addLink()"
              >
                <v-icon>mdi-plus</v-icon>Add this link
              </v-btn>
            </v-form>
          </v-col>
        </v-card>
      </v-col>

      <v-container grid-list-xl>
        <v-layout row justify-space-around>
          <v-flex md6>
            <v-btn
              color="teal"
              outlined
              rounded
              @click="
                () => {
                  this.showForm = !this.showForm;
                }
              "
            >
              <v-icon>mdi-plus</v-icon>Add another link
            </v-btn>
          </v-flex>
          <v-flex md4>
            <v-btn color="indigo" rounded dark @click="previewPage">
              <v-icon>mdi-eye</v-icon>Preview
            </v-btn>
          </v-flex>
        </v-layout>

        <br />
        <br />
        <br />
      </v-container>
    </center>
    <!-- Spinner for loading all this links -->
    <v-overlay :value="this.spinnerBooleanCheck">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <!-- Spinner for loading the image profile -->
    <v-overlay :value="this.imageLoaded">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <!-- General spinner controlled from store -->
    <v-overlay :value="this.linksLoaded">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
import { store } from "../store";
import router from "../router/";
const fb = require("../firebaseConfig");
import firebase from "firebase/app";
import QuickAdd from "../components/QuickAdd/quickAdd";
import EditUsername from "../components/EditUsername/editUsername";
import Colour from "../components/Colour/Colour";

export default {
  name: "Home",
  data: () => ({
    showForm: true,
    showEditUsername: false,
    lazy: false,
    valid: false,
    validAddLink: true,
    deleteDialog: false,
    spinnerBooleanCheck: false,
    name: "",
    nameRules: [(v) => !!v || "Name is required"],
    email: "",
    linkRules: [
      (v) => !!v || "Link is required",
      (v) => (v && v.includes(".")) || "Link must contain a dot ",
    ],

    select: null,
    items: [
      "None of them",
      "Apple",
      "Facebook",
      "GitHub",
      "Google",
      "Instagram",
      "Email",
      "Etsy",
      "Linkedin",
      "Patreon",
      "Reddit",
      "Snapchat",
      "Telegram",
      "Tik Tok",
      "Twitch",
      "Twitter",
      "YouTube",
      "Just a normal Link",
    ],
    checkbox: false,
    link: {
      linkUrl: "",
      nameButton: "",
      iconButton: "",
    },

    message: "Copy These Text",
    showToolTip: false,
    tab: null,
    tempImageProfile: null,
  }),
  beforeMount() {
    this.$store.commit("setShowFooter", true);
    this.$store.commit("setShowNavBar", true);
  },
  created() {
    console.log(this.currentUser.uid);
  },
  components: {
    QuickAdd,
    EditUsername,
    Colour,
  },
  computed: {
    ...mapState([
      "userProfile",
      "currentUser",
      "imageLoaded",
      "linksLoaded",
      "userLinks",
      "imageCropped",
    ]),
  },
  methods: {
    onCopy() {
      //  alert("You just copied: " + e.text);
      this.showToolTip = !this.showToolTip;
    },
    onError() {
      alert("Failed to copy texts");
    },
    addLink() {
      //Add http if the link doesn't cotain one
      if (
        !this.link.linkUrl.includes("http://") &&
        !this.link.linkUrl.includes("https://")
      ) {
        this.link.linkUrl = "http://" + this.link.linkUrl;
      }

      this.spinnerBooleanCheck = true;
      firebase
        .firestore()
        .collection("users/")
        .doc(this.currentUser.uid)
        .collection("links")
        //.doc(this.link.nameButton)
        .add(this.link)
        .then((docRef) => {
          //console.log("Successfully pushed to firebase " + docRef.id);
          firebase
            .firestore()
            .collection("users/")
            .doc(this.currentUser.uid)
            .collection("links")
            .doc(docRef.id)
            .update({
              //Add the doc id into firebase child
              docId: docRef.id,
            })
            .then(() => {
              //Rest the form
              //this.reset();
              //Add the object into array so i can show in the for loop of cards links
              //  this.reset();
              // Remove empty form from the view
              this.spinnerBooleanCheck = false;
              this.showForm = false;
              this.userLinks.push(this.link);
              router.push("/" + this.userProfile.username);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteLink(_userLinks) {
      let self = this;
      firebase
        .firestore()
        .collection("users/")
        .doc(self.currentUser.uid)
        .collection("links")
        .doc(_userLinks.docId)
        .delete()
        .then(() => {
          //console.log("Post successfully deleted");
          self.deleteDialog = false;
          self.userLinks.forEach(function (arrayItem, index) {
            if (arrayItem.docId === _userLinks.docId) {
              self.userLinks.splice(index, 1);
            }
          });
          // this.deleteDialog = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    overrwriteLink(_userLinks) {
      if (
        !_userLinks.linkUrl.includes("http://") &&
        !_userLinks.linkUrl.includes("https://")
      ) {
        _userLinks.linkUrl = "http://" + _userLinks.linkUrl;
        console.log("Link override");
      }
      this.spinnerBooleanCheck = true;
      firebase
        .firestore()
        .collection("users/")
        .doc(this.currentUser.uid)
        .collection("links")
        .doc(_userLinks.docId)
        .set(_userLinks)
        .then(() => {
          // console.log("Successfully pushed to firebase");
          this.spinnerBooleanCheck = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    reset() {
      this.$refs.form.reset();
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    previewPage() {
      router.push("/" + this.userProfile.username);
    },
    onFilePicked(event) {
      this.$store.commit("setLoadingImageChange", true);

      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];

      // passed user id into dummy variable in order to refere image profile
      var tempUser = this.currentUser;

      var pathReference = fb.storage
        .ref("profileImages/" + this.currentUser.uid)
        .put(this.image);

      // Listen for state changes, errors, and completion of the upload.
      pathReference.on(
        "state_changed", // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");

          if (progress == 100) {
            setTimeout(() => {
              // Upload completed successfully, now we can get the download URL
              store.dispatch("updateImageRef");
            }, 3000);
          }
        },
        function (error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          console.log(error);
        }
      );
    },
  },
};
</script>

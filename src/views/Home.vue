<template>
  <div class="home">
    <div class="text-center">
      <h1 class="display-1">@{{userProfile.username}}</h1>
      <br />
      <!-- Add edit button on next feature -->
      <!-- <v-btn class="ma-2" outlined small fab color="indigo">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>-->
    </div>

    <div class="text-center">
      <div v-if="userProfile.profileImage!= null">
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
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-avatar>
      </div>
      <v-btn class="ma-2" color="primary" @click="onPickFile" rounded>
        <v-icon>mdi-pencil</v-icon>Change Image
      </v-btn>
      <!-- For debugging purpose -->
      <!-- <p>{{this.imageLoaded}}</p>
      <p>{{this.spinnerBooleanCheck}}</p> -->

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
      <v-col cols="12" sm="6" v-for="_userLinks in userLinks" :key="_userLinks.message">
        <!-- <li v-for="userLinks in userLinks" :key="userLinks.message">{{ userLinks.nameButton }}</li> -->

        <v-card class="mx-auto" outlined>
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
            <v-btn color="teal" outlined rounded @click="()=>{this.showForm = !this.showForm}">
              <v-icon>mdi-plus</v-icon>Add another link
            </v-btn>
          </v-flex>
          <v-flex md4>
            <v-btn color="indigo" rounded dark @click="previewPage">
              <v-icon>mdi-eye</v-icon>Preview
            </v-btn>
          </v-flex>
        </v-layout>
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
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import { store } from "../store";
import router from "../router/";
const fb = require("../firebaseConfig");
import firebase from "firebase";

export default {
  name: "Home",
  data: () => ({
    showForm: false,
    valid: false,
    validAddLink: true,
    deleteDialog: false,
    spinnerBooleanCheck: false,
    name: "",
    nameRules: [(v) => !!v || "Name is required"],
    email: "",
    linkRules: [
      (v) => !!v || "Link is required",
      (v) => (v && v.includes("http")) || "Link must contain http ",
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
      "Linkedin",
      "Reddit",
      "Snapchat",
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
    userLinks: [],
  }),

  components: {
    //  HelloWorld
  },
  beforeMount() {
    this.fetchLinks();
  },

  watch: {},
  computed: {
    ...mapState(["userProfile", "currentUser", "imageLoaded"]),
  },
  methods: {
    addLink() {
      this.spinnerBooleanCheck = true;
      this.$refs.form.validate();
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

    fetchLinks() {
      let self = this;
      self.spinnerBooleanCheck = true;
      this.$store.dispatch("fetchUserProfile");
      // console.log("User home");
      // console.log(this.userProfile);

      firebase
        .firestore()
        .collection("users/" + this.currentUser.uid + "/links")
        .get()
        .then(function (querySnapshot) {
          if (!querySnapshot.empty) {
            querySnapshot.forEach(function (doc) {
              // self.temp2Object ==  doc.data();
             // console.log(doc.data());
              self.userLinks.push(doc.data());
              self.spinnerBooleanCheck = false;
            });
          } else {
            self.spinnerBooleanCheck = false;
          }
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
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
        },
        function (error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          console.log(error);
        },
        function () {
          // Upload completed successfully, now we can get the download URL
          pathReference.snapshot.ref
            .getDownloadURL()
            .then(function (downloadURL) {
              //console.log("File available at", downloadURL);
              self.imageStorageUrl = downloadURL;

             // console.log("File available at", downloadURL);
             // var currentDate = new Date();
             // console.log("image url plus date " + downloadURL + currentDate);
              self.spinnerBooleanCheck = false;
              fb.usersCollection
                .doc(tempUser.uid)
                .update({
                  profileImage: downloadURL,
                })
                .then(function () {
                  //console.log("Document successfully updated!");
                  store.dispatch("fetchUserProfile");
                })
                .then(function () {
                 // console.log("Document successfully updated!");

                  store.commit("setLoadingImageChange", false);
                })
                .catch(function (error) {
                  // The document probably doesn't exist.
                  console.error("Error updating document: ", error);
                });
            });
        }
      );
    },
  },
};
</script>

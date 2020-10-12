<template>
  <v-container fluid>
    <!-- TODO look into displaying errors with vuetify and state-->
    <!-- <v-layout row v-if="error">
          <v-flex xs12 sm6 offset-sm3>
            <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
          </v-flex>
    </v-layout>-->
    <!-- TODO look into this, so far it works but it's a shit way to do it -->
    <!-- <transition name="fade">
      <div v-if="performingRequest" class="loading">
        <p>Loading...</p>
      </div>
    </transition>-->

    <v-layout row justify-center>
      <v-flex xs10 order-lg2>
        <v-card>
          <v-card-text>
            <v-container>
              <div
                :class="{
                  'signup-form': !showLoginForm && !showForgotPassword,
                }"
              >
                <br />
                <form v-if="showLoginForm" @submit.prevent>
                  <center>
                    <h1>Log in</h1>
                  </center>
                  <br />
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        name="email"
                        label="Mail"
                        id="email"
                        v-model.trim="loginForm.email"
                        @keydown.space.prevent
                        type="email"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        name="password"
                        label="Password"
                        id="password"
                        v-model.trim="loginForm.password"
                        type="password"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-btn
                        type="submit"
                        color="primary"
                        block
                        large
                        @click="login"
                        >Log in</v-btn
                      >
                    </v-flex>
                  </v-layout>
                </form>

                <form
                  v-if="!showLoginForm && !showForgotPassword"
                  @submit.prevent
                >
                  <br />
                  <center>
                    <h1>Sign up</h1>
                  </center>
                  <br />
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        data-cy="login-username"
                        name="username"
                        label="Username"
                        id="username"
                        v-model.trim="signupForm.username"
                        @keydown.space.prevent
                        type="name"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        data-cy="login-email"
                        name="email"
                        label="Mail"
                        id="email"
                        v-model.trim="signupForm.email"
                        @keydown.space.prevent
                        type="email"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        data-cy="login-password"
                        name="password"
                        label="Password"
                        id="password"
                        v-model.trim="signupForm.password"
                        type="password"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-btn
                        type="submit"
                        color="primary"
                        block
                        large
                        @click="signup"
                        >Sign up</v-btn
                      >
                    </v-flex>
                  </v-layout>
                </form>
                <transition name="fade">
                  <div v-if="errorMsg !== ''" class="error-msg">
                    <p>{{ errorMsg }}</p>
                  </div>
                </transition>
              </div>

              <div v-if="!showLoginForm">
                <br />
                <center>
                  <p>
                    Already have an account?
                    <a @click="toggleForm">Login</a>
                  </p>
                </center>
              </div>
              <div v-else>
                <br />
                <center>
                  <p>
                    New to Glance Profile
                    <a @click="toggleForm">Sign up</a>
                  </p>
                </center>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <Footer />
    <!-- Spinner for loading the image profile -->
    <v-overlay :value="this.performingRequest">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
/* eslint-disable */
const fb = require("../../firebaseConfig");
import firebase from "firebase";

export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      signupForm: {
        username: "",
        title: "",
        email: "",
        password: "",
      },
      passwordForm: {
        email: "",
      },
      showLoginForm: false,
      showForgotPassword: false,
      passwordResetSuccess: false,
      performingRequest: false,
      errorMsg: "",
    };
  },
  beforeMount() {
    firebase.analytics().logEvent("signup_page_loaded");
  },
  methods: {
    toggleForm() {
      this.errorMsg = "";
      this.showLoginForm = !this.showLoginForm;
    },
    togglePasswordReset() {
      if (this.showForgotPassword) {
        this.showLoginForm = true;
        this.showForgotPassword = false;
        this.passwordResetSuccess = false;
      } else {
        this.showLoginForm = false;
        this.showForgotPassword = true;
      }
    },
    login() {
      firebase.analytics().logEvent("login_button_pressed");
      this.performingRequest = true;
      //console.log("user email " + this.loginForm.email);

      fb.auth
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then((user) => {
          console.log(user);
          this.$store.commit("setCurrentUser", user.user);
          this.$store.dispatch("fetchUserProfile");
          this.performingRequest = false;
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
          this.performingRequest = false;
          this.errorMsg = err.message;
        });
    },
    signup() {
      firebase.analytics().logEvent("signup_button_pressed");

      this.errorMsg = "";
      this.performingRequest = true;

      if (this.signupForm.username.indexOf(" ") >= 0) {
        this.performingRequest = false;
        // It has any kind of whitespace
        this.errorMsg = "Please delete any white spaces";
      } else {
        //console.log("user username " + this.signupForm.username);

        let self = this;
        fb.usersCollection
          .where("username_lowercase", "==", self.signupForm.username)
          .get()
          .then(function (querySnapshot) {
            if (querySnapshot.size >= 1) {
              console.log("User Already exist choose another one");
              self.errorMsg =
                "The username is already in use by another account.";
              console.log(querySnapshot);
              self.performingRequest = false;
            } else {
              fb.auth
                .createUserWithEmailAndPassword(
                  self.signupForm.email,
                  self.signupForm.password
                )
                .then((user) => {
                  self.$store.commit("setCurrentUser", user.user);
                  var file = require("../../assets/profileNotSet.png"); // use the Blob or File API
                  var pathReference = fb.storage
                    .ref("profileImages/" + user.user.uid)
                    .putString("https://firebasestorage.googleapis.com/v0/b/ziplinks-c8231.appspot.com/o/profileNotSet_200x200.png?alt=media&token=230f8b72-af01-4548-839e-e49c42a2778d");

                  // user.user.sendEmailVerification();
                  // create user obj
                  fb.usersCollection
                    .doc(user.user.uid)
                    .set({
                      username: self.signupForm.username,
                      username_lowercase: self.signupForm.username.toLowerCase(),
                      email: self.signupForm.email,
                      profileImage:
                        "https://firebasestorage.googleapis.com/v0/b/ziplinks-c8231.appspot.com/o/profileNotSet_200x200.png?alt=media&token=230f8b72-af01-4548-839e-e49c42a2778d",
                    })
                    .then(() => {
                      self.$store.dispatch("fetchUserProfile");
                      self.performingRequest = false;
                      self.$router.push("/");
                    })
                    .catch((err) => {
                      console.log(err);
                      self.performingRequest = false;
                      self.errorMsg = err.message;
                    });
                })
                .catch((err) => {
                  console.log(err);
                  self.performingRequest = false;
                  self.errorMsg = err.message;
                });
            }
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          });
      }
    },
    resetPassword() {
      this.performingRequest = true;

      fb.auth
        .sendPasswordResetEmail(this.passwordForm.email)
        .then(() => {
          this.performingRequest = false;
          this.passwordResetSuccess = true;
          this.passwordForm.email = "";
        })
        .catch((err) => {
          console.log(err);
          this.performingRequest = false;
          this.errorMsg = err.message;
        });
    },
  },
};
</script>

<template>
  <div>
    <a
      href="https://github.com/20chix/ziplinks"
      class="github-corner"
      aria-label="View source on GitHub"
      ><svg
        width="80"
        height="80"
        viewBox="0 0 250 250"
        style="
          fill: #151513;
          color: #fff;
          position: absolute;
          top: 0;
          border: 0;
          right: 0;
        "
        aria-hidden="true"
      >
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
        <path
          d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
          fill="currentColor"
          style="transform-origin: 130px 106px"
          class="octo-arm"
        ></path>
        <path
          d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
          fill="currentColor"
          class="octo-body"
        ></path></svg
    ></a>
    <br />
    <v-container>
      <v-layout>
        <v-flex>
          <center>
            <br />
            <h1 class="display-3" data-cy="landing-display-header">The only link you'll ever share</h1>
            <br />
            <br />
            <h2 class="display-0.5 font-weight-light">Create a profile.</h2>
            <h2 class="display-0.5 font-weight-light">
              Add all your social media profiles and links.
            </h2>
            <h2 class="display-0.5 font-weight-light">
              Share your profile link with anyone.
            </h2>
            <h2 class="display-0.5 font-weight-light">
              Support this open source project
              <v-icon>fas fa-smile-wink</v-icon>
            </h2>
            <br />
            <br />
            <br />

            <p class="font-weight-light text-center">
              Example page
              <br />
              <v-btn
                class="ma-4"
                outlined
                rounded
                color="orange"
                x-large
                href="https://ziplinks.me/ziplinks"
                data-cy="ziplinks-button"
                target="_blank"
                >ziplinks.me/ziplinks</v-btn
              >
            </p>

            <v-btn
              class="ma-4"
              outlined
              color="black"
              x-large
              href="#how_it_works"
              data-cy="ziplinks-button-learn-more"
              >Learn More</v-btn
            >
            <v-btn class="ma-4" rounded color="black" dark x-large to="/login" data-cy="ziplinks-button-sign-up" 
              >Sign Up</v-btn
            >

            <br />
            <br />

            <!-- <div>
              We run from donations
              <v-icon>far fa-smile-wink</v-icon>
            </div>-->
            <v-col cols="12" sm="10" md="8" lg="6" xl="4">
              <v-card class="mx-auto" elevation="0" max-width="90%">
                <!-- <v-card-title>Example of @ziplinks page</v-card-title> -->
                <v-img src="../assets/landing_gif.gif" height="70%"></v-img>
              </v-card>
              <br />
              <br />

              <v-card class="mx-auto" elevation="15" max-width="90%">
                <!-- <v-card-title>Example of @ziplinks page</v-card-title> -->

                <v-img src="../assets/example.png" height="70%"></v-img>
                <a href="https://ziplinks.me/ziplinks">
                  <v-card-subtitle>Example of @ziplinks page</v-card-subtitle>
                </a>
              </v-card>
              <br />
              <v-card
                class="mx-auto"
                elevation="15"
                max-width="90%"
                id="how_it_works"
              >
                <v-card-title>
                  <h1>How it works?</h1>
                </v-card-title>
                <v-col cols="12" sm="12">
                  <h2 class="font-weight-light text-left">
                    <v-icon small>fas fa-terminal</v-icon>Simply Sign Up with
                    your email, is free
                  </h2>
                  <br />
                  <h2 class="font-weight-light text-left">
                    <v-icon small>fas fa-terminal</v-icon>Add your profile image
                  </h2>
                  <br />
                  <h2 class="font-weight-light text-left">
                    <v-icon small>fas fa-terminal</v-icon>Now let's add some
                    links
                  </h2>
                  <br />
                  <h2 class="font-weight-light text-left">
                    <v-icon small>fas fa-terminal</v-icon>Name the button to
                    anything you want, example a social media name
                  </h2>
                  <br />
                  <h2 class="font-weight-light text-left">
                    <v-icon small>fas fa-terminal</v-icon>Paste your link
                  </h2>
                  <br />
                  <h2 class="font-weight-light text-left">
                    <v-icon small>fas fa-terminal</v-icon>Choose an icon from
                    the drop down menu (optional)
                  </h2>
                  <br />
                  <h2 class="font-weight-light text-left">
                    <v-icon small>fas fa-terminal</v-icon>Click Add This Link,
                    that's it
                    <v-icon>fas fa-smile-wink</v-icon>
                  </h2>
                  <br />
                  <h2 class="font-weight-light text-left">
                    <v-icon small>fas fa-terminal</v-icon>Add as many links as
                    you want to
                  </h2>
                  <br />
                  <h2 class="font-weight-light text-left">
                    <v-icon small>fas fa-terminal</v-icon>Then share your
                    profile link with anyone
                  </h2>
                  <h2 class="font-weight-light text-left">
                    <v-icon small>fas fa-terminal</v-icon>Example this is our
                    ziplinks profile
                    <a href="https://ziplinks.me/ziplinks" target="_blank">
                      <code>ziplinks.me/ziplinks</code>
                    </a>
                  </h2>
                </v-col>

                <br />
              </v-card>
              <br />
              <br />
              <br />
            </v-col>
          </center>
        </v-flex>
      </v-layout>
    </v-container>

    <v-sparkline
      :fill="fill"
      :gradient="gradient"
      :line-width="width"
      :padding="padding"
      :smooth="radius || false"
      :value="value"
      auto-draw
    ></v-sparkline>
                <br />
            <br />
            <br />
  </div>
</template>

<script>
/* eslint-disable */
const gradients = [["orange"]];

export default {
  name: "Landing",

  data: () => ({
    fill: true,
    gradient: gradients[0],
    gradients,
    padding: 8,
    radius: 10,
    value: [0, 2, 0, 5, 0, 1, 0, 7, 0, 4, 0, 2],
    width: 2,
  }),
};
</script>
<style scoped>
.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out;
}
@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0);
  }
  20%,
  60% {
    transform: rotate(-25deg);
  }
  40%,
  80% {
    transform: rotate(10deg);
  }
}
@media (max-width: 500px) {
  .github-corner:hover .octo-arm {
    animation: none;
  }
  .github-corner .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }
}
</style>
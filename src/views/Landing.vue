<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex>
          <center>
            <br />
            <h1 class="display-3">The only link you'll ever need, for free</h1>
            <br />

            <h2 class="display-0.5 font-weight-light">Create a profile</h2>
            <h2 class="display-0.5 font-weight-light">Add all your social media profiles</h2>
            <h2 class="display-0.5 font-weight-light">Share your profile link with anyone</h2>

            <v-card-subtitle class="font-weight-light">
              For real, no hidden fees
              <v-icon>fas fa-smile-wink</v-icon>
            </v-card-subtitle>

            <br />
            <br />

            <p class="font-weight-light text-center">
              Example this is our page with all our social media profiles
              <br />
              <v-btn
                class="ma-4"
                outlined
                rounded
                color="orange"
                x-large
                href="https://ziplinks.me/ziplinks"
                target="_blank"
              >ziplinks.me/ziplinks</v-btn>
            </p>

            <!-- <h1 class="display-0.5">Signup for free, and use it for free!</h1> -->

            <v-btn class="ma-4" outlined color="black" x-large href="#how_it_works">Learn More</v-btn>
            <v-btn class="ma-4" rounded color="black" dark x-large to="/login">Sign Up</v-btn>

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
              <v-card class="mx-auto" elevation="15" max-width="90%" id="how_it_works">
                <v-card-title>
                  <h1>How it works?</h1>
                </v-card-title>
                <v-col cols="12" sm="12">
                  <h2 class="font-weight-light text-left">
                    <v-icon small>fas fa-terminal</v-icon>Simply Sign Up with your email, is free
                  </h2>
                  <br />
                  <h2 class="font-weight-light text-left">
                    <v-icon small>fas fa-terminal</v-icon>Add your profile image
                  </h2>
                  <br />
                  <h2 class="font-weight-light text-left">
                    <v-icon small>fas fa-terminal</v-icon>Now let's add some links
                  </h2>
                  <br />
                  <h2 class="font-weight-light text-left">
                    <v-icon small>fas fa-terminal</v-icon>Name the button to anything you want, example a social media name
                  </h2>
                  <br />
                  <h2 class="font-weight-light text-left">
                    <v-icon small>fas fa-terminal</v-icon>Paste your link
                  </h2>
                  <br />
                  <h2 class="font-weight-light text-left">
                    <v-icon small>fas fa-terminal</v-icon>Choose an icon from the drop down menu (optional)
                  </h2>
                  <br />
                  <h2 class="font-weight-light text-left">
                    <v-icon small>fas fa-terminal</v-icon>Click Add This Link, that's it
                    <v-icon>fas fa-smile-wink</v-icon>
                  </h2>
                  <br />
                  <h2 class="font-weight-light text-left">
                    <v-icon small>fas fa-terminal</v-icon>Add as many links as you want to
                  </h2>
                  <br />
                  <h2 class="font-weight-light text-left">
                    <v-icon small>fas fa-terminal</v-icon>Then share your profile link with anyone
                  </h2>
                  <h2 class="font-weight-light text-left">
                    <v-icon small>fas fa-terminal</v-icon>Example this is our ziplinks profile
                    <a
                      href="https://ziplinks.me/ziplinks"
                      target="_blank"
                    >
                      <code>ziplinks.me/ziplinks</code>
                    </a>
                  </h2>
                </v-col>

                <br />
              </v-card>
              <br />
              <br />
              <br />
              <!-- Donation button from Pay Pal -->
              <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                <input type="hidden" name="cmd" value="_s-xclick" />
                <input type="hidden" name="hosted_button_id" value="4GGQPQXMZFGYY" />
                <input
                  type="image"
                  src="https://www.paypalobjects.com/en_US/GB/i/btn/btn_donateCC_LG.gif"
                  border="0"
                  name="submit"
                  title="PayPal - The safer, easier way to pay online!"
                  alt="Donate with PayPal button"
                />
                <img
                  alt
                  border="0"
                  src="https://www.paypal.com/en_GB/i/scr/pixel.gif"
                  width="1"
                  height="1"
                />
              </form>
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
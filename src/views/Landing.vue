<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex>
          <center>
            <h1 class="display-4" color="yellow">Zip Links</h1>

            <br />
            <br />
            <br />

            <h1 class="display-1">
              Zip all your links into a single
              <strong>link</strong> for free!
            </h1>
            <br />
            <v-card-subtitle>
              For real, no hidden fees
              <v-icon>fas fa-smile-wink</v-icon>
            </v-card-subtitle>
            <br />
            <br />
            <!-- <h1 class="display-0.5">Signup for free, and use it for free!</h1> -->

            <v-btn class="ma-4" outlined color="black" x-large>Lear More</v-btn>
            <v-btn class="ma-4" rounded color="black" dark x-large to="/login">Sign Up</v-btn>

            <br />
            <br />

            <!-- <div>
              We run from donations
              <v-icon>far fa-smile-wink</v-icon>
            </div>-->
            <v-col cols="12" sm="10" md="8" lg="6" xl="4">
              <v-card class="mx-auto" elevation="15" max-width="90%">
                <!-- <v-card-title>Example of @ziplinks page</v-card-title> -->

                <v-img src="../assets/example.png" height="70%"></v-img>
                <a href="https://ziplinks.me/ziplinks">
                  <v-card-subtitle>Example of @ziplinks page</v-card-subtitle>
                </a>
              </v-card>
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
    //
    fill: true,
    gradient: gradients[0],
    gradients,
    padding: 8,
    radius: 10,
    value: [0, 2, 0, 5, 0, 1, 0, 7, 0, 4, 0, 2],
    width: 2,
  }),
  watch: {},
};
</script>
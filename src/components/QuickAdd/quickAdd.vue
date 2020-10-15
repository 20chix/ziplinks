<template>
  <!-- Quick add -->
  <v-col cols="12" sm="6">
    <v-card class="mx-auto" outlined v-if="this.editoYourProfilesBool">
      <v-card-text>
        <div class="display-1 text--primary">Edit your profiles</div>
      </v-card-text>
      <v-container
        v-for="_userLinks in this.userLinks"
        :key="_userLinks.message"
      >
        <EditSocialProfile
          v-if="_userLinks.iconButton == 'Instagram'"
          labelName=" Edit your Instagram username"
          iconName="mdi-instagram"
          :valueTextfield="
            _userLinks.linkUrl | showUsernameOnly(_userLinks.linkUrl)
          "
          :valueBeforeFilter="_userLinks.linkUrl"
          :docId="_userLinks.docId"
          :index="userLinks.findIndex((x) => x.linkUrl === _userLinks.linkUrl)"
        />
        <EditSocialProfile
          v-if="_userLinks.iconButton == 'Facebook'"
          labelName=" Edit your Facebook username"
          iconName="mdi-facebook"
          :valueTextfield="
            _userLinks.linkUrl | showUsernameOnly(_userLinks.linkUrl)
          "
          :valueBeforeFilter="_userLinks.linkUrl"
          :docId="_userLinks.docId"
          :index="userLinks.findIndex((x) => x.linkUrl === _userLinks.linkUrl)"
        />
        <EditSocialProfile
          v-if="_userLinks.iconButton == 'Twitter'"
          labelName=" Edit your Twitter username"
          iconName="mdi-twitter"
          :valueTextfield="
            _userLinks.linkUrl | showUsernameOnly(_userLinks.linkUrl)
          "
          :valueBeforeFilter="_userLinks.linkUrl"
          :docId="_userLinks.docId"
          :index="userLinks.findIndex((x) => x.linkUrl === _userLinks.linkUrl)"
        />
        <EditSocialProfile
          v-if="_userLinks.iconButton == 'Tik Tok'"
          labelName=" Edit your Tik Tok username"
          iconName="fab fa-tiktok"
          :valueTextfield="
            _userLinks.linkUrl | showUsernameOnlyTikTok(_userLinks.linkUrl)
          "
          :valueBeforeFilter="_userLinks.linkUrl"
          :docId="_userLinks.docId"
          :index="userLinks.findIndex((x) => x.linkUrl === _userLinks.linkUrl)"
        />
      </v-container>
    </v-card>

    <br />
    <v-card class="mx-auto" outlined>
      <v-card-text>
        <div class="display-1 text--primary">Quick add</div>
        <div class="display-6 text--primary">
          No need to add all of them, this is to make your life easier
        </div>
      </v-card-text>
      <v-container>
        <AddSocialProfile
          labelName=" Enter Instagram username"
          iconName="mdi-instagram"
        />
        <AddSocialProfile
          labelName=" Enter Facebook username"
          iconName="mdi-facebook"
        />
        <AddSocialProfile
          labelName=" Enter Twitter username"
          iconName="mdi-twitter"
        />
        <AddSocialProfile
          labelName=" Enter Tik Tok username"
          iconName="fab fa-tiktok"
        />
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
import AddSocialProfile from "../QuickAdd/AddEditProfiles/addSocialProfile";
import EditSocialProfile from "../QuickAdd/AddEditProfiles/editSocialProfile";
import { mapState } from "vuex";

export default {
  name: "quickAdd",

  data: () => ({
    showEditProfileCard: false,
    tempUserLinks: null,
  }),
  components: {
    AddSocialProfile,
    EditSocialProfile,
  },
  computed: {
    ...mapState(["userLinks", "editoYourProfilesBool"]),
  },
  filters: {
    showUsernameOnly: function (value) {
      if (value.slice(-1) == "/") {
        var res = value.split("/").slice(-2).join("/"); // take the two last elements
        return res;
      } else {
        return `${value.substring(value.lastIndexOf("/") + 1)}`;
      }
    },
    showUsernameOnlyTikTok: function (value) {
      return `${value.substring(value.lastIndexOf("@") + 1)}`;
    },
  },
};
</script>

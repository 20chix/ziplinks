import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('./firebaseConfig.js')
import firebase from "firebase/app";
// import router from "./router/";



Vue.use(Vuex)
/* eslint-disable */
// handle page reload
fb.auth.onAuthStateChanged(user => {
    store.commit("setLoadingLink", true)
    if (user) {
        store.commit('setCurrentUser', user)
        store.dispatch('fetchUserProfile')
        store.commit('setUserLinks', null)
        firebase
            .firestore()
            .collection("users/" + user.uid + "/links")
            .get()
            .then(function (querySnapshot) {
                if (!querySnapshot.empty) {
                    querySnapshot.forEach(function (doc) {
                        // Check if any of the links contains any from Quick Add
                        if (doc.data().linkUrl.includes("instagram.com") ||
                            doc.data().linkUrl.includes("facebook.com") ||
                            doc.data().linkUrl.includes("twitter.com") ||
                            doc.data().linkUrl.includes("tiktok.com")
                        ) {
                            store.commit("setEditYourProfilesBool", true);

                        }

                        store.commit('setUserLinks', doc.data())
                        store.commit("setLoadingLink", false)
                    });
                } else {
                    store.commit("setLoadingLink", false)
                }
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

    }
})





export const store = new Vuex.Store({



    state: {
        currentUser: null,
        userProfile: null,
        thisUserProfile: null,
        searchedUser: {
            email: "",
            userExist: false,
            username: "",
            userID: "",
            userProfileImage: "",
            background_colour: "#FFFFFF",
            buttons_colour: "#FFFFFF",
            font: ""
        },
        userLinks: [],
        linksLoaded: false,
        imageLoaded: false,
        editoYourProfilesBool: false,
        showFooter: true,
        showNavBar: true,
        imageCropped: false

    },

    getters: {
        editoYourProfilesBool: state => state.editoYourProfilesBool
    },
    actions: {
        clearData({ commit }) {
            commit('setCurrentUser', null)
            commit('setUserProfile', {})
        },
        fetchUserProfile({ commit, state, dispatch }) {
            state.userLinks = []
            var tempUser = {};

            fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
                commit('setUserProfile', res.data())
                commit("setLoadingLink", false)
            }).catch(err => {
                console.log(err)
            })

            // console.log("User data")
            //  console.log(res.data())
            // dispatch('updatePosts')

        },

        fetchUserFromLinkOrSearchBar({ commit, state }) {
            //Set loading bar to true
            this.commit("setLoadingLink", true)

            //Empty arrray before everything
            state.userLinks = []

            //Need this in order to work with FB inside the call
            let self = this
            let tempUserDetails = "";

            fb.usersCollection
                .where("username_lowercase", "==", state.searchedUser.username.toLowerCase())
                .get()
                .then(function (querySnapshot) {
                    if (querySnapshot.empty) {
                        // User not exist
                        self.commit("setLoadingLink", false)
                        state.searchedUser.userExist = false;
                    } else {
                        querySnapshot.forEach(function (doc) {
                            // User exist
                            state.searchedUser.userExist = true;
                            // Get user in a temp variable
                            tempUserDetails = doc.data();
                            state.searchedUser.userID = doc.id;
                            state.searchedUser.background_colour = tempUserDetails.background_colour
                            self.commit("setSearchedUserBackgroundColour", tempUserDetails.background_colour);
                            state.searchedUser.buttons_colour = tempUserDetails.buttons_colour
                            state.searchedUser.font = tempUserDetails.font
                            console.log("fontsss " + tempUserDetails.font)
                            self.commit("setSearchedUserFont", tempUserDetails.font)
                            self.dispatch("incrementViews")
                            fb.storage
                                .ref("profileImages/" + doc.id + "_200x200")
                                .getDownloadURL().then(function (url) {
                                    // By nowe the image shoulld be risezed to 200 by 200, get the url
                                    state.searchedUser.userProfileImage = url;
                                }).catch(function (error) {
                                    // A full list of error codes is available at
                                    // https://firebase.google.com/docs/storage/web/handle-errors
                                    switch (error.code) {
                                        case 'storage/object-not-found':
                                            // File doesn't exist
                                            fb.storage
                                                .ref("profileImages/" + doc.id + "_200x200")
                                                .getDownloadURL().then(function (url) {
                                                    // Insert url into an <img> tag to "download"
                                                    //console.log("url " + url)
                                                    state.searchedUser.userProfileImage = url;
                                                }).catch(function (error) {
                                                    state.searchedUser.userProfileImage = "https://firebasestorage.googleapis.com/v0/b/ziplinks-c8231.appspot.com/o/profileNotSet_200x200.png?alt=media&token=230f8b72-af01-4548-839e-e49c42a2778d";

                                                });
                                            break;
                                    }
                                });

                            state.searchedUser.email = tempUserDetails.email;

                            self.commit("setSearchedUserEmail", state.searchedUser.email);
                            self.commit("setSearchedUserUUID", doc.id);
                            //Empty userLinks array so we don't get double data
                            store.commit('setUserLinks', null)
                            firebase
                                .firestore()
                                .collection("users/" + doc.id + "/links")
                                .get()
                                .then(function (querySnapshot) {
                                    if (!querySnapshot.empty) {
                                        querySnapshot.forEach(function (doc) {
                                            state.userLinks.push(doc.data());
                                            self.commit("setLoadingLink", false)
                                        });

                                    } else {
                                        self.commit("setLoadingLink", false)
                                    }
                                })
                                .catch(function (error) {
                                    console.log("Error getting documents: ", error);
                                });
                        });

                    }
                })
                .catch(function (error) {
                    state.searchedUser.userExist = false;
                    console.log("Error getting documents: ", error);
                });
        },

        addSocialProfile({ commit, state }, socialLink) {
            //Set loading bar to true
            this.commit("setLoadingLink", true)
            console.log(socialLink);
            firebase
                .firestore()
                .collection("users/")
                .doc(state.currentUser.uid)
                .collection("links")
                .add(socialLink)
                .then((docRef) => {
                    //Successfully pushed to firebase
                    firebase
                        .firestore()
                        .collection("users/")
                        .doc(state.currentUser.uid)
                        .collection("links")
                        .doc(docRef.id)
                        .update({
                            //Add the doc id into firebase child
                            docId: docRef.id,
                        })
                        .then(() => {

                            socialLink.docId = docRef.id
                            // Add the new Social profile into userLinks array
                            //state.userLinks.push(socialLink);
                            commit("setUserLinks", socialLink)
                            // Show Edit Card just in case
                            commit("setEditYourProfilesBool", true);
                            // Stop loading  
                            commit("setLoadingLink", false)

                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        updateSocialProfile({ commit, state }, socialLink) {
            //Set loading bar to true
            this.commit("setLoadingLink", true)
            console.log(socialLink);
            firebase
                .firestore()
                .collection("users/")
                .doc(state.currentUser.uid)
                .collection("links")
                .doc(socialLink.docId)
                .set(socialLink)
                .then(() => {
                    this.commit("setLoadingLink", false)
                })
                .catch((err) => {
                    console.log(err);
                    this.commit("setLoadingLink", false)
                });
        },
        deleteSocialMediaProfile({ commit, state }, payload) {

            //Start spinner
            this.commit("setLoadingLink", true)
            firebase
                .firestore()
                .collection("users/")
                .doc(state.currentUser.uid)
                .collection("links")
                .doc(payload.tempDocId)
                .delete()
                .then(() => {            
                    state.userLinks.splice(payload.tempIndex, 1);
                    commit("setLoadingLink", false)
                    if(state.userLinks.length == 0 || state.userLinks === undefined)
                        this.commit("setEditYourProfilesBool", false);
                    
                })
                .catch((err) => {
                    this.commit("setLoadingLink", false)
                    console.log(err);
                });
        },
        editUsername({ commit, state }, username) {
            // Start Loading 
            commit("setLoadingLink", true)
            fb.usersCollection
                .where("username_lowercase", "==", username)
                .get()
                .then(function (querySnapshot) {
                    if (!querySnapshot.size >= 1) {
                        fb.usersCollection
                            .doc(state.currentUser.uid)
                            .set({
                                username: username,
                                username_lowercase: username.toLowerCase(),
                            }, { merge: true })
                            .then(() => {
                                //Stop loading
                                state.userProfile.username = username
                                commit("setLoadingLink", false)
                            })
                            .catch((err) => {
                                console.log(err);
                                //Stop loading
                                commit("setLoadingLink", false)
                            });

                    } else {
                        // Stop loading
                        commit("setLoadingLink", false)
                    }
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });
        },
        addUpdateBackgroundColour({ commit, state }, colour) {
            //Start the loading
            commit("setLoadingLink", true)
            fb.usersCollection
                .doc(state.currentUser.uid)
                .set({
                    background_colour: colour,
                }, { merge: true })
                .then(() => {
                    //Stop loading
                    commit("setLoadingLink", false)
                })
                .catch((err) => {
                    console.log(err);
                    //Stop loading
                    commit("setLoadingLink", false)
                });

        },
        addUpdateButtonsColour({ commit, state }, colour) {
            //Start the loading
            commit("setLoadingLink", true)
            fb.usersCollection
                .doc(state.currentUser.uid)
                .set({
                    buttons_colour: colour,
                }, { merge: true })
                .then(() => {
                    //Stop loading
                    commit("setLoadingLink", false)
                })
                .catch((err) => {
                    console.log(err);
                    //Stop loading
                    commit("setLoadingLink", false)
                });

        },
        incrementViews({ commit, state }) {
            fb.usersCollection
                .doc(state.searchedUser.userID)
                .set({
                    views: firebase.firestore.FieldValue.increment(1)
                }, { merge: true })
                .catch((err) => {
                    console.log(err);
                });
        },
        addUpdateFont({ commit, state }, font) {
            //Start loading
            commit("setLoadingLink", true)
            fb.usersCollection
                .doc(state.currentUser.uid)
                .set({
                    font: font,
                }, { merge: true })
                .then(() => {
                    commit("setSearchedUserFont", font)
                    //Stop loading
                    commit("setLoadingLink", false)
                })
                .catch((err) => {
                    console.log(err);
                    //Stop loading
                    commit("setLoadingLink", false)
                });

        },
        updateImageRef({ commit, state }) {

            var tempDownloadURL = "";
            fb.storage
                .ref("profileImages/" + state.currentUser.uid + "_200x200")
                .getDownloadURL()
                .then(function (downloadURL) {
                    //console.log("File available at", downloadURL);
                    tempDownloadURL = downloadURL
                    fb.usersCollection
                        .doc(state.currentUser.uid)
                        .update({
                            profileImage: downloadURL,
                        })
                        .then(function () {
                            console.log("Document successfully updated!");
                            commit("setImageProfile", downloadURL)
                            commit("setLoadingImageChange", false);
                        })
                        .catch(function (error) {
                            console.error(error);
                        })
                }).catch(function (error) {
                    console.error(error);
                });
        },
        imageCropped({ commit, state }, downloadURL) {
            //Start the loading
            // Upload completed successfully, now we can get the download URL
            fb.storage
                .ref("profileImages/" + tempUser.uid + "_200x200")
                .getDownloadURL()
                .then(function (downloadURL) {
                    console.log("File available at", downloadURL);
                    dispatch("updateImageRef", downloadURL);
                }).catch(function (error) {
                    commit("setImageCropped", false)
                })



        },

    },
    mutations: {
        setCurrentUser(state, val) {
            state.currentUser = val
        },
        setUserProfile(state, value) {
            if (value) {
                state.userProfile = value
            } else {
                state.userProfile = {}
            }
        },
        setSearchedUserUsername(state, val) {
            if (val) {
                state.searchedUser.username = val
            } else {
                state.searchedUser.username = ""
            }

        },
        setSearchedUserBackgroundColour(state, val) {
            if (val) {
                state.searchedUser.background_colour = val
            } else {
                state.searchedUser.background_colour = null
            }

        },
        setSearchedUserFont(state, val) {
            if (val) {
                state.searchedUser.font = val
            } else {
                state.searchedUser.font = ""
            }

        },
        setSearchedUserEmail(state, val) {
            if (val) {
                state.searchedUser.email = val
            } else {
                state.searchedUser.email = null
            }

        },
        setSearchedUserUUID(state, val) {
            if (val) {
                state.searchedUser.userID = val
            } else {
                state.searchedUser.userID = null
            }

        },
        setLoadingLink(state, val) {
            if (val) {
                state.linksLoaded = val
            } else {
                state.linksLoaded = false
            }
        },
        setLoadingImageChange(state, val) {
            if (val) {
                state.imageLoaded = val
            } else {
                state.imageLoaded = false
            }
        },
        setUserLinks(state, val) {
            if (val) {
                state.userLinks.push(val)
            } else {
                state.userLinks = []
            }
        },
        setEditYourProfilesBool(state, val) {
            if (val) {
                state.editoYourProfilesBool = val
            } else {
                state.editoYourProfilesBool = false
            }
        },
        setShowFooter(state, val) {
            if (val) {
                state.showFooter = val
            } else {
                state.showFooter = false
            }
        },
        setShowNavBar(state, val) {
            if (val) {
                state.showNavBar = val
            } else {
                state.showNavBar = false
            }
        },
        setImageCropped(state, val) {
            if (val) {
                state.imageCropped = true
            } else {
                state.imageCropped = false
            }
        },
        setImageProfile(state, val) {
            if (val) {
                state.userProfile.profileImage = val
            } else {
                state.userProfile.profileImage = "https://firebasestorage.googleapis.com/v0/b/ziplinks-c8231.appspot.com/o/profileNotSet_200x200.png?alt=media&token=230f8b72-af01-4548-839e-e49c42a2778d"


            }
        },
    }
})

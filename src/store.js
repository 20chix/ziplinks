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
            userProfileImage: ""
        },
        userLinks: [],
        linksLoaded: false,
        imageLoaded: false,
        editoYourProfilesBool: false

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
            fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
                commit('setUserProfile', res.data())
                // console.log("User data")
                //  console.log(res.data())
                // dispatch('updatePosts')
            }).catch(err => {
                console.log(err)
            })
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
                                                .ref("profileImages/" + doc.id)
                                                .getDownloadURL().then(function (url) {
                                                    // Insert url into an <img> tag to "download"
                                                    console.log("url" + url)
                                                    state.searchedUser.userProfileImage = url;
                                                }).catch(function (error) {
                                                    state.searchedUser.userProfileImage = "https://firebasestorage.googleapis.com/v0/b/glanceprofile.appspot.com/o/profileNotSet.png?alt=media&token=8e2606ce-bfb3-454f-a2da-e88a466758a8";

                                                });
                                            break;
                                    }
                                });

                            state.searchedUser.email = tempUserDetails.email;
                            self.commit("setSearchedUserEmail", state.searchedUser.email);
                            self.commit("setSearchedUserUUID", doc.id);
                            self.commit("setLoadingLink", false)
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

                            // Add the new Social profile into userLinks array
                            state.userLinks.push(socialLink);
                            // Show Edit Card just in case
                            this.commit("setEditYourProfilesBool", true);
                            // Stop loading  
                            this.commit("setLoadingLink", false)

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
                });
        },
        deleteSocialMediaProfile({ commit, state }, docId) {
            //Start spinner
            this.commit("setLoadingLink", true)

            firebase
                .firestore()
                .collection("users/")
                .doc(state.currentUser.uid)
                .collection("links")
                .doc(docId)
                .delete()
                .then(() => {
                    this.commit("setLoadingLink", false)
                    state.userLinks.forEach(function (arrayItem, index) {
                        if (arrayItem.docId === docId)
                            state.userLinks.splice(index, 1);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        editUsername({ commit, state }, username) {
            commit("setLoadingLink", true)
            console.log("edit username " + username)
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
                                commit("setLoadingLink", false)
                                window.location.reload()
                            })
                            .catch((err) => {
                                console.log(err);
                                //Stop loading
                                commit("setLoadingLink", false)
                            });

                    } else {
                        // Stop loading
                        this.commit("setLoadingLink", false)
                    }
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });
        }
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
    }
})

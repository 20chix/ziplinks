import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('./firebaseConfig.js')
import firebase from "firebase/app";


Vue.use(Vuex)

/* eslint-disable */
// handle page reload
fb.auth.onAuthStateChanged(user => {
    if (user) {
        store.commit('setCurrentUser', user)
        // store.dispatch('fetchUserProfile')
        //store.dispatch('setUserState')
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
        imageLoaded: false

    },
    actions: {
        clearData({ commit }) {
            commit('setCurrentUser', null)
            commit('setUserProfile', {})
        },
        fetchUserProfile({ commit, state, dispatch }) {
            fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
                commit('setUserProfile', res.data())
                // console.log("User data")
                //  console.log(res.data())
                // dispatch('updatePosts')
            }).catch(err => {
                console.log(err)
            })
        },
        updateProfile({ commit, state }, data) {
            let username = data.username
            let about = data.about
            let monthlyFee = data.monthlyFee
            let location = data.location

            fb.usersCollection.doc(state.currentUser.uid).update({ username, about, monthlyFee, location }).then(user => {
                // update all posts by user to reflect new name
                fb.postsCollection.where('userId', '==', state.currentUser.uid).get().then(docs => {
                    docs.forEach(doc => {
                        fb.postsCollection.doc(doc.id).update({
                            userName: username
                        })
                    })
                })
                // update all comments by user to reflect new name
                fb.commentsCollection.where('userId', '==', state.currentUser.uid).get().then(docs => {
                    docs.forEach(doc => {
                        fb.commentsCollection.doc(doc.id).update({
                            userName: username
                        })
                    })
                })
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
            state.searchedUser.userExist = false;

            fb.usersCollection
                .where("username_lowercase", "==", state.searchedUser.username.toLowerCase())
                .get()
                .then(function (querySnapshot) {
                    if (querySnapshot.empty) {
                        console.log("Does not exist")
                        // User not exist
                        self.commit("setLoadingLink", false)
                        state.searchedUser.userExist = false;
                    } else {
                        querySnapshot.forEach(function (doc) {
                            // User exist
                            state.searchedUser.userExist = true;
                            // doc.data() is never undefined for query doc snapshots
                            // console.log(doc.id, " => ", doc.data());

                            // For debuggin purpose    
                            // console.log("Insideee " + self.state.currentUser.uid)
                            tempUserDetails = doc.data();
                            state.searchedUser.userID = doc.id;
                                console.log(doc.id)
                            fb.storage
                                .ref("profileImages/" + doc.id + "_200x200")
                                .getDownloadURL().then(function (url) {
                                    // Insert url into an <img> tag to "download"
                                    console.log("url" + url)
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
            
                                            });
                                            break;

                                        case 'storage/unauthorized':
                                            // User doesn't have permission to access the object
                                            break;

                                        case 'storage/canceled':
                                            // User canceled the upload
                                            break;

                                        case 'storage/unknown':
                                            // Unknown error occurred, inspect the server response
                                            break;
                                    }
                                });



                            state.searchedUser.email = tempUserDetails.email;
                            self.commit("setSearchedUserEmail", state.searchedUser.email);
                            self.commit("setSearchedUserUUID", doc.id);


                            firebase
                                .firestore()
                                .collection("users/" + doc.id + "/links")
                                .get()
                                .then(function (querySnapshot) {
                                    if (!querySnapshot.empty) {
                                        querySnapshot.forEach(function (doc) {
                                            state.userLinks.push(doc.data());
                                            self.commit("setLoadingLink", false)
                                            // console.log(doc.data());
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
        }

    }
})

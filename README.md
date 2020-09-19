<center><h1> ZipLinks</h1></center>
<p align="center">
  <a href="https://vuetifyjs.com" target="_blank">
    <img alt="Vuetify Logo" width="100" src="https://firebasestorage.googleapis.com/v0/b/glanceprofile.appspot.com/o/ziplinks_logo.png?alt=media&token=fc99b485-d901-4e1d-b395-8d3b0c79706d">
  </a>
</p>

<p align="center">
  <a href="">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square">
  </a>


  
  <a href="https://github.com/vuetifyjs/vuetify/blob/master/LICENSE.md">
    <img src="https://img.shields.io/npm/l/vuetify.svg" alt="License">
  </a>
 
  <br>

</p>


## Intro 

The aim of this open source project is to allow anyone to group their social media profiles into one profile, a bit like linktree but for free and open source.


## Live Demo

### Home page

https://ziplinks.me

### A ZipLinks profile

https://ziplinks.me/ziplinks


## Usage

In order to get up and running with this project do the following

- Clone this repo

```
npm install
``` 
```
npm run serve
```
- Create a firebase project with Functions, Firestore, Storage and Auth with Email enabled

- Go to ```src/firebaseConfig.js``` and add your firebase credentials from the project that you just created

- Now you'll be able to talk to your firebase project.

- If you have any issues or questions, raise an issue and I'll try to get back to you as soon as I have time



## Contributions

Contributions are always welcome, feel free to submit a PR, I'll review it and if everything goes well I'll push it to production.

## Roadmap
- [x] First alpha release release
- [ ] Add some tests
- [ ] Add QR Code feature
- [ ] Allow user to choose a background color
- [ ] For populare social media add a 'Quick add section' where user just enter the username instead of the whole link
- [ ] When user upload profile image compress it, so it doesn;t take much space in the server
- [ ] Allow user to change their username after they sign-up
- [ ] Add caching feature, instead pulling all the data every time.
- [ ] Share some Love :) 





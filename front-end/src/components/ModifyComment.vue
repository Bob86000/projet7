<template>
<div>
  <header class="navbar navbar-expand-lg navbar-light bg-light row">
    <img src="../assets/icon.svg" 
    alt="Logo de l'entreprise Groupomania"
    height="100px"
    width="100px" />
  <h1 class="navbar-brand text-danger" href="#">Groupomania</h1>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <nav class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link btn btn-light" :to="{name:'bestTopic'}">Les publications populaires<span class="sr-only">(current)</span></router-link>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0 ">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Chercher des publications</button>
    </form>
  </nav>
</header>
  <div class="submit-form col-md-8 col-xs-12 mx-auto">

        <div class="form-group">
          <label for="description">Text</label>
          <input
          class="form-control"
          id="description"
          required
          v-model="currentComments.description"
          name="description"
           :placeholder="currentComments.description"
          />
        </div>

      <label for="file" ></label>
     <input type="file" class="file" accept="image/*" @change="filesSelected" />
     <img id="output" :src="currentComments.imageUrl">
      <button to="/" class="nav-link text-center btn btn-secondary" @click="newTopic" >Envoyer</button>
</div>
</div>
</template>

<script>

import CommentDataService from "../services/CommentDataService";

export default {
  name: "add-topic",
  data() {
    return {
      topic: {
        id: null,
        title: "",
        text: "",
        files: false,
        submitted: false
      },
      currentComments: null,
      loadingComment: false, 
      errorComment: null,
      topicId: this.$route.params.id,
      userId: null
    };
  },
  methods: {

    fetchDataddTopic () {
      console.log("page chargé");
    
    }, fetchDatas (id) {
       // manage state of errors 
       this.errorComment = null;
      this.loadingComment = true;
      let getUserAuth = JSON.parse(localStorage.getItem("session")) || false;
      console.log(getUserAuth[0].userId);
      let userAuth = getUserAuth[0].userId.slice(16) || false;
      // Search Data to loading page
      CommentDataService.get(id)
      .then( response => {
          if (response.status == 200){
              this.currentComments = response.data;
              this.userId = userAuth;
              console.log(this.userId)
          console.log("héllos")}
          else {
              console.log("Echec de la recupération des données");
          }})
      .catch(response => {
          if (response.status != 200){
      console.log("Echec de la recupération des données");
    }})},
    filesSelected(e) {
    this.topic.files = e.target.files[0];
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) 
    }
    ;},
    newTopic () {

     let textData = "";
     let getUserAuth = JSON.parse(localStorage.getItem("session")) || false;
     console.log(getUserAuth[0].userId);
     let userId = getUserAuth[0].userId || false;
     if (!userId) {
       return alert("Problème d'authentification veuillez vous reconnecter");
     }
     if (this.topic.files && this.topic.title) {
       console.log("le fichier est présent");
       textData = {title: this.topic.title, text : this.topic.text, userId: userId};
       console.log(textData);
       let formData = new FormData();
       formData.append("image", this.topic.files);
       formData.append("topic",  JSON.stringify(textData));
     CommentDataService.create(formData)
        .then(response => {
          this.topic.id = response.data.id;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      }
     else if (this.topic.title && this.topic.text && !this.topic.file) {
       console.log("tester cette partie la en adaptant le code");
        textData = { topic: {title: this.topic.title, text : this.topic.text, userId: userId}};
        let formData = new FormData();
        formData.append("topic",  JSON.stringify(textData));
        CommentDataService.create(formData)
        .then(response => {
          this.topic.id = response.data.id;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      
     }
     else  {
        console.log("le fichier est vide et le titre/text est vide");
      return confirm("Veuillez remplir correctement les champs avant de cliquer sur envoyer!");
     }

    }

  },
  mounted () {
    this.fetchDataddTopic() 
    this.fetchDatas(this.$route.params.id);
  }
  }
</script>

<style>
</style>

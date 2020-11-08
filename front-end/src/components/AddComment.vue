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
      <li class="nav-item active">
        <router-link class="nav-link btn btn-light" :to="{name: 'home'}">Les commentaires</router-link>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0 ">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Chercher des publications</button>
    </form>
  </nav>
</header>
  <div class="submit-form col-md-8 col-xs-12 mx-auto">
      <div v-if="!comment.submitted">
        <div class="form-group">
          <label for="description">Commentaire</label>
          <input
          class="form-control"
          id="description"
          required
          v-model="comment.description"
          name="description"
          />
        </div>
      </div>

      <label for="file" ></label>
     <input type="file" class="file" @change="filesSelected" />
      
      <button to="/" class="nav-link text-center btn btn-secondary" @click="newComment" >Envoyer</button>
</div>
</div>
</template>

<script>

import CommentDataService from "../services/CommentDataService";

export default {
  name: "add-topic",
  data() {
    return {
      comment: {
        id: null,
        description: "",
        files: false,
        submitted: false
      }
    };
  },
  methods: {

    fetchDataddComment () {
      console.log("page chargéééééé");
    
    },
    filesSelected(e) {
    this.comment.files = e.target.files[0];
    
    },
    newComment () {

     let textData = "";
     let getUserAuth = JSON.parse(localStorage.getItem("session")) || false;
     console.log(getUserAuth[0].userId);
     let userId = getUserAuth[0].userId || false;
     if (!userId) {
       return alert("Problème d'authentification veuillez vous reconnecter");
     }
     if (this.comment.files && this.comment.description) {
       console.log("le fichier est présenteeeeeeeeeeeeeeeéééééé");
       const params = this.$route.params.id;
       console.log(params);
       textData = {description: this.comment.description, userId: userId, topicId: this.$route.params.topicId};
       console.log(textData);
       let formData = new FormData();
       formData.append("image", this.comment.files);
       formData.append("comment",  JSON.stringify(textData));
     CommentDataService.create(formData)
        .then(response => {
          this.comment.id = response.data.id;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      }
     else if (this.comment.description && !this.comment.file) {
       console.log("le fichier est vide");
        textData = { comment: {description: this.comment.description, userId: userId}};
        let formData = new FormData();
        formData.append("comment",  JSON.stringify(textData));
        CommentDataService.create(formData)
        .then(response => {
          this.comment.id = response.data.id;
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
    this.fetchDataddComment(this.$route.params.id) 
  }
  }
</script>

<style>
</style>

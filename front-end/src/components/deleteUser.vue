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
  <div class="submit-form col-12 mx-auto">
      <div v-if="userName" class="col-12 d-flex justify-content-center"> 
          <div class="d-flex" ><p class="col-8"> Compte utilisateur: {{ userName }} </p>
       <button @click="deleteUser"  class="btn btn-primary"> Supprimer le compte </button></div>
      </div>
</div>
</div>
</template>

<script>
import UserDataService from "../services/UserDataService";
export default {
  name: "add-topic",
  data() {
    return {
      userName: null,
      userId: null
    }
  },
  methods: {

    fetchDataddComment () {
      console.log("page chargéééééé");
        let getUserAuth = JSON.parse(localStorage.getItem("session")) || false;
        this.userName = getUserAuth[0].name || false;
        this.userId = getUserAuth[0].userId || false;
        console.log(this.userId);
    },
    deleteUser() {
      const needAuth= this.userId;
      UserDataService.delete(needAuth)
      .then( response => {
       if (response.status == 201){
                console.log("suppression de la publication réussi");
                this.$router.push({name: '/'});
              }
        else {
          return  console.log('echec de la supression du commentaire');
          }})
      .catch( () => {
     return console.log('echec de la supression du commentaire')});
  }},
  mounted () {
    this.fetchDataddComment(this.$route.params.id) 
  }
  }
</script>

<style>
</style>

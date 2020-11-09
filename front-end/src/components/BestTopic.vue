<template>
 <div>
<header class="navbar navbar-expand-lg navbar-light bg-light">
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
        <router-link class="nav-link btn btn-light" :to="{name:'home'}">Retour à l'accueil<span class="sr-only">(current)</span></router-link>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0 ">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Chercher des publications</button>
    </form>
  </nav>
</header>
<main class="container bestTopic-page">
    <div class="loading d-flex justify-content-center" v-if="loadingTopic">
        <p>Les données sont en cours de récupération</p>
    </div>

    <div v-if="errorTopic" class="error">
      {{ errorTopic }}
    </div>

<section v-if="postTopic" class="post row text-center">
    <h2 class="col-12 ">Les publications populaires</h2>
        <router-link v-for="topic in topics" :key="topic.id" :to="{name: 'oneTopic', params: {id:topic.id}}" class=" col-12 mx-auto my-3 btn btn-dark" >
             <article class="col-12 mx-auto my-3 " >
                <div class=" p-3 mb-2 bg-light text-dark d-flex flex-column justify-content-center align-items-center">
                     <h3 class="my-3">{{ topic.title}}</h3>
                    <img v-if="topic.imageUrl" :src="topic.imageUrl" alt="">
                <p class="article__text">{{ topic.text}} </p>
                </div>
                <div class="d-flex justify-content-between">
                 <p>{{topic.createdAt.replace('T','_').slice(0,10)}}</p>
                 <div class="d-flex align-items-center justify-content-between">
                    <p class="my-auto mx-2">{{topic.likes}}</p> 
                 <img class="heart" src="../assets/miniheart.jpg" alt="Image representant les likes">
                 </div>
                 <div class="d-flex align-items-center justify-content-between">
                    <p class="my-auto mx-2">{{topic.dislikes}}</p>
                    <img class="heart" src="../assets/miniace.jpg" alt="Image representant les dislikes">
                 </div>
                 <p>Publiée par {{topic.user.name}}</p>    
                </div>
                
             </article>
             </router-link> 
</section>
</main>
<footer class="iu">bloc footer</footer> 
</div>
</template>

<script>


import TopicDataService from "../services/TopicDataService";
import CommentDataService from "../services/CommentDataService";

export default {
 name: "Topic-list",
  data() {
    return {
      topics: [],
      comments: [],
      loadingTopic: false,
      loadingComment: false, 
      postTopic: null,
      postComment: null,
      errorTopic: null,
      errorComment: null
    };
  },
  mounted () {
      this.fetchDataBestTopic();
  },
  methods: {
    fetchDataBestTopic () {
       // manage state of errors 
      this.errorTopic = this.postTopic = null;
      this.loadingTopic = true;
       this.errorComment = this.postComment = null;
      this.loadingComment = true;
      // Search Data to loading page
      TopicDataService.getTopTopic()
      .then( response => {
          if (response.status == 200){
              this.topics = response.data;
              this.errorTopic = false
              this.postTopic = true;
                this.loadingTopic = false;
          }
          else {
              this.errorTopic = "Echec de la recupération des données";
              this.loadingTopic = false;
          }})
      .catch(response => {
          if (response.status != 200){
      this.errorTopic = "Echec de la recupération des données";
      this.loadingTopic = false;}});

      CommentDataService.getTopComment()
      .then( response => {
          if (response.status == 200){
              this.comments = response.data;
              this.errorComment = false
              this.postComment = true;
                this.loadingComment = false;
          }
          else {
              this.errorComment = "Echec de la recupération des données";
              this.loadingComment = false;
          }})
      .catch(response => {
          if (response.status != 200){
      this.errorComment = "Echec de la recupération des données";
      this.loadingComment = false;}})
    }
    }
    
  }
</script>

<style>
html {
  font-size: 1rem;
}
.bestTopic-page section img {
  width:80%;
}
.bestTopic-page .article__text{
  width: 80%;
  background-color: rgba(163, 211, 122, 0.404);
  border: 1px solid rgb(66, 206, 11);
}
@media all and (max-width: 575.98px){
  html {
    font-size: 0.7rem;
  }
}
@media all and (min-width: 576px) and (max-width: 767.98px){
  html {
    font-size: 0.9rem;
  }
  .bestTopic-page .description {
    font-size: 0.6rem;
  }
}
@media all and (min-width: 768px) and (max-width: 1200px){
  .bestTopic-page .description {
    font-size: 0.8rem;
  }
}
.bestTopic-page .heart {
     width:37px;
    height: 37px;
    border-radius: 100px; }
</style>
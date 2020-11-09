<template>
 <div>
<header class="navbar navbar-expand-lg navbar-light bg-light">
    <img src="../assets/icon.svg" 
    alt="Logo de l'entreprise Groupomania"
    height="100px"
    width="100px" />
  <h1 class="navbar-brand" href="#">Groupomania</h1>
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
      <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Chercher des publications</button>
    </form>
  </nav>
</header>
<main class="container home-page">
    <div class="d-flex">
      <router-link v-if="authName" :to="{name: 'deleteUser'}" class="col-8 btn btn-outline-danger text-center">Bienvenue {{ authName }}</router-link>
    <router-link v-if="authName" :to="{name: 'user'}" class="btn btn-outline-danger col-4" :@click="Logout">Se deconnecter </router-link>
    </div>
    <div class="loading d-flex justify-content-center" v-if="loadingComment">
        <p>Les données sont en cours de récupération</p>
    </div>
    <div v-if="errorComment" class="error">
      {{ errorComment }}
    </div>
    <div v-if="postComment" class="row d-flex justify-content-start ">
    <router-link v-for="comment in comments" :key="comment.id" :to="{name: 'oneTopic', params: {id:comment.topicId}}" class=" col-sm-3 col-xs-12 my-3 btn btn-light" >
             <article class="d-block border border-primary  btn btn-light" >
                <div class="d-flex flex-column justify-content-start align-items-center">
                   <img class= "w-100 mainHeader__img" v-if="comment.imageUrl" :src="comment.imageUrl" alt="image des commentaires">
                <p class="description article__text mainHeader__text mt-2">{{ comment.description}} </p>
                </div>
             <p>Commenté par {{comment.userId}}</p>       
             </article>
             </router-link>
             </div>
    <div class="row d-flex" >
      <router-link :to="{name: 'addTopic'}" class="text-center btn btn-outline-danger mx-auto my-3" >Ajouter une publication</router-link>
    </div>
    <div class="loading d-flex justify-content-center" v-if="loadingTopic">
        <p>Les données sont en cours de récupération</p>
    </div>

    <div v-if="errorTopic" class="error">
      {{ errorTopic }}
    </div>

<section v-if="postTopic" class="post row text-center">
    <h2 class="col-12 ">Les dernieres publications</h2>
        <router-link v-for="topic in topics" :key="topic.id" :to="{name: 'oneTopic', params: {id:topic.id}}" class=" col-12 mx-auto my-3 btn btn-primary" >
             <article class="col-12 mx-auto my-3  " >
                <div class=" p-3 mb-2 bg-light text-dark d-flex flex-column justify-content-center align-items-center">
                     <h3 class="my-3">{{ topic.title}}</h3>
                    <img v-if="topic.imageUrl" :src="topic.imageUrl" alt="">
                <p class="article__text">{{ topic.text}} </p>
                </div>
                <div class="d-flex justify-content-between">
                 <p>{{topic.createdAt.replace('T','_').slice(0,10)}}</p>
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
      errorComment: null,
      authName: null
    };
  },
  mounted () {
      this.fetchDataHome();
  },
  methods: {
    fetchDataHome () {
       // manage state of errors 
      this.errorTopic = this.postTopic = null;
      this.loadingTopic = true;
       this.errorComment = this.postComment = null;
      this.loadingComment = true;
      let getNameAuth = JSON.parse(localStorage.getItem("session")) || false;
     console.log(getNameAuth[0].name);
     let userName = getNameAuth[0].name|| false;
     this.authName = userName; 
      // Search Data to loading page
      TopicDataService.getAll()
      .then( response => {
          if (response.status == 200){
              console.log(response.data);
              this.topics = response.data;
              this.errorTopic = false
              this.postTopic = true;
                this.loadingTopic = false;
                for (const item of this.topics) {
                console.log(item.id);
              }
          console.log("response.status")}
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
          console.log("response.status")}
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
.article-comment{
  height: 300px;
}
.home-page p{
  overflow: hidden;
  white-space: nowrap;
   text-overflow: ellipsis;
}
.mainHeader__img {
   height: 150px;
}
.home-page section img {
  width:80%;
}
.article__text{
  width: 80%;
  background-color: rgba(163, 211, 122, 0.404);
  border: 1px solid rgb(66, 206, 11);
}
.heart { 
    width:37px;
    height: 37px;
    border-radius: 100px; }

@media all and (max-width: 575.98px){
  html {
    font-size: 0.7rem;
  }
}
@media all and (min-width: 576px) and (max-width: 767.98px){
  html {
    font-size: 0.9rem;
  }
  .description {
    font-size: 0.6rem;
  }
}
@media all and (min-width: 768px) and (max-width: 1200px){
  .description {
    font-size: 0.8rem;
  }
  .mainHeader__img {
   height: 300px;
}
}

</style>
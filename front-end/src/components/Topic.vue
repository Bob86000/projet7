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
        <router-link class="nav-link btn btn-light" :to="{name:'home'}">Retour à l'accueil<span class="sr-only">(current)</span></router-link>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0 ">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Chercher des publications</button>
    </form>
  </nav>
</header>
<main class="row topic-page">
    <div class="loading d-flex justify-content-center" v-if="loadingTopic">
        <p>Les données sont en cours de récupération</p>
    </div>

    <div v-if="errorTopic" class="error">
      {{ errorTopic }}
    </div>

<section v-if="currentTopic" class="col-12 text-center ">
    <h2 class="col-12 ">{{ currentTopic.title}}</h2>
     <article class="col-12 mx-auto my-3 topic-article" >
                <div class="p-3 mb-2 bg-light text-dark d-flex flex-column justify-content-center align-items-center">
                    <img v-if="currentTopic.imageUrl" :src="currentTopic.imageUrl" alt="Image illustrant le commentaire">
                <p class="article__text">{{ currentTopic.text }} </p>
                </div>
                <div class="d-flex justify-content-between">
                 <p>{{currentTopic.createdAt.replace('T','_').slice(0,10)}}</p>
                 <p>{{ currentCommentsCount }} Commentaires</p>
                 <div class="d-flex align-items-center justify-content-between">
                    <p class="my-auto mx-2">{{currentTopic.likes}}</p> 
                 <button class="heart" ></button>
                 </div>
                 <div class="d-flex align-items-center justify-content-between">
                    <p class="my-auto mx-2">{{currentTopic.dislikes}}</p>
                    <button class="ace"></button>
                 </div>
                 <p>Publiée par {{currentTopic.user.name}}</p>    
                </div>
      </article>
      <div class="row d-flex" >
        <router-link :to="{name: 'addComment', params: { topicId: topicId}}" class="text-center btn btn-warning mx-auto my-3" >Ajouter un commentaire</router-link>
        <router-link v-if="userId==currentTopic.userId" :to="{name: 'home'}" class="text-center btn btn-danger mx-auto my-3" >Supprimer la publication</router-link>
      
      </div>
            <aside class="col-12" v-if="currentComments">
             <div v-for="currentComment in currentComments" :key="currentComment.id" class="  col-12 mx-auto my-3 d-flex flex-column text-black comment-aside" >
                <div class=" mb-2 bg-warning d-flex flex-column align-items-center justify-content-start text-white text-dark">
                    <img v-if="currentComment.imageUrl" :src="currentComment.imageUrl" alt="">
                <p  class="comment__text">{{currentComment.description}}</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p >{{currentComment.createdAt.replace('T','_').slice(0,10)}}</p>
                 <div class="d-flex align-items-center justify-content-between">
                    <p class="my-auto mx-2">{{currentComment.likes}}</p> 
                 <button class="heart" :id="'like'+currentComment.id" @click='testresult'></button>
                 </div>
                 <div class="d-flex align-items-center justify-content-between">
                    <p class="my-auto mx-2">{{currentComment.dislikes}}</p>
                    <button class="ace" ></button>
                 </div>
                 <p>Publiée par {{currentComment.user.name}}</p>    
                </div>
                <button v-if="userId==currentComment.userId" :id="'delete'+currentComment.id" class="text-center btn btn-danger mx-auto my-3" @click="deleteComment" >Supprimer la publication</button>
                </div>
                
                 </aside>
</section>
</main>
<footer class="iu">bloc footerssss</footer> 
</div>
</template>

<script>import TopicDataService from "../services/TopicDataService";
import CommentDataService from "../services/CommentDataService";

export default {
  name: "tutorial",
  data() {
    return {
      currentTopic: null,
      currentComments: null,
      currentCommentsCount:null,
      loadingTopic: false,
      loadingComment: false, 
      postTopic: null,
      postComment: null,
      errorTopic: null,
      errorComment: null,
      topicId: this.$route.params.id,
      userId: null
    };
  },mounted () {
      this.fetchDatas(this.$route.params.id);
      console.log(this.topicId);
  },
  methods: {
    fetchDatas (id) {
       // manage state of errors 
      this.errorTopic = this.postTopic = null;
      this.loadingTopic = true;
       this.errorComment = this.postComment = null;
      this.loadingComment = true;
      let getUserAuth = JSON.parse(localStorage.getItem("session")) || false;
      console.log(getUserAuth[0].userId);
      let userAuth = getUserAuth[0].userId.slice(16) || false;
      // Search Data to loading page
      TopicDataService.get(id)
      .then( response => {
          if (response.status == 200){
              this.currentTopic = response.data;
              this.userId = userAuth;
              console.log(this.userId)
              this.errorTopic = false
              this.postTopic = true;
                this.loadingTopic = false;
          console.log("héllos")}
          else {
              this.errorTopic = "Echec de la recupération des données";
              this.loadingTopic = false;
          }})
      .catch(response => {
          if (response.status != 200){
      this.errorTopic = "Echec de la recupération des données";
      this.loadingTopic = false;}});

      CommentDataService.getCountAndFindComment(id)
      .then( response => {
          if (response.status == 200){
              this.currentComments= response.data.rows
              this.currentCommentsCount= response.data.count;
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
    },
    testresult (e) {
      console.log(e.target.id);
    },
    deleteComment(e) {
      const deleteCommentId = (e.target.id).slice(6);
      const deleteAuth= { userId : this.userId }
      console.log (deleteCommentId);
      CommentDataService.delete(deleteCommentId, deleteAuth)
      .then( response => {
       if (response.status == 201){
                this.deleteComment = false;
              }
        else {
          return  console.log('echec de la supression du commentaire');
          }})
      .catch( () => {
     return console.log('echec de la supression du commentaire')});
  }
    
  }
}
</script>

<style>
html {
  font-size: 1rem;
}
.topic-page section img {
  width:80%;
}
.topic-page .topic-article{
  border: 8px solid rgb(240, 206, 94)
}
.topic-page .comment-aside{
  background-color:rgb(240, 206, 94);
   width:80%;
}
.topic-page .comment__text{
  width: 80%;
  word-break: break-all;
}
.topic-page .article__text{
  width: 80%;
  background-color: rgba(202, 211, 122, 0.404);
  border: 1px solid rgb(190, 174, 21);
  word-break: break-all;
  margin-top: 1rem;
}
.topic-page .ace {
 width:37px;
    height: 37px;
    background: url("../assets/miniace.jpg");
    background-size: 32px;
    border-radius: 100px;
}
.topic-page .heart {
 width:37px;
    height: 37px;
    background: url("../assets/miniheart.jpg");
    background-size: 32px;
    border-radius: 100px;
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
  .topic-page .description {
    font-size: 0.6rem;
  }
}
@media all and (min-width: 768px) and (max-width: 1200px){
  .topic-page .description {
    font-size: 0.8rem;
  }
}

</style>
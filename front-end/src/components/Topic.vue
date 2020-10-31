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
<main class="row">
    <div class="loading d-flex justify-content-center" v-if="loadingTopic">
        <p>Les données sont en cours de récupération</p>
    </div>

    <div v-if="errorTopic" class="error">
      {{ errorTopic }}
    </div>

<section v-if="currentTopic" class="col-12 text-center ">
    <h2 class="col-12 ">{{ currentTopic.title}}</h2>
     <article class="col-12 mx-auto my-3 btn btn-light bg-warning" >
                <div class="p-3 mb-2 bg-light text-dark d-flex align-items-center justify-content-between">
                    <img v-if="currentTopic.imageUrl" :src="currentTopic.imageUrl" alt="Image illustrant le commentaire">
                <p>{{ currentTopic.text }} </p>
                </div>
                <div class="d-flex justify-content-between">
                 <p>{{currentTopic.createdAt.replace('T','_').slice(0,10)}}</p>
                 <p>{{ currentCommentsCount }} Commentaires</p>
                 <div class="d-flex align-items-center justify-content-between">
                    <p class="my-auto mx-2">{{currentTopic.likes}}</p> 
                 <button class="heart"></button>
                 </div>
                 <div class="d-flex align-items-center justify-content-between">
                    <p class="my-auto mx-2">{{currentTopic.dislikes}}</p>
                    <button class="ace"></button>
                 </div>
                 <p>Publiée par {{currentTopic.userId}}</p>    
                </div>
      </article>
            <aside class="col-12 " v-if="currentComments">
             <div v-for="currentComment in currentComments" :key="currentComment.id" class="  col-12 mx-auto my-3 bg-light text-black" >
                <div class=" mb-2 bg-warning text-white text-dark">
                    <img v-if="currentComment.imageUrl" :src="currentComment.imageUrl" alt="">
                <p>{{ currentComment.description}} </p>
                </div>
                <div class="d-flex justify-content-between">
                  <p>{{currentComment.createdAt.replace('T','_').slice(0,10)}}</p>
                 <div class="d-flex align-items-center justify-content-between">
                    <p class="my-auto mx-2">{{currentComment.likes}}</p> 
                 <button class="heart"></button>
                 </div>
                 <div class="d-flex align-items-center justify-content-between">
                    <p class="my-auto mx-2">{{currentComment.dislikes}}</p>
                    <button class="ace"></button>
                 </div>
                 <p>Publiée par {{currentComment.userId}}</p>    
                </div>
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
      errorComment: null
    };
  },mounted () {
      this.fetchDatas(this.$route.params.id);
  },
  methods: {
    fetchDatas (id) {
       // manage state of errors 
      this.errorTopic = this.postTopic = null;
      this.loadingTopic = true;
       this.errorComment = this.postComment = null;
      this.loadingComment = true;
      // Search Data to loading page
      TopicDataService.get(id)
      .then( response => {
          if (response.status == 200){
              this.currentTopic = response.data;
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
    }  
  }
}
</script>

<style>
html {
  font-size: 1rem;
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
  .description {
    font-size: 0.6rem;
  }
}
@media all and (min-width: 768px) and (max-width: 1200px){
  .description {
    font-size: 0.8rem;
  }
}
.ace {
 width:37px;
    height: 37px;
    background: url("../assets/miniace.jpg");
    background-size: 32px;
    border-radius: 100px;
}
.heart {
 width:37px;
    height: 37px;
    background: url("../assets/miniheart.jpg");
    background-size: 32px;
    border-radius: 100px;
}
</style>
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
      <div v-if="!submitted">
        <div class="form-group">
          <label for="title">Title</label>
          <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="topic.title"
          name="title"
          />
        </div>

        <div class="form-group">
          <label for="description">Text</label>
          <input
          class="form-control"
          id="description"
          required
          v-model="topic.text"
          name="description"
          />
        </div>
      </div>
  <span v-if="!files">No files selected</span>
<ul v-else>
  <li v-for="file in files" :key="file.name">nom de fichier: {{file.name}} <br> taille: {{file.size}}Octect</li>
  
</ul>
      <label for="file" ></label>
     <input type="file" class="file" @change="filesSelected" />
      
      <button to="/" class="nav-link text-center btn btn-secondary" @click="newTopic" >Envoyer</button>
</div>
</div>
</template>

<script>

import TopicDataService from "../services/TopicDataService";

export default {
  name: "add-topic",
  data() {
    return {
      topic: {
        id: null,
        title: "",
        text: "",
        files: false,
      }
    };
  },
  methods: {

    fetchDataddTopic () {
      console.log("heldddddlo");
    
    },
    filesSelected(e) {
    this.files = e.target.files;
    console.log(this.files);
    console.log(this.files[0])
    },
    newTopic () {
      console.log("heeddddddddllo");

       let textdata = {
        title: this.topic.title,
        text: this.topic.text
      };

      console.log("Textdata");
    let formData = this.files[0];

    let anothertextdata = { formData, title: this.topic.title, descriptions : this.topic.description };
    console.log(anothertextdata);

    let data = { formData, textdata};
    console.log(data);

    console.log(textdata);

     TopicDataService.create(data)
        .then(response => {
          this.topic.id = response.data.id;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

  },
  mounted () {
    this.fetchDataddTopic() 
  }
  }
</script>

<style>
</style>

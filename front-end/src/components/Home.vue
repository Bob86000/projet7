<template>
 <div>
<header class="navbar navbar-expand-lg navbar-light bg-light">
  <h1 class="navbar-brand" href="#">Groupomania</h1>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <nav class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" :to="{name:'topics'}">Les publications<span class="sr-only">(current)</span></router-link>
      </li>
      <li class="nav-item active">
        <router-link class="nav-link" :to="{name: 'home'}">Les commentaires</router-link>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </nav>
</header>
<main>
    <router-view  name="sectionHeader"></router-view>
<section class="row">
    
             <article class="col-8">
                
                <router-view  name="article"></router-view>
                
             </article>
</section>
         <aside class="iu"><router-view  name="aside"></router-view></aside>
</main>
<footer class="iu">bloc footer</footer> 
</div>
</template>

<script>

export default {
 name: "Topic-list",
  data() {
    return {
      topics: [],
      comments: [],
      currentTutorial: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
  }
};
</script>

<style>
</style>
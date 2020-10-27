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
        <a class="nav-link" href="#">Les publications<span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="#">Les commentaires</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </nav>
</header>
<main>
    <div class="row header-main">
        4 Bloc affiché
    </div>
<section class="row">
             <article class="col-8">
                 1 bloc publication + commentaire masqué
             </article>
</section>
         <aside class="iu"></aside>
</main>
<footer class="iu">bloc footer</footer> 
</div>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  name: "login",
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      submitted: false
    };
  },
  methods: {
    connectUser() {
      var user = {
        email: this.user.email,
        password: this.user.password
      };


       UserDataService.connect(user)
        .then(response => {
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
  }
};
</script>

<style>
</style>
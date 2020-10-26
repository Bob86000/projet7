<template>
  <div id="app"> 
      

      
    <div class="container">
      <div class="row">
        <h1 class="mx-auto my-3">Groupomania</h1>
      </div>
      <nav class="navbar navbar-expand">
      <div class="navbar-nav mx-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Inscription</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Connexion</router-link>
        </li>
      </div>
    </nav>
      <div class="row">
        <router-view />
        </div>
        
        
      
    
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

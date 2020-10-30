<template>
 <div>
   <div class="row">
        <h1 class="mx-auto my-3">Groupomania</h1>
   </div>
  <nav v-if="id=='signup'" class="navbar navbar-expand">
      <div class="navbar-nav mx-auto">
        <li class="nav-item">
          <p class="nav-link">Inscription</p>
        </li>
        <li class="nav-item">
         <button class="btn btn-info nav-link" @click="loginSwitch">Connexion</button>
        </li>
      </div>
    </nav>
    <nav v-else class="navbar navbar-expand">
      <div class="navbar-nav mx-auto">
        <li class="nav-item">
          <button class="btn btn-info nav-link" @click="signupSwitch">Inscription</button>
        </li>
        <li class="nav-item">
          <p class="nav-link">Connexion</p>
        </li>
      </div>
    </nav>
  <div class="submit-form">
    <div >
      <div class="form-group">
        <label for="title">Email</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="user.email"
          name="title"
          v-bind:placeholder="id"
        />
      </div>

      <div class="form-group">
        <label for="description">Password</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="user.password"
          name="description"
        />
      </div>
        <div class="d-flex" >
      <router-link v-if="id=='signup'"  :to="{name: 'home'}" class=" btn btn-success mx-auto my-3" >Valider</router-link>
      <router-link v-else :to="{name: 'home'}" class=" btn btn-success mx-auto my-3" >Valider</router-link>
    </div>
      <div v-if="alert" class="alert alert-success" role="alert">
        Une erreur est survenue, vérifier vos informations
      </div>

    </div>
  </div>
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
      submitted: false,
      id: "signup",
      alert : false
    };
  },
  methods: {
    loginSwitch() {
       return this.id = "login";
      },
      signupSwitch() {
      return this.id = "signup";
      }
  },
  beforeRouteLeave ( route, redirect,next) {

      var user = {
        email: this.user.email,
        password: this.user.password
      };
        if (this.id == 'signup') {
      UserDataService.create(user)
        .then(response => {
          if (response.status == 200){
          this.submitted = true;
          next()
          }
          else  { 
              console.log("une erreur est survenue");
              this.alert = true;}
        })
        .catch(e => {
          console.log(e);
          this.alert = true;
        });
      }

      else if (this.id == 'login') {
          UserDataService.connect(user)
        .then(response => {
          if (response.status == 200){
          this.submitted = true;
          next()
          }
          else  { 
              console.log("une erreur est survenue");
              this.alert = true;}
        })
        .catch(e => {
          console.log(e);
          this.alert = true;
        });
      }
      else this.alert = true;
      }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>

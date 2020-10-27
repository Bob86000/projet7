<template>
<div>
  <div class="row">
        <h1 class="mx-auto my-3">Groupomania</h1>
   </div>
  <nav v-if="!submitted" class="navbar navbar-expand">
      <div class="navbar-nav mx-auto">
        <li class="nav-item">
          <p class="nav-link">Inscription</p>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Connexion</router-link>
        </li>
      </div>
    </nav>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Email</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="user.email"
          name="title"
          placeholder="Inscription"
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

      <router-link  :to="{name: 'home'}" @click="saveUser" class="btn btn-success">Valider</router-link>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
</div>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  name: "signup",
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      submitted: false,
    };
  },
  methods: {
    saveUser() {
      var user = {
        email: this.user.email,
        password: this.user.password
      };
      console.log("test1");

       UserDataService.create(user)
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
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>

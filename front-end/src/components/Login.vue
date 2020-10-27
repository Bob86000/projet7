<template>
 <div>
   <div class="row">
        <h1 class="mx-auto my-3">Groupomania</h1>
   </div>
  <nav v-if="!submitted" class="navbar navbar-expand">
      <div class="navbar-nav mx-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Inscription</router-link>
        </li>
        <li class="nav-item">
          <p class="nav-link">Connexion</p>
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
          placeholder="Connexion"
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
      <router-link  :to="{name: 'home'}" @click="connectUser" class="btn btn-success" tag="button">Valider</router-link>
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

      console.log(user.email);
      console.log(user.password);
      console.log(user);


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
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>

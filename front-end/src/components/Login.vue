<template>
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
          placeholder="connexion"
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

      <button @click="connectUser" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
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

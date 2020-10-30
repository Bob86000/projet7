<template>
<div>
    <div class="d-flex" >
      <router-link :to="{name: 'home'}" class="text-justify btn btn-success mx-auto my-3" >Ajouter un commentaire</router-link>
    </div>
     v-for="(topics, comments) in tutorials" class="row header-main">
        {{ }}
    </div>
</template>

<script>
export default {
  name: "add-tutorial",
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<style>
</style>

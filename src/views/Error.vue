<template>
  <div class="text-center container my-3">
    <h1>404</h1>
    <p>Oops! Something is wrong.</p>
    <router-link class="btn btn-primary" :to="{path: '/'}">Go back to safety!</router-link>
  </div>
</template>

<script>
export default {
  name: 'Error'
}
</script>

<style scoped>
.button {
  font-weight: 300;
  color: #fff;
  font-size: 1.2em;
  text-decoration: none;
  border: 1px solid #efefef;
  padding: 0.5em;
  border-radius: 3px;
  float: left;
  margin: 6em 0 0 -155px;
  left: 50%;
  position: relative;
  transition: all 0.3s linear;
}

.button:hover {
  background-color: #007aff;
  color: #fff;
}

p {
  font-size: 2em;
  text-align: center;
  font-weight: 100;
  color: #fff;
}

h1 {
  text-align: center;
  font-size: 15em;
  font-weight: 100;
  color: #fff;
}
</style>
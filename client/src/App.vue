<template>
  <div id="app">
    <MainHeader></MainHeader>  
    <router-view/>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader'
export default {
  name: 'app',
  components: {
    MainHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

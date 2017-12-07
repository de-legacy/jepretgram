<template>
  <div class="status-area">
   <div class="status-item" v-for="(status, index) in statuses" :key="index">
     <img class="small-img" :src="status.image" :alt="status.title">
     <h2 class="status-caption">{{ status.caption }}</h2>
     <a href="#" @click.prevent="doLike(index, status._id)">Like It</a>
   </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MainPage',
  data () {
    return {
     
    }
  },
  methods: {
    ...mapActions([
      'getStatuses'
    ]),

    doLike(status, index) {
      console.log("Like ", status, index)
    }
  },
  computed: {
    ...mapState([
      'statuses'
    ])
  },
  created() {
    this.getStatuses();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .small-img {
    max-width: 300px;
  }

  .status-area {
    text-align: center;
  }
</style>

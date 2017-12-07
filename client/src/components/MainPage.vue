<template>
  <div class="status-area">
   <div class="status-item" v-for="(status, index) in statuses" :key="index">
     <img class="small-img" :src="status.image" :alt="status.title">
     <h2 class="status-caption">{{ status.caption }}</h2>
     <small>{{ status._id }}</small>
      <p> <a href="#" class="btn btn-primary" @click.prevent="givComment(status, index)">Give Comment</a> </p>

     <h3>
       <a href="#" @click.prevent="doLike(status, index)">Like => {{ status.likelist.length }} </a>
     </h3>
     
     <h3><a href="#" @click.prevent="doDelete(status._id, index)">Delete</a></h3>

     <h4>Komentar</h4>
     <div class="alert alert-warning" v-for="(comment, index) in status.commentlist" :key="index">
       <p> {{ comment }}</p>
     </div>
   </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MainPage',
  data () {
    return {
      likeCount : 0
    }
  },
  methods: {
    ...mapActions([
      'getStatuses',
      'deleteStatus',
      'likeStatus',
      'setComment'
    ]),

    givComment(status, index){
      var comment = prompt("Enter Your Comment");

      console.log("Komentar anda ", comment)

      if (comment.length > 2) {
         let commentData = {
          index: index,
          id: status._id,
          accountId: this.loggedinUser.id,
          content: comment
        }

        this.setComment(commentData)
      } else {
        alert('Isi komentar minimal 3 Karakter')
      }
    },

    doLike(status, index) {
      var arrLikeList =  this.statuses[index].likelist;
      var owner = this.statuses[index].owner
      
      if ((owner === this.loggedinUser.id)) {
        alert("Tidak bisa like sendiri")

      } else {

        if (arrLikeList.length === 0) {
          this.likeStatus({
            id: status._id,
            index: index,
            accountId: this.loggedinUser.id
          })
        } else {
          if (arrLikeList.indexOf(this.loggedinUser.id) >= 0) {
            this.likeStatus({
              id: status._id,
              index: index,
              accountId: this.loggedinUser.id
            })
          } else {
            alert("Sudah like")
          }
        }
      }
   
    },

    doDelete(statusId, index) {
      this.deleteStatus({
        id: statusId,
        index: index
      })
    }
  },
  computed: {
    ...mapState([
      'statuses',
      'loggedinUser'
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

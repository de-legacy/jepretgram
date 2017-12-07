<template>
  <div class="header container">
     <h1>Jepretgram</h1>
    
     <a href="#" class="btn btn-success" data-toggle="modal" data-target="#registerModal">Register</a>
     <a href="#" class="btn btn-danger" data-toggle="modal" data-target="#loginModal">Login</a>
     <a href="#" class="btn btn-default" @click.prevent="doLogout">Logout</a>
     <a href="#" class="btn btn-info" data-toggle="modal" data-target="#newStatusModal">New Status</a>

     <!-- Modal -->
    <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="registerModalLabel">Register</h4>
          </div>
          <div class="modal-body">
            <input type="text" id="reg_username" ref="reg_username" placeholder="username">
            <input type="password" id="reg_password" ref="reg_password" placeholder="password">
            <input type="email" id="reg_email" ref="reg_email" placeholder="email">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click.prevent="doRegister">Register</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="loginModalLabel">Login</h4>
          </div>
          <div class="modal-body">
            <input type="text" id="username" ref="username" placeholder="username">
            <input type="password" id="password" ref="password" placeholder="password">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click.prevent="doLogin">Login</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="newStatusModal" tabindex="-1" role="dialog" aria-labelledby="newStatusModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="newStatusModalLabel" data-dismiss="modal" aria-label="Close">New Status</h4>
          </div>
          <div class="modal-body">
            <div class="uploader">
								<div v-if="!uploadImage">
									<label>Pilih gambar</label>
									<input type="file" @change="onFileChange">
								</div>

								<div v-else>
                  <img clas="small-thumbnai" :src="uploadImage" />
                  <button class="btn btn-danger" @click.prevent="removeImage">Remove</button>
								</div>

							</div>

            
            <input type="text" id="caption" name="caption" ref="caption" placeholder="Caption">

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click.prevent="doNewStatus">Add Status</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'MainHeader',
  data () {
    return {
      uploadImage : '',
			uploadFile: '',
    }
  },
  methods: {
    ...mapActions([
      'setLogin',
      'createStatus'
    ]),

    ...mapMutations([
      'setStatus'
    ]),

    doNewStatus() {
      var formData = new FormData();
			formData.append('caption', this.$refs.caption.value);
			formData.append('owner',  this.loggedinUser.id);
      formData.append('image',  this.uploadFile);
      
      this.createStatus(formData)
    },

    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },

    createImage(file) {
      // console.log('~~~~ Image ini file', file);
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

     reader.onload = (e) => {
        vm.uploadImage = e.target.result;
      };

      reader.readAsDataURL(file);
      this.uploadFile = file;
    },

    removeImage: function (e) {
      this.uploadImage = ''
      this.uploadFile = ''
    },

    doLogin () {
      let username = this.$refs.username.value;
      let password = this.$refs.password.value;

      console.log('Login ', username, password)

      let data = {
        username: username,
        password: password
      }

      this.setLogin(data)
    },

    doRegister() {
      let username = this.$refs.reg_username.value;
      let password = this.$refs.reg_password.value;
      let email = this.$refs.reg_email.value;

      console.log('~~ Creating Account')

      if (password.length > 2) {
        let data = {
          username: username,
          password: password,
          email: email
        }

        this.$http.post('/api/accounts/create', data)
          .then(({data}) => {
            alert('Account created')
            console.log('New Account ', data.account)

          }).catch(err => console.log({ message: 'Something wrong', error: err.message }));
      }

    },

    doLogout() {
      localStorage.removeItem('id'),
      localStorage.removeItem('email'),
      localStorage.removeItem('token'),
      localStorage.removeItem('username')

      this.loggedinUser = {
        id: null,
        email: null,
        token: null,
        username: null
      }

      alert("Logout berhasil")
    }
  },
  computed: {
    ...mapState([
      'statuses',
      'loggedinUser'
    ])
  },
  created() {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

new Vue({
  el: '#app',
  data: {
    email: '',
    password: '',
    isLogin: false,
    jokes: []
  },
  created() {
    if(localStorage.getItem('token')) {
      this.isLogin = true
    }

    this.fetchJoke()
  },
  methods: {
    login() {
      axios
        .post(`http://localhost:3000/login`, {
          email: this.email,
          password: this.password
        })
          .then(user => {
            console.log('success logged in')
            const { token, id, email, name } = user.data
            localStorage.setItem('token', token)
            localStorage.setItem('id', id)
            localStorage.setItem('name', name)
            localStorage.setItem('email', email)
            this.isLogin = true
            swal("Success Login!", "You clicked the button!", "success");
          })
          .catch(err => {
            console.log(err.response)
            swal("email/password wrong!", "You clicked the button!", "error");
          })
    },
    logout() {
      localStorage.clear()
      this.isLogin = false
      swal("Success Logout!", "You clicked the button!", "success");
    },
    fetchJoke() {
      axios
        .get('http://localhost:3000/jokes', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            this.jokes = data
          })
          .catch(err => {
            console.log(err)
          })
    },
    addJoke() {
      axios
        .get('http://localhost:3000/favorites', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(joke => {
            console.log(joke)
          })
          .catch(err => {
            console.log(err)
          })
    },
    findAllJoke() {
      axios
        .get('http://localhost:3000/jokes', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(() => {

          })
          .catch(err => {
            console.log(err)
          })
    }
  } 
})
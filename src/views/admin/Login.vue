/**
 * Created by joriscai on 2017/4/1.
 * This is Login.vue
 */
<template>
  <div class="full-bg">
    <div class="login">
      <div class="input-box">
        <input class="login-input" v-focus :class="{'error': e_error}" type="text" v-model.lazy="Email" placeholder="Email Address">
      </div>
      <div class="input-box">
        <input class="login-input" :class="{'error': p_error}" @keyup.enter="submit" type="password" v-model.lazy="Password" placeholder="Password">
      </div>
      <button type="button" class="btn" @click="submit">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      email_test: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/g,
      Email: '',
      Password: '',
      e_error: '',
      p_error: ''
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        // 聚焦元素
        el.focus()
      }
    }
  },
  watch: {
    Email: function () {
      if (!this.email_test.test(this.Email)) {
        this.e_error = true
      } else {
        this.e_error = false
      }
    },
    Password: function () {
      this.p_error = (this.Password === '')
      console.log('pwd change ' + this.p_error)
    }
  },
  methods: {
    submit: function () {
      if (!this.e_error && this.e_error !== ''
          && !this.p_error && this.p_error !== '') {
        console.log(true)
        // ajax
      } else if (this.e_error === false) {
        this.p_error = true
        console.log('p ' + false)
      } else if ((this.p_error === false || this.p_error === '') && this.e_error === '') {
        this.e_error = true
        console.log('e ' + false)
      } else if (this.e_error && this.p_error) {
        console.log('all ' + false)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.full-bg{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.login{
  background: #f8fbfd;
  border: 1px solid #dae1e3;
  border-radius: 5px;
  width: 20em;
  margin: 0 auto;
  position: relative;
  padding: 3em;
  .input-box{
    margin-bottom: 1em;
    .error{
      border-color: red!important;
    }
  }
  .login-input{
    padding: 10px;
    border: 1px solid #dae1e3;
    font-size: 1rem;
    line-height: 1.4em;
    width: 100%;
    box-sizing: border-box; // 解决input设置padding时，宽度超出问题
    border-radius: 4px;
    &:focus{
      outline: 0;
      border-color: #b1b1b1;
    }
  }
  .btn{
    background: #5ba4e5;
    border: 1px solid #308ddf;
    color: #fff;
    width: 100%;
    line-height: 1.4em;
    height: 3.3em;
    border-radius: 4px;
    outline: 0;
    cursor: pointer;
    &:hover,&:focus{
      background: #308ddf;
    }
  }
}
</style>

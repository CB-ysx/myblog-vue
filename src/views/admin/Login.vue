/**
 * Created by joriscai on 2017/4/1.
 * This is Login.vue
 */
<template>
  <div class="full-bg">
    <div class="login">
      <div class="input-box">
        <input class="login-input" :class="{'error': $v.Email.$error}" type="text" @input="$v.Email.$touch()" v-model.trim="Email" placeholder="Email Address">
      </div>
      <div class="input-box">
        <input class="login-input" :class="{'error': $v.password.$error}" @keyup.enter="submit($v)" @input="$v.password.$touch()" type="password" v-model.trim="password" placeholder="Password">
      </div>
      <button type="button" class="btn" @click="submit($v)">Login</button>
      <div class="error-text">
        <span v-if="$v.Email.$error">Email is invalid.</span>
        <span v-if="!$v.password.required && $v.password.$error">Password must required.</span>
        <span v-if="!$v.password.minLength">Password must have at least {{ $v.password.$params.minLength.min }} letters.</span>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'

let url = ''
export default {
  name: 'login',
  data () {
    return {
      Email: '',
      password: ''
    }
  },
  validations: {
    Email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
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
  methods: {
    submit: function ($v) {
      $v.$touch()
      let data = {
        username: this.Email,
        password: this.password
      }
      this.$http.post(url, data).then(res => {
        console.log(res.data)
      }, res => {
        console.log(res)
      })
    }
  },
  mounted () {
    url = this.$root.$data.login
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
  .error-text{
    color: red;
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

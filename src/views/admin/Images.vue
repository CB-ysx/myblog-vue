/**
 * Created by joriscai on 2017/5/10.
 * This is Images.vue
 */
<template>
  <div class="images">
    <header class="border-shadow">
      <!-- Title  -->
      <h3 class="title border-shadow">
        {{ title }}
      </h3>
      <!-- button -->
      <div class="btn-box">
        <button type="button" ref="add" class="btn success">Add</button>
      </div>
    </header>
    <!-- images list -->
    <div class="main">
      <ul>
        <li v-for="(img, index) in images">
          <div class="img-box" :data-index="index" @click="showImgDetail(img)">
            <img :src="img.img" :alt="img.title" :title="img.title">
            <span>{{ img.title }}</span>
          </div>
        </li>
      </ul>
      <template v-if="curent">
        <div class="detail-box">
          <div class="close" @click="closeImage">X</div>
          <div class="show-img">
            <img :src="curent.Bimg" :alt="curent.title" :title="curent.title">
          </div>
          <h4>
            <span @dblclick="edit(curent.id, curent.title)" v-if="!editId">{{ curent.title }}</span>
            <input type="text" name="" v-model="editText" v-if="editId" v-focus @keyup.enter="submit" @blur="submit">
          </h4>
        </div>
      </template>
    </div>
  </div>
</template>

<script>

let url = ''
export default {
  name: 'images',
  data () {
    return {
      title: 'Images page',
      images: [],
      curent: '',
      editId: '',
      editText: ''
    }
  },
  methods: {
    showImgDetail: function (id) {
      this.curent = id
      console.log(this.editId)
    },
    closeImage: function () {
      this.curent = ''
    },
    edit: function (id, title) {
      this.editId = id
      this.editText = title
    },
    submit: function () {
      if (this.editText !== this.curent.title) {
        this.$http.put(url).then(res => {
          console.log(res.data)
          this.curent.title = this.editText
        }, res => {
          console.log(res)
        })
      }
      this.editId = ''
    }
  },
  mounted () {
    url = this.$root.$data.image
    // Get the Images data
    this.$http.get(url).then(res => {
      console.log(res.data)
      this.images = res.data
    }, res => {
      console.log(res)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.detail-box{
  position: fixed;
  right: 10%;
  top: 10%;
  width: 80%;
  height: 80%;
  text-align: center;
  background: white;
  box-shadow: 0 0 20px 0;
  z-index: 200;
  padding: 1em;
  .close{
    position: absolute;
    z-index: 300;
    right: -1em;
    top: -1em;
    cursor: pointer;
    width: 2em;
    height: 2em;
    line-height: 2em;
    text-align: center;
    border: 1px solid #f9f9f9;
    box-shadow: 0px 0px 1px 0px;
    border-radius: 50%;
    background-color: #f9f9f9;
  }
  .show-img{
    height: 91%;
    background: url('../../assets/images/loading.gif') no-repeat center;
    img{
      max-height: 100%;
      max-width: 100%;
    }
  }
}
.images{
  display: flex;
  flex: 1;
  flex-direction: column;
  line-height: 1.6em;
  header{
    display: flex;
    justify-content: space-between;
  }
  .title{
    padding: 0.8em;
    font-size: 1.2em;
    border: none;
    outline: none;
    font-weight: 600;
    flex: 1;
  }
  .btn-box{
    padding: 0.5em;
  }
  li{
    text-align: center;
    display: inline-block;
  }
  .main{
    padding: 0.8em;
    overflow-y: auto;
    position: relative;
  }
  .img-box{
    display: inline-block;
    padding: 0.5em;
    margin: 0.6em;
    background-color: white;
    box-shadow: 0px 0px 15px 0px;
    &:hover{
      transform: rotate(0)!important;
      transform: scale(1.1)!important;
      background-color: white;
      z-index: 100;
      position: relative;
    }
    img{
      display: block;
      margin-bottom: 0.5em;
    }
  }
}
</style>

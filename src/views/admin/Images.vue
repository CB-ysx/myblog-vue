/**
 * Created by joriscai on 2017/5/10.
 * This is Images.vue
 */
<template>
  <div class="images">
    <div class="left-box">
      <header class="border-shadow">
        <!-- Title  -->
        <h3 class="title border-shadow">
          {{ title }}
        </h3>
        <!-- button -->
        <div class="btn-box">
          <svg t="1494660655155" @click="showUpload = !showUpload" :class="{'active': showUpload}" class="icon menu-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="975">
            <path d="M0 136.973854l1024 0 0 87.786977-1024 0 0-87.786977Z" p-id="976"></path>
            <path d="M0 465.419671l1024 0 0 87.786977-1024 0 0-87.786977Z" p-id="977"></path>
            <path d="M0 799.206456l1024 0 0 87.819689-1024 0 0-87.819689Z" p-id="978"></path>
          </svg>
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
      </div>
      <!-- images show -->
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
    <!-- upload -->
    <div class="upload-box" v-show="showUpload">
      <vue-clip :options="options" :on-init="init" :on-added-file="addedFile" :on-sending="sending" :on-complete="complete">
        <!-- upload area -->
        <template slot="clip-uploader-action" scope="params">
          <div :class="{'is-dragging': params.dragging}" class="upload-action">
            <div class="dz-message"><h5> Click or Drag and Drop files here upload </h5></div>
          </div>
        </template>
        <!-- upload list -->
        <template slot="clip-uploader-body" scope="props">
          <div class="upload-list">
            <ul>
              <li v-for="(file, index) in props.files">
                <div class="file-avatar">
                  <img v-bind:src="file.dataUrl" />
                </div>
                <div class="file-detail">
                  <div class="file-name">{{ file.name }}</div>
                  <div class="file-progress">
                    <span :style="{ width: file.progress + '%' }"> </span>
                  </div>
                  <div class="file-meta">
                    {{ (file.size / 1024 / 1024).toFixed(2) }}MB
                    <span class="file-status">{{ file.status }}</span>
                  </div>
                </div>
                <div class="btn-box" v-if="file.status === 'success'" @click="delUploadImg(index, props.files)">
                  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6820" class="icon del-icon">
                    <path d="M286.974967 895.097188c-8.493441 0-15.349593-6.856152-15.349593-15.349593l0-595.052554c0-8.493441 6.856152-15.349593 15.349593-15.349593s15.349593 6.856152 15.349593 15.349593l0 595.052554C302.32456 888.138706 295.468408 895.097188 286.974967 895.097188z" p-id="6821"></path>
                    <path d="M735.285412 895.097188l-448.310446 0c-8.493441 0-15.349593-6.856152-15.349593-15.349593s6.856152-15.349593 15.349593-15.349593l448.310446 0c8.493441 0 15.349593 6.856152 15.349593 15.349593S743.778854 895.097188 735.285412 895.097188z" p-id="6822"></path>
                    <path d="M737.025033 895.097188c-8.493441 0-15.349593-6.856152-15.349593-15.349593l0-595.052554c0-8.493441 6.856152-15.349593 15.349593-15.349593s15.349593 6.856152 15.349593 15.349593l0 595.052554C752.374626 888.138706 745.518474 895.097188 737.025033 895.097188z" p-id="6823"></path>
                    <path d="M168.373779 220.636073l687.252443 0 0 30.699186-687.252443 0 0-30.699186Z" p-id="6824"></path>
                    <path d="M367.202173 105.514125l289.595654 0 0 30.699186-289.595654 0 0-30.699186Z" p-id="6825"></path>
                    <path d="M426.553932 281.727453l30.699186 0 0 369.311207-30.699186 0 0-369.311207Z" p-id="6826"></path>
                    <path d="M566.746882 281.727453l30.699186 0 0 369.311207-30.699186 0 0-369.311207Z" p-id="6827"></path>
                  </svg>
                </div>
              </li>
            </ul>
          </div>
        </template>
      </vue-clip>
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
      editText: '',
      showUpload: false,
      options: {
        url: url,
        // parallelUploads: 2,
        // uploadMultiple: true,
        autoProcessQueue: false,
        acceptedFiles: 'image/*'
      },
      files: 0,
      baseUrls: new Set()
    }
  },
  methods: {
    init (uploader) {
      this._upload = uploader.uploader._uploader
    },
    addedFile (file) {
      let that = this
      let addOption = this._upload.options
      // to set default setting
      addOption.autoProcessQueue = false
      that.baseUrls.clear()

      this._upload.on('thumbnail', function (file, dataUrl) {
        // console.log(that.baseUrls.length)
        // if (that.baseUrls[that.baseUrls.length - 1] === dataUrl) {
        //   return
        // } else {
        //   that.baseUrls.push(dataUrl)
        // }

        // reduce duplication run and count files has make thumbnail
        if (that.baseUrls.has(dataUrl)) {
          return
        } else {
          that.baseUrls.add(dataUrl)
        }

        // make thumbnail, and to upload
        // if (file.status === 'queued') {
        //   setTimeout(((function (_this) {
        //     return function () {
        //       addOption.autoProcessQueue = true
        //       return _this.processQueue()
        //     }
        //   })(this)), 800 * addOption.parallelUploads / 2)
        // }

        // make all thumbnails and then to upload
        if (that.baseUrls.size >= this.getQueuedFiles().length / 3 * 2) {
          console.log(addOption.autoProcessQueue)
          setTimeout(((function (_this) {
            return function () {
              addOption.autoProcessQueue = true
              return _this.processQueue()
            }
          })(this)), 1000)
        }
      })
    },
    sending (file, xhr, formData) {
      // console.log(file.dataUrl)
      formData.append('baseImg', file.dataUrl)
    },
    complete (file, status, xhr) {
      if (xhr.response) {
        file['id'] = JSON.parse(xhr.response).id
      }
    },
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
    },
    delUploadImg: function (index, files) {
      console.log(files)
      this.$http.delete(url + '/' + files[index]['id']).then(res => {
        if (res.data === 'deleted') {
          files.splice(index, 1)
        }
        console.log(res.data)
      }, res => {
        console.log(res)
      })
    }
  },
  beforeCreate () {
    url = window.blogUrl.image
  },
  mounted () {
    // Get the Images data
    this.$http.get(url).then(res => {
      console.log(res.data)
      this.images = res.data
    }, res => {
      console.log(res.status)
      if (res.status === 401) {
        this.$router.push({path: '/login'})
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.upload-action{
  margin: 0.5em;
  border: 2px dashed #0087F7;
  padding: 0.5em;
  border-radius: 5px;
  &.is-dragging, &:hover {
    background: #C9E3F7;
  }
}
.upload-list{
  padding: 0.5em;
  color: #aaa;
  li{
    border-top: 1px solid #dfe1e3;
    padding: 5px 0;
    display: flex;
  }
  .file-avatar{
    width: 60px;
    img{
      width: 100%;
      display: block;
    }
  }
  .file-detail{
    flex: 1;
    padding-left: 0.5em;
    .file-status{
      color: #2c3e50;
    }
  }
  .file-progress{
    padding: 2px 0;
    height: 4px;
    background: #eee;
    position: relative;
    span{
      display: block;
      height: 100%;
      background: #5cb85c;
    }
  }

}
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
  line-height: 1.6em;
  flex-direction: row;
  .left-box{
    display: flex;
    flex: 1;
    flex-direction: column;
  }
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
  .main{
    flex: 1;
    li{
      text-align: center;
      display: inline-block;
    }
    padding: 1em;
    overflow-y: auto;
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
  .upload-box{
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    border-left: 1px solid rgba(0, 0, 0, 0.25);
    animation: showToleft .5s forwards;
  }
}
.icon{
  &.active{
    fill: #5cb85c;
  }
}
</style>

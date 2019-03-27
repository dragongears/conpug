<template>
  <div>
    <v-btn dark class="btn-upload"
      @click.native="selectFile"
      v-if="!uploading"
    >
      <v-icon>add_a_photo</v-icon>
    </v-btn>
    <input
        id="files"
        type="file"
        name="file"
        ref="uploadInput"
        accept="image/*"
        :multiple="false"
        @change="detectFiles($event)" />
    <!--<v-progress-circular-->
        <!--v-if="uploading"-->
        <!--:size="100"-->
        <!--:width="15"-->
        <!--:rotate="360"-->
        <!--:value="progressUpload"-->
        <!--color="primary">-->
      <!--{{ progressUpload }}%-->
    <!--</v-progress-circular>-->
    <!--<div v-if="currentImgUrl !== ''">-->
      <!--<v-btn-->
          <!--class="ma-0"-->
          <!--dark-->
          <!--small-->
          <!--color="error"-->
          <!--@click="deleteImage()"-->
      <!--&gt;-->
        <!--Delete-->
      <!--</v-btn>-->
    <!--</div>-->
  </div>
</template>

<script>
  // Thanks Marcelo Forclaz(https://github.com/CristalT) https://gist.github.com/CristalT/2651023cfa2f36cddd119fd979581893
  // Thanks Matteo Leoni(https://github.com/signalkuppe) https://github.com/signalkuppe/vuetify-cloudinary-upload/blob/master/src/components/v-cloudinary-upload.vue
  import firebase from 'firebase'
  const firestorage = firebase.storage()

  export default {
    name: 'ProfilePicUploader',
    props: [
      // 'currentImgUrl',
      'userId'],
    data () {
      return {
        uploadTask: '',
        uploading: false
      }
    },
    created () {
    },
    methods: {
      selectFile () {
        this.$refs.uploadInput.click()
      },
      detectFiles (e) {
        let fileList = e.target.files || e.dataTransfer.files
        Array.from(Array(fileList.length).keys()).map(x => {
          this.upload(fileList[x])
        })
      },
      upload (file) {
        this.$emit('upload-start')
        this.uploading = true
        this.uploadTask = firestorage.ref('images/' + this.userId).put(file)

        this.uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          sp => {
            this.$emit('upload-progress', {
              percent: Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
            })
          },
          () => this.$emit('upload-error'),
          () => {
            this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.uploading = false
              this.$emit('downloadURL', downloadURL)
              this.$emit('upload-end')
            })
          })

      // },
      // deleteImage () {
      //   firestorage
      //     .ref('images/' + this.userId)
      //     .delete()
      //     .then(() => {
      //       this.uploading = false
      //       this.$emit('downloadURL', '')
      //     })
      //     .catch((error) => {
      //       console.error(`file delete error occured: ${error}`)
      //     })
      }
    }
  }
</script>

<style>
  .btn-upload {
    border-radius: 50%;
    padding: 0 6px;
    min-width: auto;
  }

  input[type="file"] {
    position: absolute;
    clip: rect(0,0,0,0);
  }
</style>

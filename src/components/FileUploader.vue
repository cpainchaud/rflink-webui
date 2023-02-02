<template>
  <div class="uploader">
    <input :disabled="disabled" ref="file" style="" type="file" id="myfile" v-on:change="handleFileUpload" name="myfile">
    <div class="uploader-details">
      <span v-if="file !== null" style="padding: 0; margin: 5px 0 10px 0;">{{ file.name }}</span>
      <p v-if="md5 !== ''" style="padding: 0; margin: 5px 0 10px 0;"><b>MD5:</b> {{ md5 }}</p>
    </div>

    <Progress class="uploader-progress" v-if="uploadPercentage>0" :percentage="this.uploadPercentage"></Progress>
    <input :disabled="disabled" v-if="file !== null" type="submit" @click="submitFile" class="btn-green" value="Upload">
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import Progress from "./Progress";
import BMF from 'browser-md5-file';

const bmf = new BMF();

export default {
  name: "FileUploader",
  props: ["configuration", "disabled"],
  components:{Progress},
  data() {
    return {
      uploadPercentage: 0,
      md5: "",
      file: null,
    }
  },
  methods:{
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
      bmf.md5(this.file, (err, md5) => {
        this.md5 = md5
      }, progress => {
        if(progress<1) this.md5 = "Calculating " + Math.round(progress*10000)/100 + "%";
      });
    },

    submitFile(){
      if(this.file == null) {
        return Swal.fire({
          title: 'Error!',
          html: 'You didn\'t select a file',
          icon: 'error',
          confirmButtonText: 'Continue'
        })
      }

      let formData = new FormData();

      formData.append('upload', this.file);
      formData.append('md5', this.md5);

      axios.post( '/upload', formData, {
            params: {
              filename: this.configuration.upload_filename
            },
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: function( progressEvent ) {
              this.uploadPercentage = Math.round(progressEvent.loaded / progressEvent.total * 10000) / 100;
            }.bind(this)
          }
      ).then(()=>{
        Swal.fire({
          title: 'Success!',
          html: 'Operation is a success, the esp will now reboot',
          icon: 'info',
          confirmButtonText: 'Ok'
        })
        this.startChecker();
      }).catch((error)=>{
        console.error(error)
        Swal.fire({
          title: 'Error!',
          html: 'A network error occured while saving: '+error,
          icon: 'error',
          confirmButtonText: 'Continue'
        })
      });
    },

  }
}
</script>

<style scoped>
.uploader {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.uploader > input[type=file] {
  display: inline-block;
  margin-right: 10px;
}
.uploader > input[type=submit]{
  max-width: 100px;
  margin-left: 10px;
}
.uploader > .uploader-details{
  white-space: nowrap;
}
.uploader > .uploader-progress {

}
</style>
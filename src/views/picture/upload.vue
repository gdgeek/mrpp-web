<template>
  <div>
    <mr-p-p-upload :fileType="fileType" @saveResource="savePicture" ><div>选择图片并上传</div></mr-p-p-upload>
  </div>
</template>

<script>

import MrPPUpload from '@/components/MrPP/MrPPUpload'

import { postPicture } from '@/api/resources'
export default {
  name: 'PictureUpload',
  components: {
    MrPPUpload
  },
  data: function() {
    return {
      fileType: '{image/gif, image/jpeg, image/png}'
    }
  },
  methods: {  
    savePicture(name, fileId) {
      const self = this
      return new Promise((resolve, reject) => {
        postPicture(name, fileId).then((response) => {
          console.log(response.data)
         
          self.$router.push({ path: '/picture/view', query: { id:  response.data.id }})
        }).catch(err => {
          console.log(err)
        })
      });
      alert(name)
     
    }

  }
}
</script>

<template>
  <div>
    <mr-p-p-upload :file-type="fileType" @saveResource="saveVideo"><div>选择视频，并上传</div></mr-p-p-upload>
  </div>
</template>

<script>

import MrPPUpload from '@/components/MrPP/MrPPUpload'

import { postVideo } from '@/api/resources'
export default {
  name: 'VideoUpload',
  components: {
    MrPPUpload
  },
  data: function() {
    return {
      fileType: 'video/mp4, video/ogg'
    }
  },
  methods: {
    saveVideo(name, fileId) {
      const self = this
      return new Promise((resolve, reject) => {
        postVideo(name, fileId).then((response) => {
          console.log(response.data)

          self.$router.push({ path: '/video/view', query: { id: response.data.id }})
        }).catch(err => {
          console.log(err)
        })
      })
    }
  }
}
</script>


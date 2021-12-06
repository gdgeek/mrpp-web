<template>
  <div>
    <mr-p-p-upload :title="title" :declared="declared" :subtitle="subtitle" :opentype="opentype" @sendMessage="sendMessage" />
  </div>
</template>

<script>

// import SparkMD5 from 'spark-md5'
// import { fileOpen, fileMD5, fileHas, fileUrl, fileUpload, fileCos } from '@/assets/js/file.js'
// import { postFile } from '@/api/files'
// import { postPicture } from '@/api/resources'
import MrPPUpload from '@/components/MrPP/MrPPUpload'

export default {
  name: 'PictureUpload',
  components: {
    MrPPUpload
  },
  data: function() {
    return {
      title: '选择文件',
      subtitle: '选择图片并上传',
      declared: '请选择图片文件进行上传操作',
      opentype: '{image/gif, image/jpeg, image/png}'
    }
  },
  methods: {
    sendMessage() {
      alert('11112233112')
    }
  }
}
</script>

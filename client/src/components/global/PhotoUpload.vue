<template>
    <div>
        <h2>Upload Photos</h2>
        <div class="card">
            <h5 class="card-header">Upload images</h5>
            <div class="card-body">
                <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">

                    <input class="form-control-file" type="file" multiple :name="uploadFieldName" :disabled="isSaving"
                           @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                           accept="image/*">
                    <p class="card-text" v-if="isInitial">
                        Drag your images(s) here to begin<br> or click to browse
                    </p>
                    <p class="card-text" v-if="isSaving">
                        Uploading {{ fileCount }} images...
                    </p>
                </form>


                <div v-if="isSuccess">
                    <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
                    <p>
                        <a href="javascript:void(0)" @click="reset()">Upload again</a>
                    </p>
                    <ul class="list-unstyled">
                        <li v-for="item in uploadedFiles">
                            <img :src="`${baseurl}${item}`" class="img-responsive img-thumbnail">
                        </li>
                    </ul>
                </div>


            </div>
        </div>


    </div>

</template>

<script>
  //https://scotch.io/tutorials/how-to-handle-file-uploads-in-vue-2
  const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3

  export default {
    name: 'PhotoUpload',
    props: ['venueName'],
    data () {
      return {
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'photos',
        baseurl: 'http://localhost:5000/uploads/',
        venue: this.venueName
      }
    },

    computed: {
      isInitial () {
        return this.currentStatus === STATUS_INITIAL
      },
      isSaving () {
        return this.currentStatus === STATUS_SAVING
      },
      isSuccess () {
        return this.currentStatus === STATUS_SUCCESS
      },
      isFailed () {
        return this.currentStatus === STATUS_FAILED
      }
    },

    methods: {
      reset () {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL
        this.uploadedFiles = []
        this.uploadError = null
      },
      save (formData) {

        debugger
        formData.append('venueName', this.venue)
        // upload data to the server
        this.currentStatus = STATUS_SAVING

        this.$store.dispatch('photos', formData).then(x => {
          this.uploadedFiles = x.files
          this.currentStatus = STATUS_SUCCESS
        }).catch(err => {
          debugger
          this.uploadError = err.response
          this.currentStatus = STATUS_FAILED
        })

      },

      filesChange (fieldName, fileList) {
        // handle file changes
        const formData = new FormData()

        if (!fileList.length) return

        // append the files to FormData
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name)
          })

        // save it
        this.save(formData)
      }

    },

    mounted () {
      this.reset()
    },

  }
</script>

<style scoped>

</style>
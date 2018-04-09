<template>
    <div class="col s3">
        <div class="card blue-grey darken-1">
            <div class="card-content white-text">
                <span class="card-title">{{job.name}}</span>
                <p>{{version}}</p>
            </div>
            <div class="card-action">
                <a href="#">This is a link</a>
                <a href="#">This is a link</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'JobCard',
  props: ['job'],
  methods: {
    // Call to local node js server which acts an api proxy server
    getJobDetails: function () {
      var options = {
        url: 'http://localhost:3000/',
        method: 'POST',
        body: {
          url: this.job.url
        }
      }
      this.$http(options)
        .then(response => {
          console.log(response.data.actions[0].parameters[0].value)
          this.version = response.data.actions[0].parameters[0].value
        })
    }
  },
  created: function () {
    this.getJobDetails()
  },
  data () {
    return {
      version: 'Loading Version....'
    }
  }
}
</script>

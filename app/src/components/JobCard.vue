<template>

    <div class="col s3">
        <div class="card blue-grey darken-1">
          <transition name="fade">
            <div v-show="apiCalls" class="progress">
              <div class="indeterminate"></div>
            </div>
          </transition>
          <div class="card-content white-text">
            <span class="card-title">{{job.name}}
              <div v-if="currentStatus" class="right preloader-wrapper small active">
                <div class="spinner-layer spinner-yellow-only">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div><div class="gap-patch">
                    <div class="circle"></div>
                  </div><div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
              </div>
            </span>
            <h5>{{version}}</h5>
            <p>{{shortDescription}} </p>
            <transition name="slide-fade">
              <p v-show="apiCalls" class="right italics">Updating...</p>
            </transition>
          </div>
          <div v-if="currentStatus" class="card-tabs">
            <ul class="tabs blue-grey darken-3 tabs-fixed-width">
              <li class="tab"><a class="active" href="#test5">Build In Progress...</a></li>
            </ul>
          </div>
          <div v-if="currentStatus" class="card-content blue-grey darken-3 white-text">
            <div id="test5">
              <p> Build Number : {{currentBuildData.displayName}} </p>
              <p>{{currentBuildData.shortDescription}}</p>
              <p> Started at : {{startedOn}} </p>
              <p> Estimated Duration : {{estimatedDuration}} </p>
            </div>
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
      this.apiCalls = 0
      console.log('Updating...')
      var options = {
        url: 'http://localhost:3000/',
        method: 'POST',
        body: {
          url: this.job.jobUrl
        }
      }
      this.apiCalls++
      this.$http(options)
        .then(response => {
          if (this.apiCalls > 0) {
            this.apiCalls--
          }
          console.log(response.data.displayName)
          this.version = response.data.displayName
        }, response => {
          this.version = 'Failed to get version - ' + response.data
        })
      options.body.url = this.job.shortDescription
      this.apiCalls++
      this.$http(options)
        .then(response => {
          if (this.apiCalls > 0) {
            this.apiCalls--
          }
          console.log(this.getShortDescription(response.data.actions))
          this.shortDescription = this.getShortDescription(response.data.actions)
        }, response => {
          this.shortDescription = 'Failed to get username - ' + response.data
        })
      options.body.url = this.job.lastBuild
      this.apiCalls++
      this.$http(options)
        .then(response => {
          if (this.apiCalls > 0) {
            this.apiCalls--
          }
          this.currentBuildData.displayName = response.data.displayName
          this.currentBuildData.shortDescription = this.getShortDescription(response.data.actions)
          this.currentBuildData.duration = response.data.duration
          this.currentBuildData.estimatedDuration = response.data.estimatedDuration
          this.estimatedDuration = this.getTimeinHours(this.currentBuildData.estimatedDuration)
          this.currentBuildData.timestamp = response.data.timestamp
          this.startedOn = this.getTimestampInHours(this.currentBuildData.timestamp)
          this.currentStatus = response.data.building
        }, response => {
          this.currentStatus = 'Failed to get lastBuild - ' + response.data
        })
    },
    getTimeinHours: function (milliseconds) {
      var seconds = parseInt((milliseconds / 1000) % 60)
      var minutes = parseInt((milliseconds / (1000 * 60)) % 60)
      var hours = parseInt((milliseconds / (1000 * 60 * 60)) % 24)
      return hours + ' hr ' + minutes + ' minutes ' + seconds + ' seconds '
    },
    getTimestampInHours: function (timestamp) {
      var date = new Date(timestamp)
      var hours = date.getHours()
      // Minutes part from the timestamp
      var minutes = '0' + date.getMinutes()
      // Seconds part from the timestamp
      var seconds = '0' + date.getSeconds()
      // Will display time in 10:30:23 format
      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
      return formattedTime
    },
    getShortDescription: function (actions) {
      for (var action in actions) {
        if (actions[action].causes != null) {
          if (actions[action].causes[0].shortDescription != null) {
            return actions[action].causes[0].shortDescription
          }
        }
      }
      return null
    }
  },
  mounted: function () {
    this.getJobDetails()
    this.interval = setInterval(function () {
      this.getJobDetails()
    }.bind(this), 300000)
    // this.getJobDetails()
  },
  data () {
    return {
      version: 'Loading Version....',
      shortDescription: 'Loading description....',
      currentStatus: false,
      displayName: '',
      startedOn: 'Getting time....',
      estimatedDuration: 'Getting estimated duration....',
      currentBuildData: {
        displayName: '',
        shortDescription: 'Loading description....',
        duration: 0,
        estimatedDuration: 0,
        timestamp: 0
      },
      apiCalls: 0
    }
  }
}
</script>
<style>
  .italics {
    font-style: italic;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .slide-fade-enter-active {
  transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>

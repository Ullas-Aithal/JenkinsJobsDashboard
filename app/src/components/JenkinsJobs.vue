
<template>
    <div class="row">
        <JobCard v-for="job in jobs" v-bind:key="job.url" v-bind:job="job"></JobCard>
    </div>
</template>
<script>
import JobCard from './JobCard.vue'
import jobData from '../../../jobData.js'
// import jobData from '../../../local-jobData.js'
export default {
  name: 'JenkinsJobs',
  components: {
    JobCard
  },
  data () {
    return {
      jobs: jobData
    }
  }

}
</script>

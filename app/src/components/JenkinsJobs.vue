
<template>
    <div class="row">
        <JobCard v-for="job in jobs" v-bind:key="job.url" v-bind:job="job"></JobCard>
    </div>
</template>
<script>
import JobCard from './JobCard.vue'
export default {
  name: 'JenkinsJobs',
  components: {
    JobCard
  },
  data () {
    return {
      jobs: [
        {
          name: 'name',
          url: 'url'
        },
        {
          name: 'name',
          url: 'url'
        }
      ]
    }
  }

}
</script>

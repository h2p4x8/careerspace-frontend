<template>
    <JobDescription :id='$attrs.id'/>
</template>

<script>
import JobDescription from "../components/Vacancies/JobDescription";

export default {
  name: 'App',
  components: {
    JobDescription,
  },
  data () {
    return {
      //
    }
  },
  
}
</script>

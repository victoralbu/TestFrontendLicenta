<template>
  <h1>{{ data.name }}</h1>
  <h1>{{ data.email }}</h1>
  <h1>{{ data.jobs_done }}</h1>
  <h1>{{ data.phone_number }}</h1>
  <h1>{{ data.rating }}</h1>
  <h1>{{ data.ratings_nr }}</h1>
</template>

<script>
import {getUser} from "~/services/getUser";

export default {
  name: "Profile",
  data() {
    return {
      data: [],
    }
  },
  async created() {
    this.data = await getUser()
  },
}
</script>

<style>

</style>
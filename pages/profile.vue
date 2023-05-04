<template>
  <h1>{{ data.name }}</h1>
  <h1>{{ data.email }}</h1>
  <h1>{{ data.jobs_done }}</h1>
  <h1>{{ data.phone_number }}</h1>
  <h1>{{ data.rating }}</h1>
  <h1>{{ data.ratings_nr }}</h1>
</template>

<script setup>
import {useDataStore} from "~/services/dataStorage";
import {loadUserInfo} from "~/services/loadData";

await loadUserInfo()

let data;

data = useDataStore();

definePageMeta({
  middleware: ['validate-token']
})

</script>

<style>

</style>
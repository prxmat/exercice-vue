<template>
  <q-page class="q-pa-lg">
    <div class="row q-gutter-lg">
      <dishe
        v-for="dishe in store.dishesCollection"
        :key="dishe.id"
        :dishe="dishe"
      />

      <add-button @click="showFormDishe = true" />

      <q-dialog v-model="showFormDishe">
        <form-dishe action="add" @submit="showFormDishe = false" />
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "src/stores/task.js";

import AddButton from "components/AddButton.vue";
import Dishe from "components/Dishe.vue";
import FormDishe from "components/FormDishe.vue";

const store = useTaskStore();
const showFormDishe = ref(false);
</script>

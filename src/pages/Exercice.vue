<template>
  <q-page class="q-pa-lg">
    <div class="row q-gutter-lg">
      <Dishe v-for="dishe in taskStore.getDishes" :key="dishe.id" :dishe="dishe" />

      <AddButton @click="showFormDishe = true" />

      <q-dialog v-model="showFormDishe">
        <FormDishe @close="showFormDishe = false" />
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useTasksStore } from '../stores/tasks.store-module';
import { ref } from 'vue';
import Dishe from '../components/Dishe.vue';
import FormDishe from '../components/FormDishe.vue';
import AddButton from '../components/AddButton.vue';

const taskStore = useTasksStore();

const showFormDishe = ref(false);

</script>

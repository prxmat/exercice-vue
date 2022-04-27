<script setup lang="ts">
import { UPDATE_DISHE } from '../constants/actions.const';
import FormDishe from './FormDishe.vue';
import ConfirmationModal from './ConfirmationModal.vue';
import { ref } from 'vue';
import { useTasksStore } from '../stores/tasks.store-module';
import { Dishe } from 'src/models/models';

const showFormDishe = ref(false);
const showConfirmDeleteDishe = ref(false);
const constants = ref({UPDATE_DISHE});

const props = defineProps<{
  dishe: Dishe
}>();

const taskStore = useTasksStore();

function deleteSelf() {
  taskStore.deleteDishe(props.dishe.id);
}

</script>


<template>
  <q-card class="card">
    <q-img :src="dishe.image || 'image-placeholder.png'" basic contain>
      <div class="absolute-bottom text-h6">
        {{ dishe.name }}
      </div>
    </q-img>

    <q-card-section>
      <q-rating
        :model-value="dishe.note"
        size="2em"
        color="orange"
        readonly
        class="q-mt-sm"
      />
    </q-card-section>

    <q-card-section>
      <span :class="dishe.description ? '' : 'text-italic'">
        {{ dishe.description || 'Aucune description fournie' }}
      </span>
    </q-card-section>

    <q-card-actions class="absolute-bottom" align="right">
      <q-btn @click="showFormDishe = true" icon="edit" color="blue" flat
        >Modifier</q-btn
      >
      <q-btn @click="showConfirmDeleteDishe = true" icon="delete" color="red" flat>Supprimer</q-btn>
    </q-card-actions>

    <q-dialog v-model="showFormDishe">
      <FormDishe :action="constants.UPDATE_DISHE"
                 :disheId="dishe.id"
                 @close="showFormDishe = false"
                 />
    </q-dialog>

    <q-dialog v-model="showConfirmDeleteDishe" persistent>
      <ConfirmationModal text="Êtes-vous sûr de vouloir retirer ce plat de la liste ?"
                         @confirm="deleteSelf"
                         confirmText="Retirer"
                         cancelText="Annuler"
                         />
    </q-dialog>
  </q-card>
</template>


<style>
.card {
  min-height: 400px;
  max-width: 250px;
  width: 250px;
  transition: background 0.3s;
}
.card-clickable {
  cursor: pointer;
}
.card-clickable:hover {
  background: #bdbdbd !important;
}
.card .q-img {
  max-height: 180px;
  height: 100%;
}
.card .q-img__image {
  background-size: cover !important;
}
.card .q-rating__icon {
  opacity: 0.2;
}
.card .q-rating__icon--active {
  opacity: 1;
}
</style>

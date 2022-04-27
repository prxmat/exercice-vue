<template>
  <q-card class="card">
    <q-img :src="dishe.image || 'statics/image-placeholder.png'" basic contain>
      <div class="absolute-bottom text-h6">
        {{ dishe.name }}
      </div>
    </q-img>

    <q-card-section>
      <q-rating
        :value="dishe.note"
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
      <form-dishe :action="constants.UPDATE_DISHE"
                  :disheId="dishe.id"
                  @close="showFormDishe = false"
                  />
    </q-dialog>

    <q-dialog v-model="showConfirmDeleteDishe" persistent>
      <confirmation-modal text="Êtes-vous sûr de vouloir retirer ce plat de la liste ?"
                          @confirm="deleteSelf"
                          confirmText="Retirer"
                          cancelText="Annuler"
                          />
    </q-dialog>
  </q-card>
</template>

<script>
import { TASKS_ACTIONS_DELETE_DISHE } from "../store/store.const";
import { UPDATE_DISHE } from "../constants/actions.const";

export default {
  props: ["dishe"],
  data() {
    return {
      showFormDishe: false,
      showConfirmDeleteDishe: false,
      constants: {
        UPDATE_DISHE
      }
    };
  },
  components: {
    "form-dishe": require("components/FormDishe.vue").default,
    "confirmation-modal": require("components/ConfirmationModal.vue").default
  },
  methods: {
    deleteSelf() {
      this.$store.dispatch(TASKS_ACTIONS_DELETE_DISHE, this.dishe.id)
    }
  }
};
</script>

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

<template>
  <q-page class="q-pa-lg">
    <div class="row q-gutter-lg">
      <dishe v-for="dishe in dishes" :key="dishe.id" :dishe="dishe" />

      <add-button @click="showFormDishe = true" />

      <q-dialog v-model="showFormDishe">
        <form-dishe @close="showFormDishe = false" />
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { TASKS_GETTERS_GET_DISHES } from '../store/store.const';
import {ADD_DISHE} from '../constants/actions.const';

export default {
  data() {
    return {
      showFormDishe: false,
      constants: {
        ADD_DISHE
      }
    };
  },
  computed: {
    ...mapGetters({
      dishes: TASKS_GETTERS_GET_DISHES
    })
  },
  components: {
    dishe: require("components/Dishe.vue").default,
    "add-button": require("components/AddButton.vue").default,
    "form-dishe": require("components/FormDishe.vue").default
  }
};
</script>

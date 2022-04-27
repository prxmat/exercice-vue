<template>
  <q-card class="form-card">

    <q-form
      @submit="onSubmit"
    >

      <q-card-section>
        <div class="text-h6">{{ actionName }} plat</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-mb-md">
          <q-input
            filled
            v-model="dishe.name"
            label="Nom (Burger)"
            class="col"
            lazy-rules
            :rules="[
              val => val && val.length > 0 || 'Le nom est obligatoire',
              val => val.length < 21 || 'Le nom ne peut excéder 20 caractères'
            ]"
            />
        </div>

        <div class="row q-mb-md">
          <q-input
            filled
            v-model="dishe.description"
            label="Description"
            type="textarea"
            class="col"
            lazy-rules
            :rules="[
              val => !val || val.length === 0 || val.length < 136 || 'La description ne peut excéder 135 caractères',
            ]"
          />
        </div>

        <div class="row q-mb-md">
          <q-input
            filled
            v-model="dishe.image"
            label="URL de l'image"
            class="col"
          />
          <q-img
            :src="dishe.image ? dishe.image : 'statics/image-placeholder.png'"
            class="q-ml-sm"
            contain
          />
        </div>

        <div class="q-mb-md">
          <div class="row">
            <p class="q-mb-none">Note:</p>
          </div>
          <div class="row">
            <q-rating v-model="dishe.note" size="2em" color="orange" />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn type="reset" label="Annuler" color="grey" v-close-popup />
        <q-btn type="submit" label="Sauver" color="primary" />
      </q-card-actions>

    </q-form>

  </q-card>
</template>

<script>
  import {ADD_DISHE, UPDATE_DISHE} from '../constants/actions.const';
  import {
    TASKS_ACTIONS_ADD_DISHE,
    TASKS_ACTIONS_UPDATE_DISHE,
    TASKS_GETTERS_GET_DISHE
  } from '../store/store.const';

export default {

  props: {
    action: {
      type: String,
      default: ADD_DISHE
    },

    disheId: {
      type: Number,
    }
  },

  computed: {
    actionName() {
      return this.$props.action === UPDATE_DISHE ? 'Modifier un' : 'Ajouter un'
    }
  },

  data() {

    if (this.$props.action === UPDATE_DISHE && !this.$props.disheId) {
      throw `Mauvais usage du composant FormDishe : un disheId est obligatoire pour l'action ${UPDATE_DISHE}`;
    }

    return {
      dishe: this.$props.action === UPDATE_DISHE
        ? {...this.$store.getters[TASKS_GETTERS_GET_DISHE](this.$props.disheId)}
        : {
            name: "",
            description: "",
            note: 1,
            image: ""
          }
    };
  },

  methods: {
    onSubmit() {
      this.$store.dispatch(this.$props.action === UPDATE_DISHE ? TASKS_ACTIONS_UPDATE_DISHE : TASKS_ACTIONS_ADD_DISHE, this.dishe);
      this.$emit('close');
    },

  },

  emits: ['close']

};
</script>

<style>
.form-card {
  min-width: 400px;
}
.form-card .heading {
  text-transform: capitalize;
}
.form-card .q-card-section {
  width: 100%;
}
.thumbnail {
  max-width: 50px;
  max-height: 50px;
}
.form-card .q-img {
  height: 56px;
  width: 56px;
  border-radius: 10px;
}
.form-card .q-img__image {
  background-size: cover !important;
}
.form-card .q-rating__icon {
  opacity: 0.2;
}
.form-card .q-rating__icon--active {
  opacity: 1;
}
</style>

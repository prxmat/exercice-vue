<template>
  <q-card class="form-card">
    <q-card-section>
      <div class="text-h6 heading">{{ action }} Plat</div>
    </q-card-section>

    <q-card-section>
      <div class="row q-mb-md">
        <q-input filled v-model="dishe.name" label="Nom (Burger)" class="col" />
      </div>

      <div class="row q-mb-md">
        <q-input
          filled
          v-model="dishe.description"
          label="Description"
          type="textarea"
          class="col"
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
      <q-btn label="Annuler" color="grey" v-close-popup />
      <q-btn label="Sauver" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  props: ["action"],
  data() {
    return {
      dishe: {
        name: "",
        description: "",
        note: 1,
        image: ""
      }
    };
  }
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
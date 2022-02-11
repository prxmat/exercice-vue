<template>
  <q-card class="form-card">
    <q-form ref="form">
      <q-card-section>
        <div class="text-h6 heading">{{ action }} Plat</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-mb-md">
          <q-input
            filled
            v-model="dishe.name"
            label="Nom (Burger)"
            class="col"
            :rules="nameRules"
          />
        </div>

        <div class="row q-mb-md">
          <q-input
            filled
            v-model="dishe.description"
            label="Description"
            type="textarea"
            class="col"
            :rules="descriptionRules"
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
            :src="dishe.image ? dishe.image : 'image-placeholder.png'"
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
        <q-btn label="Sauver" color="primary" @click="handleSave" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup>
import { reactive, ref, onBeforeMount } from "vue";
import { useTaskStore } from "src/stores/task.js";

const props = defineProps(["action", "item"]);
const emit = defineEmits(["submit"]);
const store = useTaskStore();

const form = ref(null);
const dishe = reactive({
  name: "",
  description: "",
  note: 1,
  image: "",
});

onBeforeMount(() => {
  if (props.action === "edit") {
    dishe.name = props.item.name;
    dishe.description = props.item.description;
    dishe.note = props.item.note;
    dishe.image = props.item.image;
  }
});

const nameRules = [
  (val) => val.length > 0 || "Name should not be empty",
  (val) => val.length <= 20 || "Name should not be longer than 20 characters",
];

const descriptionRules = [
  (val) =>
    val.length <= 135 || "Description should not be longer than 135 characters",
];

async function handleSave() {
  const success = await form.value.validate();
  if (success) {
    if (props.action === "add") handleCreate();
    if (props.action === "edit") handleEdit();
  }
}

function handleCreate() {
  store.addDishe(dishe);
  emit("submit");
}

function handleEdit() {
  store.updateDisheById(props.item.id, dishe);
  emit("submit");
}
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

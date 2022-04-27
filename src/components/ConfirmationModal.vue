<template>
  <q-card>
    <q-card-section class="row items-center">
      <span class="q-ml-sm">{{ text }}</span>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat :label="(cancelText || 'Annuler')" color="primary" v-close-popup />
      <q-btn flat :label="(confirmText || 'Valider')" color="primary" v-close-popup @click="$emit('confirm')" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">

  defineProps(['text', 'confirmText', 'cancelText']);
  defineEmits(['confirm']);

</script>

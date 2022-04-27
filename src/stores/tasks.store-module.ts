import { defineStore } from 'pinia';
import { Dishe, TasksStoreState } from 'src/models/models';
import { computed, ref } from 'vue';

const DISHES: Dishe[] = [
  {
    id: 1,
    image: 'https://i.imgur.com/0umadnY.jpg',
    name: 'Burger',
    description:
      "Un hamburger est un sandwich composé d'une ou plusieurs tranches de viande hachée, généralement du bœuf, placées dans un petit pain ou une brioche.",
    note: 4
  },
  {
    id: 2,
    image: 'https://i.imgur.com/b9zDbyb.jpg',
    name: 'Pizza',
    description:
      "La pizza est un plat savoureux d'origine italienne, consistant en une base généralement ronde et aplatie de pâte levée à base de blé.",
    note: 5
  },
  {
    id: 3,
    image: 'https://i.imgur.com/RbKjUjB.jpg',
    name: 'Petits choux',
    description:
      'Le chou de Bruxelles est une variété de chou, plante herbacée de la famille des Brassicaceae. C’est vraiment pas bon...',
    note: 1
  },
  {
    id: 4,
    image: 'https://i.imgur.com/xAuhNVg.jpg',
    name: 'BBQ Ribs',
    description:
      'Les BBQ ribs ou barbecue ribs sont des grands classiques très appréciés partout dans le monde.',
    note: 5
  }
];

export const useTasksStore = defineStore('tasks', () => {

  /* ---------------------------------- State --------------------------------- */
  const dishes = ref(DISHES);
  /* -------------------------------------------------------------------------- */

  /* --------------------------------- Getters -------------------------------- */
  const getDishes = computed(() => dishes.value);

  const getNewId = computed(() => dishes.value.map(d => d.id).sort()[dishes.value.length - 1] + 1);
  /* -------------------------------------------------------------------------- */

  /* --------------------------------- Actions -------------------------------- */
  function getDishe(id: number) {
    return dishes.value.find(d => d.id === id);
  }

  function deleteDishe(disheId: number) {
    dishes.value = dishes.value.filter(d => d.id !== disheId);
  }

  function addDishe(dishe: Dishe) {
    dishes.value.push({...dishe, id: getNewId.value});
  }

  function updateDishe(dishe: Dishe) {
    const disheToUpdate = dishes.value.find(d => d.id === dishe.id);
    Object.assign(disheToUpdate, dishe);
  }

  function loadFromStorage(stateFromStorage: TasksStoreState) {
    dishes.value = stateFromStorage.dishes;
  }
  /* -------------------------------------------------------------------------- */


  return {
    dishes,
    getDishes,
    getDishe,
    getNewId,
    deleteDishe,
    addDishe,
    updateDishe,
    loadFromStorage
  };

});

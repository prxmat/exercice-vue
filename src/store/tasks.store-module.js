import { ADD_DISHE, DELETE_DISHE, LOAD_FROM_STORAGE, UPDATE_DISHE } from "../constants/actions.const";
import { TASKS_GETTERS_GET_NEW_ID } from "./store.const";

export const tasks = {
  namespaced: true,
  state: {
    dishes: [
      {
        id: 1,
        image: "https://i.imgur.com/0umadnY.jpg",
        name: "Burger",
        description:
          "Un hamburger est un sandwich composé d'une ou plusieurs tranches de viande hachée, généralement du bœuf, placées dans un petit pain ou une brioche.",
        note: 4
      },
      {
        id: 2,
        image: "https://i.imgur.com/b9zDbyb.jpg",
        name: "Pizza",
        description:
          "La pizza est un plat savoureux d'origine italienne, consistant en une base généralement ronde et aplatie de pâte levée à base de blé.",
        note: 5
      },
      {
        id: 3,
        image: "https://i.imgur.com/RbKjUjB.jpg",
        name: "Petits choux",
        description:
          "Le chou de Bruxelles est une variété de chou, plante herbacée de la famille des Brassicaceae. C’est vraiment pas bon...",
        note: 1
      },
      {
        id: 4,
        image: "https://i.imgur.com/xAuhNVg.jpg",
        name: "BBQ Ribs",
        description:
          "Les BBQ ribs ou barbecue ribs sont des grands classiques très appréciés partout dans le monde.",
        note: 5
      }
    ],
  },
  getters: {
    getDishes: state => state.dishes,
    getDishe: state => id => state.dishes.find(d => d.id === id),
    getNewId:  state => state.dishes.map(d => d.id).sort()[state.dishes.length - 1] + 1
  },
  mutations: {
    [DELETE_DISHE](state, disheId) {
      state.dishes = state.dishes.filter(d => d.id !== disheId);
    },
    [ADD_DISHE](state, dishe) {
      state.dishes.push({...dishe, id: this.getters[TASKS_GETTERS_GET_NEW_ID]});
    },
    [UPDATE_DISHE](state, dishe) {
      const disheToUpdate = state.dishes.find(d => d.id === dishe.id);
      Object.assign(disheToUpdate, dishe);
    },
    [LOAD_FROM_STORAGE](state, stateFromStorage) {
      state.dishes = stateFromStorage.dishes;
    }
  },
  actions: {
    [DELETE_DISHE]({ commit }, disheId) {
      commit(DELETE_DISHE, disheId);
    },
    [ADD_DISHE]({ commit }, dishe) {
      commit(ADD_DISHE, dishe);
    },
    [UPDATE_DISHE]({ commit }, dishe) {
      commit(UPDATE_DISHE, dishe);
    },
    [LOAD_FROM_STORAGE]({ commit }, stateFromStorage) {
      commit(LOAD_FROM_STORAGE, stateFromStorage);
    }
  }
};

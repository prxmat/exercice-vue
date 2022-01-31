import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useTaskStore = defineStore("task", {
  state: () => {
    return {
      dishes: useStorage("dishes", {
        1: {
          id: 1,
          image: "https://i.imgur.com/0umadnY.jpg",
          name: "Burger",
          description:
            "Un hamburger est un sandwich composé d'une ou plusieurs tranches de viande hachée, généralement du bœuf, placées dans un petit pain ou une brioche.",
          note: 4,
        },
        2: {
          id: 2,
          image: "https://i.imgur.com/b9zDbyb.jpg",
          name: "Pizza",
          description:
            "La pizza est un plat savoureux d'origine italienne, consistant en une base généralement ronde et aplatie de pâte levée à base de blé.",
          note: 5,
        },
        3: {
          id: 3,
          image: "https://i.imgur.com/RbKjUjB.jpg",
          name: "Petits choux",
          description:
            "Le chou de Bruxelles est une variété de chou, plante herbacée de la famille des Brassicaceae. C’est vraiement pas bon...",
          note: 1,
        },
        4: {
          id: 4,
          image: "https://i.imgur.com/xAuhNVg.jpg",
          name: "BBQ Ribs",
          description:
            "Les BBQ ribs ou barbecue ribs sont des grands classiques très appréciés partout dans le monde.",
          note: 5,
        },
      }),
    };
  },

  getters: {
    dishesCollection: (state) => {
      return Object.values(state.dishes);
    },
  },

  actions: {
    // This hack should not be exist if dishe creation had been sync with a real DB.
    getNewId() {
      const ids = Object.keys(this.dishes).sort();
      return ids.length < 1 ? 0 : parseInt(ids.at(-1)) + 1;
    },

    addDishe(dishe) {
      const id = this.getNewId();
      this.dishes[id] = { ...dishe, id };
    },

    updateDisheById(id, dishe) {
      console.log("id", id);
      this.dishes[id] = { ...dishe, id };
    },

    removeDisheById(id) {
      delete this.dishes[id];
    },
  },
});

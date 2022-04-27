import { TASKS_ACTIONS_LOAD_FROM_STORAGE, TASKS_MUTATIONS_UPDATE_DISHE, TASK_STORE_STORAGE_KEY } from "./store.const";

const CreateLocalStoragePlugin = store => {

  const stateFromLocalStorage = localStorage.getItem(TASK_STORE_STORAGE_KEY);

  if (stateFromLocalStorage) {
    try {

      const cleanState = JSON.parse(stateFromLocalStorage);
      store.dispatch(TASKS_ACTIONS_LOAD_FROM_STORAGE, cleanState);

    } catch (e) {
      console.error('Le store "tasks" n\'a pas pû être récupéré du localstorage, il sera nettoyé');
      localStorage.removeItem(TASK_STORE_STORAGE_KEY);
    }
  }

  function saveStateToLocalStorage(state) {
    localStorage.setItem(TASK_STORE_STORAGE_KEY, JSON.stringify(state.tasks));
  }

  store.subscribe(({type}, state) => {

    switch(type) {
      case TASKS_MUTATIONS_UPDATE_DISHE :
      case TASKS_MUTATIONS_ADD_DISHE :
      case TASKS_MUTATIONS_DELETE_DISHE :
        saveStateToLocalStorage(state);
        break;

    }


  })
}

export default CreateLocalStoragePlugin;

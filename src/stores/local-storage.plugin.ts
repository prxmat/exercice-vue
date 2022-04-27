import { PiniaPluginContext } from 'pinia';
import { TASK_STORE_STORAGE_KEY } from './store.const';


const CreateLocalStoragePlugin = ({store}: PiniaPluginContext) => {

  const stateFromLocalStorage = localStorage.getItem(TASK_STORE_STORAGE_KEY);

  if (stateFromLocalStorage) {
    try {

      const cleanState = JSON.parse(stateFromLocalStorage);
      store.loadFromStorage(cleanState);

    } catch (e) {
      console.error('Le store "tasks" n\'a pas pû être récupéré du localstorage, il sera nettoyé');
      localStorage.removeItem(TASK_STORE_STORAGE_KEY);
    }
  }

  function saveStateToLocalStorage() {
    localStorage.setItem(TASK_STORE_STORAGE_KEY, JSON.stringify(store.$state));
  }

  store.$onAction(({name, after}) => {

    after(() => {
      switch(name) {
        case 'updateDishe' :
        case 'addDishe' :
        case 'deleteDishe' :
          saveStateToLocalStorage();
          break;
      }
    });
  });

}

export default CreateLocalStoragePlugin;

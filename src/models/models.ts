import { ADD_DISHE, UPDATE_DISHE } from 'src/constants/actions.const';

export interface Dishe {
  id: number;
  name: string;
  description: string;
  note: number;
  image: string;
}

export interface TasksStoreState {
  dishes: Dishe[]
};


export interface FormDisheProps {
  action: typeof ADD_DISHE | typeof UPDATE_DISHE;
  disheId?: number;
}

import {
  AnyAction,
  configureStore,
  combineReducers,
  Store,
  CombinedState,
  ThunkAction,
  Action,
  Reducer,
} from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import postReducer, { PostState } from '../slice/post';

export interface State {
  post: PostState;
}

const isDev = process.env.NODE_ENV === 'development';

const reducer = (state: State, action: AnyAction): CombinedState<State> => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default: {
      const combineReducer = combineReducers({
        post: postReducer,
      });
      return combineReducer(state, action);
    }
  }
};

const createStore = () => {
  const store = configureStore({
    reducer: reducer as Reducer<State, AnyAction>,
    devTools: isDev,
  });
  return store;
};

export const wrapper = createWrapper<AppStore>(createStore, { debug: isDev });

export type AppStore = ReturnType<typeof createStore>; // store 타입
export type RootState = ReturnType<typeof reducer>; // RootState 타입

export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>; // Thunk 를 위한 타입

import { UserSchema } from '@/entities/User/model/types/userShema';
import { configureStore, ThunkAction, Action, AnyAction, ThunkDispatch, ReducersMapObject, MiddlewareArray, ThunkMiddleware } from '@reduxjs/toolkit';
import { usersData } from '@/entities/User/model/slices/usersSlice';
import counterReducer, { CounterState } from '@/features/counter/counterSlice';
import { AxiosInstance } from 'axios';
import { $apiAxios } from '@/shared/api/api';

export interface StateSchema {
  users: UserSchema;
  counter: CounterState;
}

export const rootReducer: ReducersMapObject<StateSchema> = {
  counter: counterReducer,
  users: usersData
};

export type StateSchemaKey = keyof StateSchema;

// Extra Thunk Action Arguments
export interface ExtraThunkArgs {
  api: AxiosInstance;
}

export function createReduxStore(
  initialState?: Partial<StateSchema>,
  extra?: ExtraThunkArgs
) {

  const store = configureStore<
    StateSchema,
    AnyAction,
    MiddlewareArray<ThunkMiddleware<StateSchema, AnyAction, ExtraThunkArgs>[]>
  >({
    reducer: rootReducer,
    devTools: _DEV_MODE_,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            api: extra?.api ?? $apiAxios,
          }
        }
      })
  });

  return store;
}

//export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof createReduxStore>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  StateSchema,
  unknown,
  Action<string>
>;

export type AppThunkDispatch = ThunkDispatch<StateSchema, any, AnyAction>;

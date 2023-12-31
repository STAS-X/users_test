import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppThunkDispatch } from './store';
import { StateSchema } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;

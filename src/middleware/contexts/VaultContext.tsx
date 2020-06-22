import React, { createContext, useReducer, useMemo, useEffect } from 'react';
import { initialState } from '../../models/VaultState';
import { reducer } from '../reducers/VaultReducer';
import VaultSingleton from '../../services/Vault';

export const VaultContext = createContext<{
  state: typeof initialState;
  dispatch: (action: any) => void;
}>({
  state: initialState,
  dispatch: () => {}
});

export const VaultProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
};

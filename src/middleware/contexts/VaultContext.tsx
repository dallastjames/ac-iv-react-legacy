import React, { createContext, useReducer, useMemo, useEffect } from 'react';
import { initialState } from '../../models/VaultState';
import { reducer } from '../reducers/VaultReducer';
import VaultAction from '../actions/VaultActions';
import VaultSingleton from '../../services/Vault';

export const VaultContext = createContext<{
  state: typeof initialState;
  dispatch: (action: VaultAction) => void;
}>({
  state: initialState,
  dispatch: () => {}
});

export const VaultProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  const vault = VaultSingleton.getInstance();

  const initVaultContext = async () => {
    const mode = await vault.getAuthMode();
    dispatch({ type: 'SET_AUTH_MODE', mode });
  };

  useEffect(() => {
    initVaultContext();
  }, []);

  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
};

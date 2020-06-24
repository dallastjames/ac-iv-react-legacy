import React, { createContext, useReducer, useMemo, useEffect } from 'react';
import { AuthMode } from '@ionic-enterprise/identity-vault';
import { initialState } from '../../models/VaultState';
import { reducer } from '../reducers/VaultReducer';
import VaultAction from '../actions/VaultActions';
import VaultSingleton from '../../services/Vault';
import Settings from '../../services/Settings';
import { StorageKeys } from '../../models/StorageKeys';

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
    const authMode = await Settings.get(StorageKeys.AUTH_MODE, AuthMode.InMemoryOnly);
    console.log('App::VaultContext::initVaultContext::Stored Mode', AuthMode[authMode]);
    await vault.setAuthMode(authMode);
    console.log('App::VaultContext::initVaultContext', authMode);
    dispatch({ type: 'SET_AUTH_MODE', authMode });
  };

  useEffect(() => {
    initVaultContext();
  }, []);

  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
};

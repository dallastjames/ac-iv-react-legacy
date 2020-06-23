import { Plugins } from '@capacitor/core';
import { StorageKeys } from '../models/StorageKeys';
import { AuthMode } from '@ionic-enterprise/identity-vault';
const { Storage } = Plugins;

export const getStoredAuthMode = async (): Promise<AuthMode> => {
  const stored = await Storage.get({ key: StorageKeys.AUTH_MODE });
  return stored.value ? JSON.parse(stored.value) : AuthMode.InMemoryOnly;
};

export const setStoredAuthMode = async (authMode: AuthMode): Promise<void> => {
  await Storage.set({ key: StorageKeys.AUTH_MODE, value: authMode.toString() });
};

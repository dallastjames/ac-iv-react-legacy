import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

interface KeyPairValue {
  key: string;
  value: any;
}

export default class Settings {
  static async set(setting: KeyPairValue): Promise<void> {
    await Storage.set({ key: setting.key, value: setting.value.toString() });
  }

  static async get(key: string, defaultValue: any = undefined): Promise<any> {
    const setting = await Storage.get({ key });
    return setting.value ? JSON.parse(setting.value) : defaultValue;
  }
}

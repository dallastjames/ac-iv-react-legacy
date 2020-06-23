import { IdentityVault, PluginOptions, IonicNativeAuthPlugin } from '@ionic-enterprise/identity-vault';
import BrowserVaultSingleton from './BrowserVault';

class BrowserPlugin implements IonicNativeAuthPlugin {
  getVault(config: PluginOptions): IdentityVault {
    config.onReady && config.onReady(BrowserVaultSingleton.getInstance());
    return BrowserVaultSingleton.getInstance();
  }
}
export default new BrowserPlugin();

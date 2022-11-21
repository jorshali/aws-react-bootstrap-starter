const hostname = window.location.hostname;
const config = require('../config/config.json');

export class EnvConfig {
  private static envConfig: any;

  static initialize() {
    console.log(`Loading environment config for: ${hostname}`);
    
    EnvConfig.envConfig = config[hostname];

    if (!EnvConfig.envConfig) {
      console.warn('no environment config found, defaulting to localhost');
      EnvConfig.envConfig = config.localhost;
    }
  }

  static get(key: string) {
    return EnvConfig.envConfig[key];
  }
}
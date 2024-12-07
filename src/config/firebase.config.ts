import { initializeApp, FirebaseApp } from "firebase/app";

class FirebaseConfig {
  private static app: FirebaseApp | null = null;

  static initialize(config: object): FirebaseApp {
    if (!this.app) {
      this.app = initializeApp(config);
    }
    return this.app;
  }

  static getApp(): FirebaseApp {
    if (!this.app) {
      throw new Error(
        "Firebase app is not initialized. Call initialize() first."
      );
    }
    return this.app;
  }
}

export default FirebaseConfig;

import { initializeApp, FirebaseApp } from "firebase/app";

class FirebaseConfig {
  private static app: FirebaseApp | null = null;


  /**
   * Initializes the Firebase app with the provided configuration.
   * 
   * @param {object} config - The configuration object for the Firebase app.
   * @returns {FirebaseApp} The initialized Firebase app instance.
   */
  static initialize(config: object): FirebaseApp {
    if (!this.app) {
      this.app = initializeApp(config);
    }
    return this.app;
  }
  /**
   * Returns the initialized Firebase app instance.
   * 
   * @returns {FirebaseApp} The initialized Firebase app.
   * @throws {Error} If the app has not been initialized, throws an error.
   * Ensure that `initialize()` has been called before invoking this method.
   */

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

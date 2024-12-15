import {
  getAuth,
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  updatePassword,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  verifyPasswordResetCode,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  UserCredential,
  User,
  OAuthProvider,
  AuthProvider,
  RecaptchaVerifier,
} from "firebase/auth";
import FirebaseConfig from "../config/firebase.config";
import { TaskResponse } from "../utils/task";

/**
 * FireAuthService class provides methods for user authentication
 * and management using Firebase.
 */
class FireAuthService {
  private readonly auth: Auth;

  constructor() {
    // Initialize Firebase authentication instance using Firebase app configuration.
    this.auth = getAuth(FirebaseConfig.getApp());
  }

  /**
   * Logs in a user using email and password.
   *
   * @param {string} email - User's email.
   * @param {string} password - User's password.
   * @returns {Promise<TaskResponse>} Response containing user data.
   */
  async login(email: string, password: string): Promise<TaskResponse> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return {
        data: userCredential.user,
        message: "Login successful",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Registers a new user using email and password.
   *
   * @param {string} email - User's email.
   * @param {string} password - User's password.
   * @returns {Promise<TaskResponse>} Response containing user data.
   */
  async register(email: string, password: string): Promise<TaskResponse> {
    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(this.auth, email, password);
      return {
        data: userCredential.user,
        message: "Registration successful",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Logs out the current user.
   *
   * @returns {Promise<TaskResponse>} Response confirming logout.
   */
  async logout(): Promise<TaskResponse> {
    try {
      await signOut(this.auth);
      return {
        data: null,
        message: "Logout successful",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Sends a password reset email to the user.
   *
   * @param {string} email - User's email.
   * @returns {Promise<TaskResponse>} Response confirming email sent.
   */
  async resetPassword(email: string): Promise<TaskResponse> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      return {
        data: null,
        message: "Password reset email sent",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Verifies the password reset code.
   *
   * @param {string} code - Password reset code.
   * @returns {Promise<TaskResponse>} Response containing user's email.
   */
  async verifyResetCode(code: string): Promise<TaskResponse> {
    try {
      const email = await verifyPasswordResetCode(this.auth, code);
      return {
        data: email,
        message: "Verification code is valid",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Confirms the password reset with a new password.
   *
   * @param {string} code - Password reset code.
   * @param {string} newPassword - New password to set.
   * @returns {Promise<TaskResponse>} Response confirming password reset.
   */
  async confirmPasswordReset(
    code: string,
    newPassword: string
  ): Promise<TaskResponse> {
    try {
      await confirmPasswordReset(this.auth, code, newPassword);
      return {
        data: null,
        message: "Password has been reset successfully",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Updates the user's password.
   *
   * @param {User} user - Current user.
   * @param {string} newPassword - New password to set.
   * @returns {Promise<TaskResponse>} Response confirming password update.
   */
  async updatePassword(user: User, newPassword: string): Promise<TaskResponse> {
    try {
      await updatePassword(user, newPassword);
      return {
        data: null,
        message: "Password updated successfully",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Updates the user's email.
   *
   * @param {User} user - Current user.
   * @param {string} newEmail - New email to set.
   * @returns {Promise<TaskResponse>} Response confirming email update.
   */
  async updateEmail(user: User, newEmail: string): Promise<TaskResponse> {
    try {
      await updateEmail(user, newEmail);
      return {
        data: null,
        message: "Email updated successfully",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Re-authenticates the user with email and password.
   *
   * @param {string} email - User's email.
   * @param {string} password - User's password.
   * @returns {Promise<TaskResponse>} Response confirming re-authentication.
   */
  async reauthenticate(email: string, password: string): Promise<TaskResponse> {
    try {
      const credential = EmailAuthProvider.credential(email, password);
      const user = this.auth.currentUser;
      if (!user) throw new Error("No user is currently signed in");
      await reauthenticateWithCredential(user, credential);
      return {
        data: null,
        message: "Re-Authentication successful",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Signs in with a third-party provider using the specified method.
   *
   * @param {any} provider - Authentication provider.
   * @param {"popup" | "redirect"} method - Sign-in method.
   * @returns {Promise<TaskResponse>} Response containing user data.
   */
  private async signInWithProvider(
    provider: AuthProvider,
    method: "popup" | "redirect" = "popup"
  ): Promise<TaskResponse> {
    try {
      let result: UserCredential | null = null;
      if (method === "popup") {
        result = await signInWithPopup(this.auth, provider);
      } else if (method === "redirect") {
        await signInWithRedirect(this.auth, provider);
        return { data: null, message: "Redirect sign-in initiated" };
      }

      if (result) {
        return {
          data: result.user,
          message: `${provider.constructor.name} sign-in successful`,
        };
      }

      throw new Error("Unexpected flow: result is null after sign-in");
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Signs in with Google using the specified method.
   *
   * @param {"popup" | "redirect"} method - Sign-in method.
   * @returns {Promise<TaskResponse>} Response containing user data.
   */
  async signInWithGoogle(
    method: "popup" | "redirect" = "popup"
  ): Promise<TaskResponse> {
    const provider = new GoogleAuthProvider();
    return this.signInWithProvider(provider, method);
  }

  /**
   * Signs in with Facebook using the specified method.
   *
   * @param {"popup" | "redirect"} method - Sign-in method.
   * @returns {Promise<TaskResponse>} Response containing user data.
   */
  async signInWithFacebook(
    method: "popup" | "redirect" = "popup"
  ): Promise<TaskResponse> {
    const provider = new FacebookAuthProvider();
    return this.signInWithProvider(provider, method);
  }

  /**
   * Signs in with Twitter using the specified method.
   *
   * @param {"popup" | "redirect"} method - Sign-in method.
   * @returns {Promise<TaskResponse>} Response containing user data.
   */
  async signInWithTwitter(
    method: "popup" | "redirect" = "popup"
  ): Promise<TaskResponse> {
    const provider = new TwitterAuthProvider();
    return this.signInWithProvider(provider, method);
  }

  /**
   * Signs in with Github using the specified method.
   *
   * @param {"popup" | "redirect"} method - Sign-in method.
   * @returns {Promise<TaskResponse>} Response containing user data.
   */
  async signInWithGithub(
    method: "popup" | "redirect" = "popup"
  ): Promise<TaskResponse> {
    const provider = new GithubAuthProvider();
    return this.signInWithProvider(provider, method);
  }

  /**
   * Signs in with Apple using the specified method.
   *
   * @param {"popup" | "redirect"} method - Sign-in method.
   * @returns {Promise<TaskResponse>} Response containing user data.
   */
  async signInWithApple(
    method: "popup" | "redirect" = "popup"
  ): Promise<TaskResponse> {
    const provider = new OAuthProvider("apple.com");
    return this.signInWithProvider(provider, method);
  }

  /**
   * Signs in with Microsoft using the specified method.
   *
   * @param {"popup" | "redirect"} method - Sign-in method.
   * @returns {Promise<TaskResponse>} Response containing user data.
   */
  async signInWithMicrosoft(
    method: "popup" | "redirect" = "popup"
  ): Promise<TaskResponse> {
    const provider = new OAuthProvider("microsoft.com");
    return this.signInWithProvider(provider, method);
  }

  /**
   * Signs in using phone number and app verifier.
   *
   * @param {string} phoneNumber - Phone number to sign in with.
   * @param {any} appVerifier - App verifier for phone number authentication.
   * @returns {Promise<TaskResponse>} Response containing confirmation result.
   */
  async signInWithPhoneNumber(
    phoneNumber: string,
    appVerifier: RecaptchaVerifier
  ): Promise<TaskResponse> {
    try {
      const confirmationResult = await signInWithPhoneNumber(
        this.auth,
        phoneNumber,
        appVerifier
      );
      return {
        data: confirmationResult,
        message: "Phone number sign-in successful",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Sets up a listener for changes in authentication state.
   *
   * @param {(user: User | null) => void} callback - Callback function for auth state changes.
   */
  onAuthStateChanged(callback: (user: User | null) => void): void {
    onAuthStateChanged(this.auth, callback);
  }
}

// Singleton pattern for FireAuthService
let fireAuthServiceCore: FireAuthService | null = null;

/**
 * Returns the singleton instance of FireAuthService.
 *
 * @returns {FireAuthService} The FireAuthService instance.
 */
const fireAuthService = (): FireAuthService => {
  if (!fireAuthServiceCore) {
    fireAuthServiceCore = new FireAuthService();
  }
  return fireAuthServiceCore;
};

export { fireAuthService };

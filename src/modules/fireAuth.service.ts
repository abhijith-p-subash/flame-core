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
} from "firebase/auth";
import FirebaseConfig from "../config/firebase.config";
import { TaskResponse } from "../utils/task";

class FireAuthService {
  private auth: Auth;

  constructor() {
    this.auth = getAuth(FirebaseConfig.getApp());
  }

  // Authentication Methods
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
      throw {
        error: error as Error,
        message: "Login failed",
      } as TaskResponse;
    }
  }

  async register(email: string, password: string): Promise<TaskResponse> {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      return {
        data: userCredential.user,
        message: "Registration successful",
      };
    } catch (error) {
      throw {
        error: error as Error,
        message: "Registration failed",
      } as TaskResponse;
    }
  }

  async logout(): Promise<TaskResponse> {
    try {
      await signOut(this.auth);
      return {
        data: null,
        message: "Logout successful",
      };
    } catch (error) {
      throw {
        error: error as Error,
        message: "Logout failed",
      } as TaskResponse;
    }
  }

  // Password Management Methods
  async resetPassword(email: string): Promise<TaskResponse> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      return {
        data: null,
        message: "Password reset email sent",
      };
    } catch (error) {
      throw {
        error: error as Error,
        message: "Failed to send password reset email",
      } as TaskResponse;
    }
  }

  async verifyResetCode(code: string): Promise<TaskResponse> {
    try {
      const email = await verifyPasswordResetCode(this.auth, code);
      return {
        data: email,
        message: "Verification code is valid",
      };
    } catch (error) {
      throw {
        error: error as Error,
        message: "Invalid verification code",
      } as TaskResponse;
    }
  }

  async confirmPasswordReset(code: string, newPassword: string): Promise<TaskResponse> {
    try {
      await confirmPasswordReset(this.auth, code, newPassword);
      return {
        data: null,
        message: "Password has been reset successfully",
      };
    } catch (error) {
      throw {
        error: error as Error,
        message: "Failed to reset password",
      } as TaskResponse;
    }
  }

  async updatePassword(user: User, newPassword: string): Promise<TaskResponse> {
    try {
      await updatePassword(user, newPassword);
      return {
        data: null,
        message: "Password updated successfully",
      };
    } catch (error) {
      throw {
        error: error as Error,
        message: "Failed to update password",
      } as TaskResponse;
    }
  }

  // Email Management Methods
  async updateEmail(user: User, newEmail: string): Promise<TaskResponse> {
    try {
      await updateEmail(user, newEmail);
      return {
        data: null,
        message: "Email updated successfully",
      };
    } catch (error) {
      throw {
        error: error as Error,
        message: "Failed to update email",
      } as TaskResponse;
    }
  }

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
      throw {
        error: error as Error,
        message: "Re-Authentication failed",
      } as TaskResponse;
    }
  }

  // Third-Party Authentication Methods with sign-in method selection
  private async signInWithProvider(
    provider: any,
    method: "popup" | "redirect" = "popup"
  ): Promise<TaskResponse> {
    try {
      let result: UserCredential | null = null; // Initialize `result` as null
      if (method === "popup") {
        result = await signInWithPopup(this.auth, provider);
      } else if (method === "redirect") {
        await signInWithRedirect(this.auth, provider);
        return { data: null, message: "Redirect sign-in initiated" };
      }
  
      // If method is 'popup', return the result after successful sign-in
      if (result) {
        return {
          data: result.user,
          message: `${provider.constructor.name} sign-in successful`,
        };
      }
  
      throw new Error("Unexpected flow: result is null after sign-in");
  
    } catch (error) {
      throw {
        error: error as Error,
        message: `${provider.constructor.name} sign-in failed`,
      } as TaskResponse;
    }
  }
  

  async signInWithGoogle(method: "popup" | "redirect" = "popup"): Promise<TaskResponse> {
    const provider = new GoogleAuthProvider();
    return this.signInWithProvider(provider, method);
  }

  async signInWithFacebook(method: "popup" | "redirect" = "popup"): Promise<TaskResponse> {
    const provider = new FacebookAuthProvider();
    return this.signInWithProvider(provider, method);
  }

  async signInWithTwitter(method: "popup" | "redirect" = "popup"): Promise<TaskResponse> {
    const provider = new TwitterAuthProvider();
    return this.signInWithProvider(provider, method);
  }

  async signInWithGithub(method: "popup" | "redirect" = "popup"): Promise<TaskResponse> {
    const provider = new GithubAuthProvider();
    return this.signInWithProvider(provider, method);
  }

  async signInWithPhoneNumber(phoneNumber: string, appVerifier: any): Promise<TaskResponse> {
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
      throw {
        error: error as Error,
        message: "Phone number sign-in failed",
      } as TaskResponse;
    }
  }

  // Listener Methods
  onAuthStateChanged(callback: (user: User | null) => void): void {
    onAuthStateChanged(this.auth, callback);
  }
}

// Singleton pattern for FireAuthService
let fireAuthServiceCore: FireAuthService | null = null;

const fireAuthService = (): FireAuthService => {
  if (!fireAuthServiceCore) {
    fireAuthServiceCore = new FireAuthService();
  }
  return fireAuthServiceCore;
};

export { fireAuthService };

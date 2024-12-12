import { getAuth, Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import FirebaseConfig from '../config/firebase.config';

class FireAuthService {
  private auth: Auth;

  constructor() {
    this.auth = getAuth(FirebaseConfig.getApp());
  }

  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    return userCredential.user;
  }

  async register(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    return userCredential.user;
  }

  async logout() {
    await signOut(this.auth);
  }
}

export default FireAuthService;

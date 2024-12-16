# FireAuthService Documentation

The `FireAuthService` is a lightweight and developer-friendly library designed to abstract and simplify Firebase Authentication. By providing a unified interface for various authentication methods, it streamlines the integration of Firebase into web applications. Developers can quickly implement login, registration, password reset, and social authentication with minimal boilerplate code.

The `FireAuthService` class simplifies Firebase Authentication for web applications. It offers various methods for user authentication and management, including login, registration, password reset, email updates, and social provider login.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Methods](#methods)
   - [login](#login)
   - [register](#register)
   - [logout](#logout)
   - [resetPassword](#resetpassword)
   - [verifyResetCode](#verifyresetcode)
   - [confirmPasswordReset](#confirmpasswordreset)
   - [updatePassword](#updatepassword)
   - [updateEmail](#updateemail)
   - [reauthenticate](#reauthenticate)
   - [signInWithGoogle](#signinwithgoogle)
   - [signInWithFacebook](#signinwithfacebook)
   - [signInWithTwitter](#signinwithtwitter)
   - [signInWithGithub](#signinwithgithub)
   - [signInWithApple](#signinwithapple)
   - [signInWithMicrosoft](#signinwithmicrosoft)
   - [signInWithPhoneNumber](#signinwithphonenumber)
   - [onAuthStateChanged](#onauthstatechanged)
3. [Demo Usage](#demo-usage)

---

## Getting Started

1. Install Firebase in your project:
   ```bash
   npm install firebase
   ```

2. Configure Firebase:
   ```typescript
   import { initializeApp } from "firebase/app";

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };

   const app = initializeApp(firebaseConfig);

   export default {
     getApp: () => app,
   };
   ```

3. Import and use the `FireAuthService`:
   ```typescript
   import { fireAuthService } from "./services/fireAuthService";

   const authService = fireAuthService();
   ```

---

## Methods

### login
Logs in a user using email and password.

**Parameters:**
- `email: string`: User's email.
- `password: string`: User's password.

**Returns:**
- `Promise<TaskResponse>`

**Example:**
```typescript
const response = await authService.login("test@example.com", "password123");
console.log(response);
```

---

### register
Registers a new user using email and password.

**Parameters:**
- `email: string`: User's email.
- `password: string`: User's password.

**Returns:**
- `Promise<TaskResponse>`

**Example:**
```typescript
const response = await authService.register("test@example.com", "password123");
console.log(response);
```

---

### logout
Logs out the current user.

**Returns:**
- `Promise<TaskResponse>`

**Example:**
```typescript
const response = await authService.logout();
console.log(response);
```

---

### resetPassword
Sends a password reset email to the user.

**Parameters:**
- `email: string`: User's email.

**Returns:**
- `Promise<TaskResponse>`

**Example:**
```typescript
const response = await authService.resetPassword("test@example.com");
console.log(response);
```

---

### verifyResetCode
Verifies the password reset code.

**Parameters:**
- `code: string`: Password reset code.

**Returns:**
- `Promise<TaskResponse>`

**Example:**
```typescript
const response = await authService.verifyResetCode("RESET_CODE");
console.log(response);
```

---

### confirmPasswordReset
Confirms the password reset with a new password.

**Parameters:**
- `code: string`: Password reset code.
- `newPassword: string`: New password to set.

**Returns:**
- `Promise<TaskResponse>`

**Example:**
```typescript
const response = await authService.confirmPasswordReset("RESET_CODE", "newPassword123");
console.log(response);
```

---

### updatePassword
Updates the user's password.

**Parameters:**
- `user: User`: Current user.
- `newPassword: string`: New password to set.

**Returns:**
- `Promise<TaskResponse>`

**Example:**
```typescript
const user = authService.auth.currentUser;
const response = await authService.updatePassword(user!, "newPassword123");
console.log(response);
```

---

### updateEmail
Updates the user's email.

**Parameters:**
- `user: User`: Current user.
- `newEmail: string`: New email to set.

**Returns:**
- `Promise<TaskResponse>`

**Example:**
```typescript
const user = authService.auth.currentUser;
const response = await authService.updateEmail(user!, "new@example.com");
console.log(response);
```

---

### reauthenticate
Re-authenticates the user with email and password.

**Parameters:**
- `email: string`: User's email.
- `password: string`: User's password.

**Returns:**
- `Promise<TaskResponse>`

**Example:**
```typescript
const response = await authService.reauthenticate("test@example.com", "password123");
console.log(response);
```

---

### signInWithGoogle
Signs in with Google using the specified method.

**Parameters:**
- `method: "popup" | "redirect"` (default: "popup")

**Returns:**
- `Promise<TaskResponse>`

**Example:**
```typescript
const response = await authService.signInWithGoogle();
console.log(response);
```

---

### signInWithFacebook
Signs in with Facebook using the specified method.

**Parameters:**
- `method: "popup" | "redirect"` (default: "popup")

**Returns:**
- `Promise<TaskResponse>`

**Example:**
```typescript
const response = await authService.signInWithFacebook();
console.log(response);
```

---

### signInWithTwitter
Signs in with Twitter using the specified method.

**Parameters:**
- `method: "popup" | "redirect"` (default: "popup")

**Returns:**
- `Promise<TaskResponse>`

**Example:**
```typescript
const response = await authService.signInWithTwitter();
console.log(response);
```

---

### signInWithGithub
Signs in with Github using the specified method.

**Parameters:**
- `method: "popup" | "redirect"` (default: "popup")

**Returns:**
- `Promise<TaskResponse>`

**Example:**
```typescript
const response = await authService.signInWithGithub();
console.log(response);
```

---

### signInWithApple
Signs in with Apple using the specified method.

**Parameters:**
- `method: "popup" | "redirect"` (default: "popup")

**Returns:**
- `Promise<TaskResponse>`

**Example:**
```typescript
const response = await authService.signInWithApple();
console.log(response);
```

---

### signInWithMicrosoft
Signs in with Microsoft using the specified method.

**Parameters:**
- `method: "popup" | "redirect"` (default: "popup")

**Returns:**
- `Promise<TaskResponse>`

**Example:**
```typescript
const response = await authService.signInWithMicrosoft();
console.log(response);
```

---

### signInWithPhoneNumber
Signs in using phone number and app verifier.

**Parameters:**
- `phoneNumber: string`: Phone number to sign in with.
- `appVerifier: RecaptchaVerifier`: App verifier for phone number authentication.

**Returns:**
- `Promise<TaskResponse>`

**Example:**
```typescript
const appVerifier = new RecaptchaVerifier("recaptcha-container", {}, authService.auth);
const response = await authService.signInWithPhoneNumber("+1234567890", appVerifier);
console.log(response);
```

---

### onAuthStateChanged
Sets up a listener for changes in authentication state.

**Parameters:**
- `callback: (user: User | null) => void`: Callback function for auth state changes.

**Example:**
```typescript
authService.onAuthStateChanged((user) => {
  console.log("User state changed:", user);
});
```

---

## Demo Usage

```typescript
import { fireAuthService } from "./services/fireAuthService";

const authService = fireAuthService();

// Login Example
(async () => {
  try {
    const loginResponse = await authService.login("test@example.com", "password123");
    console.log(loginResponse);
  } catch (error) {
    console.error("Login failed:", error);
  }
})();

// Logout Example
(async () => {
  try {
    const logoutResponse = await authService.logout();
    console.log(logoutResponse);
  } catch (error) {
    console.error("Logout failed:", error);
  }
})();
```


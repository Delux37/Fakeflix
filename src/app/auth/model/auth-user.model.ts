export interface AuthUser {
    displayName?: string;
    email: string;
    password: string;
  }
  
export interface AuthRes {
    displayName: string;
    idToken:	string;
    email:	string;
    refreshToken:	string;
    expiresIn:	string;
    localId:	string;
  }
// import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importar AngularFireAuth, não o módulo
// import * as firebase from 'firebase/app';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

// export  interface UserPro{
//   username: string;
//   uid: string;
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

//   private user!: UserPro;

//   constructor(private auth: AngularFireAuth) { } // Injetar AngularFireAuth, não o módulo

//   loginFireauth(value: { email: string, password: string }) {
//     return new Promise<any>((resolve, reject) => {
//       this.auth.signInWithEmailAndPassword(value.email, value.password)
//         .then(res => resolve(res))
//         .catch(error => reject(error)); // Utilizar catch para lidar com erros
//     });
//   }

//     // Método para verificar se o usuário está autenticado
//   isAuthenticated(): boolean {
//       const user = this.auth.currentUser;
//       return !!user;  // Retorna verdadeiro se user não é null ou undefined
//   }

//   setUser(user: UserPro){
//     return this.user = user;
//   }

//   getUID(): string{
//     return this.user.uid;
//   }

//   userRegistration(value: { email: string, password: string }): Promise<any> {
//     return this.auth.createUserWithEmailAndPassword(value.email, value.password)
//       .then(res => {
//         // Após criar o usuário, atualize o perfil com informações adicionais
//         const user = res.user;
//         // if (user) {
//         //   user.updateProfile({
//         //     displayName: value.names,
//         //     phoneNumber: value.phone
//         //   }).then(() => {
//         //     // Retorna o usuário atualizado
//         //     return user;
//         //   }).catch(error => {
//         //     throw error;
//         //   });
//         // }
//         // return res;
//       })
//       .catch(error => {
//         throw error;
//       });
//   }

// }

private token: string | null = null;
public userData$ = new BehaviorSubject<any>(null);

constructor(private http: HttpClient, private storageService: StorageService, private router: Router,) {
  this.loadStoredData();
}

async loadStoredData() {
  const storedToken = await this.storageService.get('token');
  const storedUser = await this.storageService.get('user');
  console.log('Loaded stored data:', { storedToken, storedUser });
  if (storedToken) {
    this.token = storedToken;
  }
  if (storedUser) {
    this.userData$.next(storedUser);
  }
}

async getToken() {
  return this.token;
}

async setToken(token: string) {
  this.token = token;
  await this.storageService.set('token', token);
  await this.getUserData();
}

async getUserData() {
  if (this.token) {
    this.http.get(`${environment.apiUrl}/rest-auth/user/`, {
      headers: { Authorization: `Token ${this.token}` }
    }).subscribe(
      async (res: any) => {
        this.userData$.next(res);
        await this.storageService.set('user', res);
        console.log('User data stored:', res);
      },
      error => {
        console.error('Error loading user data:', error);
      }
    );
  }
}

login(postData: any): Observable<any> {
  return this.http.post(`${environment.apiUrl}/rest-auth/login/`, postData).pipe(
    tap(async (res: any) => {
      await this.setToken(res.key);
      console.log('Token set and user data loaded:', res.key);
    })
  );
}

signup(postData: any): Promise<any> {
  return this.http.post(`${environment.apiUrl}/rest-auth/registration/`, postData).toPromise();
}

changePassword(postData: any): Promise<any> {
  return this.http.post(`${environment.apiUrl}/rest-auth/password/change/`, postData).toPromise();
}

// authenticateWithPin(pin: string): Promise<any> {
//   return this.http.post(`${environment.apiUrl}/rest-auth/authenticateWithPin/`, { pin }).toPromise();
// }

async authenticateWithPin(pin: string): Promise<boolean> {
  const storedPin = await this.storageService.getStoredPin();
  const ConvertedPin = '"'+pin+'"';
  // console.log("storedPin :",storedPin)
  // console.log("PinConvertido :",ConvertedPin)
  return storedPin === ConvertedPin
}

async logout() {
  this.token = null;
  this.userData$.next(null);
  await this.storageService.clear();
  this.router.navigate(['']);
}


async checkStoredToken() {
  const token = await this.storageService.get('token');
  console.log('Stored token:', token);
}

}

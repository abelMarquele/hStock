import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importar AngularFireAuth, não o módulo

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { } // Injetar AngularFireAuth, não o módulo

  loginFireauth(value: { email: string, password: string }) {
    return new Promise<any>((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(value.email, value.password)
        .then(res => resolve(res))
        .catch(error => reject(error)); // Utilizar catch para lidar com erros
    });
  }
}

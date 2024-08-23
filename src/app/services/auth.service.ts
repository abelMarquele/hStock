import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importar AngularFireAuth, não o módulo
import * as firebase from 'firebase/app';

export  interface UserPro{
  username: string;
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user!: UserPro;

  constructor(private auth: AngularFireAuth) { } // Injetar AngularFireAuth, não o módulo

  loginFireauth(value: { email: string, password: string }) {
    return new Promise<any>((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(value.email, value.password)
        .then(res => resolve(res))
        .catch(error => reject(error)); // Utilizar catch para lidar com erros
    });
  }

    // Método para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
      const user = this.auth.currentUser;
      return !!user;  // Retorna verdadeiro se user não é null ou undefined
  }

  setUser(user: UserPro){
    return this.user = user;
  }

  getUID(): string{
    return this.user.uid;
  }

  userRegistration(value: { email: string, password: string }): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        // Após criar o usuário, atualize o perfil com informações adicionais
        const user = res.user;
        // if (user) {
        //   user.updateProfile({
        //     displayName: value.names,
        //     phoneNumber: value.phone
        //   }).then(() => {
        //     // Retorna o usuário atualizado
        //     return user;
        //   }).catch(error => {
        //     throw error;
        //   });
        // }
        // return res;
      })
      .catch(error => {
        throw error;
      });
  }

}

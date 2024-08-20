import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validationUserMessage = {
    email: [
      { type: "required", message: "Please enter your Email" },
      { type: "pattern", message: "The Email entered is Incorrect. Try again" }
    ],
    password: [
      { type: "required", message: "Please Enter your Password!" },
      { type: "minlength", message: "The Password must be at least 5 characters or more" }
    ]
  }

  validationFormUser!: FormGroup; // Usa o operador de afirmação de não nulo aqui

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private router: Router, 
    private nav: NavController
  ) { }

  ngOnInit() {
    console.log('Initializing form...');
      this.validationFormUser = this.formBuilder.group({
        email: ['', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
        password: ['', Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])]
      });
    }
    
// teste@gmail.com / 123456

  LoginUser(value: any) {
    this.authService.loginFireauth(value).then(res => {
      console.log("Login success:", res);
      this.nav.navigateForward('/tabs'); // Modificar conforme necessário
    }).catch(err => {
      console.error("Login error:", err);
      // Pode querer mostrar um alerta de erro ao usuário aqui
    });
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.storageService.get('token').then(res => {
        if (res) {
          console.log('Token found, access granted');
          resolve(true);
        } else {
          console.log('No token found, redirecting to login');
          this.router.navigate(['login']);
          resolve(false);
        }
      }).catch(err => {
        console.error('Error retrieving token', err);
        resolve(false);
      });
    });
  }
}

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    console.log('Storage initialized');
  }

  async set(key: string, value: any): Promise<void> {
    console.log(`Setting ${key}:`, value);
    localStorage.setItem(key, JSON.stringify(value));
  }

  async get(key: string): Promise<any> {
    console.log(`Getting ${key}`);
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  async remove(key: string): Promise<void> {
    console.log(`Removing ${key}`);
    localStorage.removeItem(key);
  }

  async clear(): Promise<void> {
    console.log('Clearing storage');
    localStorage.clear();
  }



  public async getStoredPin(): Promise<string | null> {
    const pin = await localStorage.getItem('pin') as string | null;
    return pin;
  }

  async removeStorageItem(storageKey: any) {
    await this.storage.remove(storageKey);
  }

  async getFromStorage(key: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        const value = localStorage.getItem(key);
        resolve(value ? JSON.parse(value) : null);
      } catch (error) {
        reject(error);
      }
    });
  }
}


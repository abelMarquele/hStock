import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  categories = [
    { name: 'Medical Supplies', totalItems: 150, itemsNeededSoon: 20 },
    { name: 'Office Supplies', totalItems: 300, itemsNeededSoon: 30 },
    { name: 'Electronics', totalItems: 80, itemsNeededSoon: 10 }
  ];

  criticalStocks: any[] = [];
  totalCritical: number = 0;

  constructor(
    private apiService: ApiService,
    public navCtrl: NavController) {}

  ngOnInit() {
      this.loadCriticalStocks();
  }

  loadCriticalStocks() {
      this.apiService.getCriticalStocks().subscribe(stocks => {
        this.criticalStocks = stocks;
        this.totalCritical = stocks.length;
      });
  }

  goToCategory(name: string) {
    // Navigate to the specific category page
    console.log('Navigating to:', name);
    // this.navCtrl.navigateForward(`/category/${name}`);
  }

  loadData() {
    this.apiService.getCategorias().subscribe(data => {
      console.log(data);
    });
  }
}
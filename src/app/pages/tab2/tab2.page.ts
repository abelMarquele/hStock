import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StockCreateComponent } from '../../components/stock-create/stock-create.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  selectedStock: any;
  constructor(private modalController: ModalController,
    private router: Router,
  ) {}

  openCreateStockModal() {
    this.router.navigate(['stock-create']);
  }

  onStockSelected(stock: any) {
    this.selectedStock = stock;
  }
  
}


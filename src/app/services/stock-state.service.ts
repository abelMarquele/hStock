import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Stock {
  id: number;
  item: string;
  material: string;
  // Outras propriedades relevantes do stock
  stock_necessario: number;
  stock_existente: number;
}

@Injectable({
  providedIn: 'root'
})
export class StockStateService {
  private selectedStockSource = new BehaviorSubject<Stock | null>(null);
  selectedStock$ = this.selectedStockSource.asObservable();

  // selectStock(stock: Stock) {
  //   this.selectedStockSource.next(stock);
  // }
}

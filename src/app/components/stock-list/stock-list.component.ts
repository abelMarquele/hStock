import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  // @Output() stockSelected = new EventEmitter<number>();
  @Output() stockSelected = new EventEmitter<any>();
  stocks: any[] = [];
  filteredStocks: any[] = [];
  searchTerm: string = '';

  constructor(private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadStocks();
  }

  loadStocks() {
    this.apiService.getStocks().subscribe(stocks => {
      this.stocks = stocks;
      this.filteredStocks = stocks; // Inicialmente, todos os stocks são exibidos
      console.log('Stocks: ', stocks);
    });
  }

  filterStocks() {
    if (!this.searchTerm) {
      this.filteredStocks = this.stocks; // Se não há termo de procura, mostra todos
    } else {
      this.filteredStocks = this.stocks.filter(stock =>
        stock.material.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  selectStock(id: number) {
    this.router.navigate(['stock-detail', id]);
  }
  
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { PreviousService } from '../../services/previous.service';


@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit {
  stock: any;

  constructor(private apiService: ApiService, 
    private previousRouteService: PreviousService,
    private route: ActivatedRoute) {
    this.route.params.pipe(
      switchMap(params => {
        const id = +params['id'];  // o + converte a string para número
        if (isNaN(id)) {
          console.error('ID inválido fornecido na rota');
          return throwError('ID inválido fornecido na rota');  // Evita chamar a API com um ID inválido
        }
        return this.apiService.getStock(id);
      })
    ).subscribe(stock => {
      this.stock = stock;
    }, error => {
      console.error('Erro ao carregar os detalhes do stock:', error);
    });
  }

  ngOnInit() {

  }

  prevUrl = this.previousRouteService.getPreviousUrl();
  curUrl = this.previousRouteService.getCurrentUrl();
  
}

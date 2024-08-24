import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { PreviousService } from '../../services/previous.service';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.scss']
})
export class StockEditComponent implements OnInit, OnChanges {
  @Input() stockId: number | null = null;
  stockForm!: FormGroup;

  constructor(private apiService: ApiService, 
    private fb: FormBuilder,
    private previousRouteService: PreviousService,
    private route: ActivatedRoute) {
    this.createForm();
  }

  ngOnInit() {
      this.route.params.subscribe(params => {
        if (params['id']) {
          this.stockId = +params['id'];
          this.loadData();
        } else {
          console.error('Stock ID is missing in route parameters');
        }
      });
    }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Current stockId:', this.stockId);  // Adicione para depuração
    if (changes['stockId'] && this.stockId) {
      console.log('Updated stockId:', changes['stockId'].currentValue);
      this.loadData();
    }
  }

  createForm() {
    this.stockForm = this.fb.group({
      item: ['', Validators.required],
      material: ['', Validators.required],
      stock_necessario: ['', Validators.required],
      stock_existente: ['', Validators.required],
      stock_solicitar: ['', Validators.required],
      categoria_id: ['', Validators.required],
      us_id: ['', Validators.required]
    });
  }


  loadData() {
    if (this.stockId) {
      this.apiService.getStock(this.stockId).subscribe(stock => {
        console.log('Dados recebidos:', stock);  // Adicione para depuração
        this.stockForm.patchValue({
          item: stock.item,
          material: stock.material,
          stock_necessario: stock.stock_necessario,
          stock_existente: stock.stock_existente,
          stock_solicitar: stock.stock_solicitar,
          categoria_id: stock.categoria_id,
          us_id: stock.us_id
        });
      }, error => {
        console.error('Erro ao carregar os dados:', error);
      });
    } else {
      console.error('Stock ID is null');
    }
  }
  

  updateStock() {
    if (this.stockForm.valid && this.stockId) {
      this.apiService.updateStock(this.stockId, this.stockForm.value).subscribe(() => {
        console.log('Stock updated successfully');
      });
    }
  }

  prevUrl = this.previousRouteService.getPreviousUrl();
  curUrl = this.previousRouteService.getCurrentUrl();

}

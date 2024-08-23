import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.scss']
})
export class StockEditComponent {

  @Input() stockId: number | null = null;
  @Output() stockUpdated = new EventEmitter<boolean>();
  stockForm: FormGroup;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.stockForm = this.fb.group({
      item: ['', Validators.required],
      material: ['', Validators.required],
      stock_necessario: ['', Validators.required],
      stock_existente: ['', Validators.required],
      stock_solicitar: ['', Validators.required],
      categoria_id: ['', Validators.required],  // Ajuste conforme sua implementação
      us_id: ['', Validators.required]  // Ajuste conforme sua implementação
    });

    if (this.stockId) {
      this.loadStockData();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['stockId'] && changes['stockId'].currentValue != null) {
      this.loadStockData();
    }
  }
  

  loadStockData() {
    if (this.stockId != null) {
      this.apiService.getStock(this.stockId).subscribe(stock => {
        this.stockForm.patchValue(stock);
      });
    }
  }
  

  updateStock() {
    if (this.stockForm.valid) {
      if (this.stockId != null) {
        this.apiService.updateStock(this.stockId, this.stockForm.value).subscribe(() => {
          this.stockUpdated.emit(true);
        });
      }
    }
  }
}

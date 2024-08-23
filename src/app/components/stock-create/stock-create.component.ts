import { Component, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.scss']
})
export class StockCreateComponent {
  @Output() stockCreated = new EventEmitter<boolean>();
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
  }

  createStock() {
    if (this.stockForm.valid) {
      this.apiService.createStock(this.stockForm.value).subscribe(() => {
        this.stockCreated.emit(true);
      });
    }
  }
}

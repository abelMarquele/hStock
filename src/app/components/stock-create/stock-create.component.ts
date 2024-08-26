import { Component, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PreviousService } from '../../services/previous.service';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.scss']
})
export class StockCreateComponent {
  @Output() stockCreated = new EventEmitter<boolean>();
  stockForm: FormGroup;
  categorias: any[] = [];
  uss: any[] = [];

  constructor(private apiService: ApiService, 
    private previousRouteService: PreviousService,
    private fb: FormBuilder) {
    this.stockForm = this.fb.group({
      item: ['', Validators.required],
      material: ['', Validators.required],
      stock_necessario: ['', Validators.required],
      stock_existente: ['', Validators.required],
      stock_solicitar: ['', Validators.required],
      categoria: ['', Validators.required],  
      us: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.apiService.getCategorias().subscribe(data => {
      this.categorias = data;
    });

    this.apiService.getUS().subscribe(data => {
      this.uss = data;
    });
  }

  createStock() {
    if (this.stockForm.valid) {
      console.log('Enviando dados:', this.stockForm.value);
      this.apiService.createStock(this.stockForm.value).subscribe(() => {
        this.stockCreated.emit(true);
        console.log('Stock created successfully');
      });
    }
  }

  prevUrl = this.previousRouteService.getPreviousUrl();
  curUrl = this.previousRouteService.getCurrentUrl();
}

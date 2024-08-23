import { IonicModule } from '@ionic/angular';
import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { StockListComponent } from '../../components/stock-list/stock-list.component';  // Exemplo de componente importado
import { StockDetailComponent } from '../../components/stock-detail/stock-detail.component';  // Outro componente
import { StockCreateComponent } from '../../components/stock-create/stock-create.component';
import { StockEditComponent } from '../../components/stock-edit/stock-edit.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
  ],
  declarations: [Tab2Page, StockListComponent, StockDetailComponent, StockCreateComponent, StockEditComponent]  // Inclua seus componentes aqui
})
export class Tab2PageModule {}

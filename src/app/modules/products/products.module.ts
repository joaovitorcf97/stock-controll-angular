import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService } from 'primeng/api';
import { ProductsPageComponent } from './page/products-page/products-page.component';
import { RouterModule } from '@angular/router';
import { PRODUCTS_ROUTES } from './products.routing';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { TooltipModule } from 'primeng/tooltip';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductsTableComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(PRODUCTS_ROUTES),
    SharedModule,
    HttpClientModule,
    // PrimeNg
    CardModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    ToolbarModule,
    TooltipModule,
    DropdownModule,
  ],
  providers: [DialogService, ConfirmationService],
})
export class ProductsModule {}

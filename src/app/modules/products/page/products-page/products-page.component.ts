import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { DeleteProductAction } from 'src/app/models/interfaces/products/event/DeleteProductAction';
import { EventAction } from 'src/app/models/interfaces/products/event/EventAction';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';
import { ProductFormComponent } from '../../components/product-form/product-form.component';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: [],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public productsData: Array<GetAllProductsResponse> = [];
  private ref!: DynamicDialogRef;

  constructor(
    private productsService: ProductsService,
    private productDataTransferService: ProductsDataTransferService,
    private router: Router,
    private message: MessageService,
    private confirmation: ConfirmationService,
    private dialog: DialogService
  ) {}

  ngOnInit(): void {
    this.getServiceProdutsData();
  }

  getServiceProdutsData() {
    const productsLoaded = this.productDataTransferService.getProductsData();

    if (productsLoaded.length > 0) {
      this.productsData = productsLoaded;
    } else {
      this.getAPIProductsData();
    }
  }

  getAPIProductsData() {
    this.productsService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.productsData = response;
        },
        error: (error) => {
          console.log(error);
          this.message.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar produtos',
            life: 2000,
          });
          this.router.navigate(['/dashboard']);
        },
      });
  }

  handleProductAction(event: EventAction): void {
    if (event) {
      this.ref = this.dialog.open(ProductFormComponent, {
        header: event?.action,
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event: event,
          productsData: this.productsData,
        },
      });
      this.ref.onClose
        .pipe(takeUntil(this.destroy$))
        .subscribe({ next: () => this.getAPIProductsData() });
    }
  }

  handleDeleteProductAction(event: DeleteProductAction): void {
    if (event) {
      this.confirmation.confirm({
        message: `Confirma a exlusão do produto ${event.productName}`,
        header: `Confirmação de exlusão`,
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteProduct(event?.product_id),
      });
    }
  }
  deleteProduct(product_id: string) {
    if (product_id) {
      this.productsService
        .deleteProduct(product_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.message.add({
                severity: 'success',
                summary: 'Sucess',
                detail: 'Producto removido com sucesso',
                life: 2000,
              });

              this.getAPIProductsData();
            }
          },
          error: (error) => {
            console.log(error);
            this.message.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao remover produto',
              life: 2000,
            });
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

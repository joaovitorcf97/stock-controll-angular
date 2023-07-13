import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: [],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public productsData: Array<GetAllProductsResponse> = [];

  constructor(
    private productsService: ProductsService,
    private productDataTransferService: ProductsDataTransferService,
    private router: Router,
    private message: MessageService
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

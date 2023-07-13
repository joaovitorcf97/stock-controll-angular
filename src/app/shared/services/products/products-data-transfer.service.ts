import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductsDataTransferService {
  public productDataEmmiter$ =
    new BehaviorSubject<Array<GetAllProductsResponse> | null>(null);
  public productData: Array<GetAllProductsResponse> = [];

  setProductsData(productsData: Array<GetAllProductsResponse>): void {
    if (productsData) {
      this.productDataEmmiter$.next(productsData);
      this.getProductsData();
    }
  }

  getProductsData() {
    this.productDataEmmiter$
      .pipe(
        take(1),
        map((data) => data?.filter((product) => product.amount > 0))
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.productData = response;
          }
        },
      });

    return this.productData;
  }
}

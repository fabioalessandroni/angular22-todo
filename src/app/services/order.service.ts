import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, OrderRequest } from './types';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly httpClient = inject(HttpClient);

  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>('/orders');
  }

  submitOrder(orderRequest: OrderRequest): Observable<Order> {
    return this.httpClient.post<Order>('/orders', orderRequest);
  }
}

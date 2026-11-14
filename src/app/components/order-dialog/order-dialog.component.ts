import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { finalize } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { Book } from '../../services/types';

@Component({
  selector: 'app-order-dialog',
  imports: [FormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './order-dialog.component.html'
})
export class OrderDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<OrderDialogComponent, boolean>);
  private readonly orderService = inject(OrderService);
  readonly book = inject<Book>(MAT_DIALOG_DATA);

  bookQuantity = 1;
  readonly invio = signal(false);

  submitOrder(): void {
    this.invio.set(true);
    this.orderService
      .submitOrder({ isbn: this.book.isbn, quantity: this.bookQuantity })
      .pipe(finalize(() => this.invio.set(false)))
      .subscribe(() => this.dialogRef.close(true));
  }
}

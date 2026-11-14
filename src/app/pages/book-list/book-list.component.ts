import { Component, OnInit, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatList, MatListItem } from '@angular/material/list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from '../../services/types';
import { BookService } from '../../services/book.service';
import { OrderDialogComponent } from '../../components/order-dialog/order-dialog.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatIconButton,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatList,
    MatListItem,
    MatProgressSpinner
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  private readonly bookService = inject(BookService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  readonly books = signal<Book[] | null>(null);
  readonly errore = signal('');

  readonly colNumber = toSignal(
    inject(BreakpointObserver)
      .observe(Breakpoints.Handset)
      .pipe(map(({ matches }) => (matches ? 1 : 3))),
    { initialValue: 3 }
  );

  ngOnInit(): void {
    this.caricaLibri();
  }

  caricaLibri(): void {
    this.errore.set('');
    this.bookService.getBooks().subscribe({
      // Il fallback del circuit breaker di Edge Service risponde 200 con corpo vuoto → null
      next: books => this.books.set(books ?? []),
      error: () => {
        this.books.set([]);
        this.errore.set('Impossibile caricare il catalogo. Il backend è avviato su localhost:9000?');
      }
    });
  }

  removeBook(isbn: string): void {
    this.bookService.deleteBook(isbn).subscribe(() => this.caricaLibri());
  }

  createOrder(book: Book): void {
    this.dialog
      .open(OrderDialogComponent, { width: '320px', data: book })
      .afterClosed()
      .subscribe(ordinato => {
        if (ordinato) {
          this.snackBar.open(`Ordine inviato per "${book.title}"`, 'OK', { duration: 3000 });
        }
      });
  }
}

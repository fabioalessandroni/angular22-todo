import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { AttivitaService } from '../../services/attivita';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-attivita',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './attivita.html',
  styleUrl: './attivita.css'
})
export class AttivitaComponent {
  readonly attivitaService = inject(AttivitaService);
  private readonly api = inject(ApiService);

  nuovoTitolo = '';
  readonly caricamento = signal(false);
  readonly errore = signal('');
  readonly messaggio = signal('');

  aggiungi(): void {
    const titolo = this.nuovoTitolo.trim();
    if (!titolo) return;

    this.attivitaService.aggiungi(titolo);
    this.nuovoTitolo = '';
    this.messaggio.set('Attività aggiunta.');
    this.errore.set('');
  }

  caricaDatiDemo(): void {
    this.caricamento.set(true);
    this.errore.set('');
    this.messaggio.set('');

    this.api.getAttivita(5)
      .pipe(finalize(() => this.caricamento.set(false)))
      .subscribe({
        next: items => {
          this.attivitaService.importa(items);
          this.messaggio.set(`Caricate ${items.length} attività da JSONPlaceholder.`);
        },
        error: () => {
          this.errore.set('Non è stato possibile contattare il servizio. Controlla la connessione Internet e riprova.');
        }
      });
  }

  elimina(id: number): void {
    this.attivitaService.elimina(id);
    this.messaggio.set('Attività eliminata.');
    this.errore.set('');
  }

  cambiaStato(id: number): void {
    this.attivitaService.cambiaStato(id);
  }
}

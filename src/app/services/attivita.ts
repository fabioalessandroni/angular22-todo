import { Injectable, computed, signal } from '@angular/core';
import { Attivita } from '../models/attivita.model';

@Injectable({
  providedIn: 'root'
})
export class AttivitaService {
  private readonly _attivita = signal<Attivita[]>([
    { id: 1, title: 'Studiare Angular', completed: true },
    { id: 2, title: 'Imparare TypeScript', completed: false },
    { id: 3, title: 'Creare il primo progetto', completed: false }
  ]);

  readonly attivita = this._attivita.asReadonly();
  readonly totale = computed(() => this._attivita().length);
  readonly completate = computed(
    () => this._attivita().filter(item => item.completed).length
  );
  readonly daCompletare = computed(
    () => this.totale() - this.completate()
  );

  aggiungi(titolo: string): void {
    const pulito = titolo.trim();
    if (!pulito) return;

    const nuovoId = this._attivita().reduce(
      (massimo, item) => Math.max(massimo, item.id),
      0
    ) + 1;

    this._attivita.update(lista => [
      ...lista,
      { id: nuovoId, title: pulito, completed: false }
    ]);
  }

  elimina(id: number): void {
    this._attivita.update(lista =>
      lista.filter(item => item.id !== id)
    );
  }

  cambiaStato(id: number): void {
    this._attivita.update(lista =>
      lista.map(item =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  importa(items: Attivita[]): void {
    this._attivita.set(items);
  }
}

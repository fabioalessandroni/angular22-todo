import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AttivitaComponent } from './pages/attivita/attivita';
import { ContattiComponent } from './pages/contatti/contatti';
import { BookListComponent } from './pages/book-list/book-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home | Gestione attività' },
  { path: 'attivita', component: AttivitaComponent, title: 'Attività | Gestione attività' },
  { path: 'libri', component: BookListComponent, title: 'Libri | Gestione attività' },
  { path: 'contatti', component: ContattiComponent, title: 'Contatti | Gestione attività' },
  { path: '**', redirectTo: '' }
];

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AttivitaService } from '../../services/attivita';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  readonly attivitaService = inject(AttivitaService);
}

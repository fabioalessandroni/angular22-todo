# Angular 22 – Gestione attività

Piccola applicazione didattica Angular con componenti standalone, Angular Router, Services, Signals e chiamate HTTP tramite `HttpClient`.

## Requisiti

- Node.js compatibile con Angular CLI 22
- npm
- Visual Studio Code (facoltativo)

## Installazione

Apri il terminale nella cartella del progetto ed esegui:

```bash
npm install
```

## Avvio in sviluppo

```bash
npm start
```

Apri il browser su:

<http://localhost:4200>

## Build

```bash
npm run build
```

I file compilati vengono generati in `dist/angular22-todo`.

## Funzionalità

- **Home**: dashboard con conteggio delle attività.
- **Attività**: aggiunta, completamento ed eliminazione delle attività.
- **Carica dati demo**: importa 5 attività da JSONPlaceholder tramite HTTP GET.
- **Contatti**: pagina di esempio.
- **Routing**: navigazione client-side tra le pagine.
- **AttivitaService**: stato condiviso tramite Angular Signals.
- **ApiService**: chiamate REST con `HttpClient`.

## API demo

La pagina Attività può caricare dati da:

`https://jsonplaceholder.typicode.com/todos`

È necessaria una connessione Internet per questa funzione. JSONPlaceholder è un servizio dimostrativo: le operazioni di scrittura non vengono salvate in modo permanente.

## Struttura

```text
src/
  app/
    models/
      attivita.model.ts
    pages/
      home/
      attivita/
      contatti/
    services/
      attivita.ts
      api.ts
    app.config.ts
    app.routes.ts
    app.ts
    app.html
    app.css
  index.html
  main.ts
  styles.css
```

## Concetti Angular da osservare

1. `provideRouter(routes)` registra le rotte.
2. `RouterOutlet` indica dove viene visualizzata la pagina corrente.
3. `RouterLink` permette di navigare senza ricaricare l'intera applicazione.
4. `inject(AttivitaService)` recupera il servizio tramite Dependency Injection.
5. `signal()` mantiene lo stato reattivo.
6. `provideHttpClient()` abilita le richieste HTTP.
7. `HttpClient.get()` restituisce un Observable.
8. `subscribe()` riceve la risposta HTTP; `finalize()` termina lo stato di caricamento anche in caso di errore.

> Nota: il progetto usa le versioni principali Angular 22 indicate in `package.json`. Se la tua installazione locale non dispone ancora di queste versioni, verifica la disponibilità dei pacchetti sul registry npm prima di eseguire `npm install`.

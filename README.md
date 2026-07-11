# PorcheDotto — Backend API 🐷

Backend REST per **PorcheDotto**, una porchetteria a tema pseudo-scientifico: gestisce catalogo prodotti, categorie, recensioni e un assistente conversazionale basato su AI per la navigazione e i consigli sul menu.

## Descrizione

Il progetto espone un'API REST costruita con Express per servire il catalogo prodotti di una porchetteria fittizia, permettendo inoltre di scrivere/gestire recensioni sui prodotti. È integrato un layer di agenti AI (LangChain + Anthropic Claude) che offre funzionalità di routing conversazionale, ricerca prodotti, consigli personalizzati e navigazione assistita tramite un endpoint di chat.

## Stack Tecnologico

- **Runtime**: Node.js (ESM)
- **Framework HTTP**: Express 5
- **Database**: MySQL (driver `mysql2`)
- **AI / Agenti**: LangChain, `@langchain/anthropic` (Claude)
- **Validazione**: Zod
- **Altro**: CORS
- **Package manager**: pnpm

## Prerequisiti

- Node.js (versione compatibile con Express 5 e dipendenze ESM, consigliata >= 18)
- [pnpm](https://pnpm.io/) `10.33.2` o superiore
- Un'istanza MySQL raggiungibile (locale o remota)
- Una API key Anthropic (Claude) per abilitare le funzionalità AI

## Installazione

Clona il repository e installa le dipendenze con pnpm:

```bash
pnpm install
```

### Configurazione

Copia il file di esempio delle variabili d'ambiente e valorizzalo:

```bash
cp .env.example .env
```

| Variabile        | Descrizione                          |
| ---------------- | ------------------------------------- |
| `PORT`           | Porta su cui il server Express ascolta |
| `DB_HOSTNAME`    | Host del database MySQL               |
| `DB_PORT`        | Porta del database MySQL              |
| `DB_USERNAME`    | Utente del database                   |
| `DB_PASSWORD`    | Password del database                 |
| `DB_DATABASE`    | Nome del database                     |
| `CLAUDE_API_KEY` | API key Anthropic per gli agenti AI   |

Le migrazioni SQL e un dump di dati di esempio sono disponibili in `db/migrations/` e `db/dumps/`.

## Utilizzo

Avvio in modalità sviluppo (restart automatico sui cambi file):

```bash
pnpm watch
```

Avvio in modalità standard:

```bash
pnpm start
```

Il server espone le seguenti risorse principali:

| Metodo | Endpoint                  | Descrizione                          |
| ------ | -------------------------- | ------------------------------------- |
| GET    | `/products`                | Elenco prodotti                       |
| GET    | `/products/:id`            | Dettaglio prodotto                    |
| GET    | `/products/:id/reviews`    | Recensioni di un prodotto             |
| GET    | `/categories`               | Elenco categorie                      |
| GET    | `/categories/:id/products` | Prodotti di una categoria             |
| GET    | `/reviews`                  | Elenco recensioni                     |
| GET    | `/reviews/:id`              | Dettaglio recensione                  |
| POST   | `/reviews`                  | Creazione recensione                  |
| PUT    | `/reviews/:id`              | Modifica recensione                   |
| DELETE | `/reviews/:id`              | Cancellazione recensione              |
| POST   | `/ai/chat`                  | Chat con l'assistente AI del catalogo |

Gli asset statici delle immagini prodotto sono serviti da `/assets`.

## Struttura del progetto

```
├── AI/                # Agenti, tool e modelli LangChain/Claude
├── config/            # Connessione al database
├── controllers/       # Logica delle route
├── db/                # Migrazioni SQL e dump di esempio
├── middlewares/        # Validazioni (id, recensioni)
├── public/assets/       # Immagini prodotto
├── routers/            # Definizione delle route Express
└── index.js            # Entry point dell'applicazione
```

## Contributi

Progetto sviluppato dal **Gruppo 4**:

- Francesco Cassese
- Francesco E. Floris
- Alessia Di Ruggiero
- Giulia Buonasperanza
- Ivan V. Caldarella

## Licenza

Distribuito con licenza **ISC** (vedi `package.json`).

# Guida al Tracking Clarity — Gymme

## Come accedere a Clarity

Dashboard: [clarity.microsoft.com](https://clarity.microsoft.com)
Progetto: **xb1l4ggnzd**

---

## 1. Conversion Performance

### Form Abandonment Rate
**Dove:** Dashboard → **Events** → cerca `form_abandon`

Confronta `email_focus` vs `form_abandon` vs `email_submit`:
- `email_focus` = utenti che hanno toccato il campo email
- `form_abandon` = utenti che hanno toccato il campo ma sono usciti senza inviare
- `email_submit` = utenti che hanno cliccato il tasto di invio

**Formula manuale:** `form_abandon / email_focus × 100 = % abbandono form`

> Clarity non calcola automaticamente rapporti tra eventi — usa i conteggi raw dagli Event Reports.

### Conversion Rate (form completata)
**Dove:** Dashboard → **Events** → `email_submit`

Il numero di sessioni con almeno un `email_submit` diviso le sessioni totali del periodo.

### CTA Clicks tracciati
| Evento | Descrizione |
|---|---|
| `hero_cta_click` | Bottone principale nella Hero |
| `cta_section_click` | Sezione CTA a metà pagina |
| `footer_demo_click` | Bottone demo nel footer |
| `navbar_demo_click` | Bottone demo nella navbar |

---

## 2. Traffic & Acquisition

### Sessions by Source (UTM)
**Dove:** Dashboard → **Filters** → seleziona **Custom tags**

Tutti i tag UTM vengono applicati come custom tag Clarity alla sessione:

| Tag Clarity | Parametro URL | Esempio |
|---|---|---|
| `utm_source` | `?utm_source=` | `google`, `facebook`, `newsletter` |
| `utm_medium` | `?utm_medium=` | `cpc`, `organic`, `email` |
| `utm_content` | `?utm_content=` | `banner_v1`, `text_link` |
| `utm_term` | `?utm_term=` | `personal trainer app` |
| `campaign` | `?utm_campaign=` o `?campaign=` | `lancio_maggio` |

**Come filtrare:** Filters → Custom Tags → seleziona `utm_source` → scegli il valore → applica. Puoi combinare più filtri per vedere solo le sessioni da Google Ads, o da una campagna specifica.

### New vs. Returning Visitors
**Dove:** Dashboard → **Filters** → Custom Tags → `visitor_type`

- `visitor_type = new` → prima visita (nessun cookie `gymme_visited` in localStorage)
- `visitor_type = returning` → visita successiva alla prima

Filtrando per questo tag puoi confrontare: bounce rate, scroll depth, conversioni tra nuovi e ricorrenti.

### Lead Tracking
**Dove:** Dashboard → **Filters** → Custom Tags → `lead_id`

Se l'URL contiene `?lead=XYZ`, la sessione viene taggata con `lead_id = XYZ`. Utile per tracciare un lead specifico attraverso più sessioni o per correlare con il CRM.

---

## 3. User Engagement

### Scroll Depth
**Dove:** Dashboard → **Events** → cerca `scroll_25`, `scroll_50`, `scroll_75`, `scroll_100`

| Evento | Significato |
|---|---|
| `scroll_25` | Utente ha scrollato fino al 25% della pagina |
| `scroll_50` | Utente ha scrollato fino al 50% |
| `scroll_75` | Utente ha scrollato fino al 75% |
| `scroll_100` | Utente ha raggiunto il fondo della pagina |

**Come usarli:** confronta il volume di `scroll_25` vs `scroll_100` per capire a che punto la pagina perde gli utenti. Se `scroll_50` è molto più basso di `scroll_25`, la sezione centrale non trattiene.

### Bounce Rate & Average Time on Page
**Dove:** Dashboard → **Overview** (pannello principale)

Clarity li calcola nativamente — non richiedono eventi custom. Si trovano nelle metriche aggregate in alto nella dashboard (Dead Clicks, Rage Clicks, Session time, etc.).

### Interazioni con i contenuti
Tracciamo anche le interazioni sulle sezioni principali della pagina:

| Evento | Descrizione |
|---|---|
| `engage_accordion_*` | Fisarmonica nella sezione Engage |
| `scale_accordion_*` | Fisarmonica nella sezione Scale |
| `motivate_accordion_*` | Fisarmonica nella sezione Motivate |
| `plan_tab_click_schede` | Tab "Schede & Protocolli" |
| `plan_tab_click_calendario` | Tab "Calendario & Sedute" |
| `plan_tab_click_crm` | Tab "CRM Clienti" |

---

## 4. Come usare i filtri Clarity per combinare metriche

### Flusso consigliato per analizzare una campagna
1. Filters → Custom Tags → `utm_source = google`
2. Aggiungi → Custom Tags → `visitor_type = new`
3. Guarda: scroll depth events, `email_submit`, `form_abandon`

### Flusso per identificare friction nel form
1. Events → cerca `email_focus` → annota il count
2. Events → cerca `form_abandon` → annota il count
3. Events → cerca `email_submit` → annota il count
4. Guarda le session recordings filtrate per `form_abandon` per vedere esattamente cosa succede prima che l'utente abbandoni

### Flusso per vedere heatmap per segmento
1. Heatmaps → seleziona la pagina
2. Filters → applica `utm_medium = cpc` (o qualsiasi segmento)
3. La heatmap si aggiorna in tempo reale per quel segmento

---

## 5. Riepilogo di tutti gli eventi tracciati

| Evento | Categoria | Tipo |
|---|---|---|
| `email_focus` | Conversion | Event |
| `email_submit` | Conversion | Event |
| `form_abandon` | Conversion | Event |
| `hero_cta_click` | Conversion | Event |
| `cta_section_click` | Conversion | Event |
| `footer_demo_click` | Conversion | Event |
| `navbar_demo_click` | Conversion | Event |
| `scroll_25/50/75/100` | Engagement | Event |
| `engage_accordion_*` | Engagement | Event |
| `scale_accordion_*` | Engagement | Event |
| `motivate_accordion_*` | Engagement | Event |
| `plan_tab_click_*` | Engagement | Event |
| `nav_*` | Navigation | Event |
| `mobile_menu_open/close` | Navigation | Event |
| `banner_registrati_click` | Navigation | Event |
| `banner_close` | Navigation | Event |
| `visitor_type` | Acquisition | Custom Tag |
| `utm_source` | Acquisition | Custom Tag |
| `utm_medium` | Acquisition | Custom Tag |
| `utm_content` | Acquisition | Custom Tag |
| `utm_term` | Acquisition | Custom Tag |
| `campaign` | Acquisition | Custom Tag |
| `lead_id` | Identity | Custom Tag |

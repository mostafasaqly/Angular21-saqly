# Angular 21 – Saqly Learning Path

This repository contains a complete, structured learning path for **Angular 21**, aligned with the official Angular documentation.  
Each folder represents a chapter with practical demos and real-world examples.

---

## 1. Introduction

Core Angular concepts and quick-start materials.

### Topics
- What is Angular
- Installation
- Essentials

### Folder
`src/app/Essentials`

---

## 2. Signals

Modern reactivity system introduced in Angular 21.

### Topics
- Signal basics
- Computed & Effects
- Signal-based forms

### Folder
`src/app/Signals`

---

## 3. Components

Building UI using standalone Angular components.

### Topics
- Inputs & Outputs
- Change Detection
- Content Projection

### Folder
`src/app/Components`

---

## 4. Templates

New Angular template syntax and control flow.

### Topics
- `@if`, `@for`, `@switch`
- Template expression rules
- Performance-friendly rendering

### Folder
`src/app/Templates`

---

## 5. Directives

Creating and using Angular directives.

### Topics
- Structural Directives
- Attribute Directives
- Reusable directive patterns

### Folder
`src/app/Directives Part`

---

## 6. Dependency Injection

Modern DI system in Angular 21.

### Topics
- `inject()` API
- Provider scopes
- Tree-shakable providers

### Folder
`src/app/Dependency injection`

---

## 7. Routing

Complete routing playground aligned with Angular documentation.

### Topics
- Navigation
- Route Params & Query Params
- Guards & Resolvers
- Child Routes

### Folder
`src/app/Routing`

---

## 8. Forms

All Angular form APIs demonstrated in one structured section.

### Topics
- Signal Forms
- Reactive & Typed Forms
- Template-driven Forms
- Dynamic `FormArray`

### Folder
`src/app/Forms`

---

## 9. HTTP Client

Complete CRUD and networking demos using `HttpClient`.

### Topics
- GET / POST / PUT / DELETE
- `httpResource` API
- Interceptors
- Apidog mock backend

### Folder
`src/app/Http`

---

## 10. Server-side & Hybrid Rendering 

Performance-focused rendering demos aligned with Angular guides.

### References
- https://angular.dev/guide/ssr
- https://angular.dev/guide/hydration
- https://angular.dev/guide/incremental-hydration

### Goal
Demonstrate SSR basics, hydration, incremental hydration, and hybrid rendering patterns.

### What’s Included
- Server-side rendering setup
- Client hydration using `provideClientHydration()`
- Event replay during hydration
- Incremental Hydration for partial page activation
- `@defer` blocks for hybrid / lazy rendering

### Key Files
- `src/app/app.config.ts` → hydration providers
- `src/main.ts` / `src/app/appStart.ts` → SSR-ready bootstrap
- `src/app/Performance/*` → performance & hydration demos

### Example
```ts
provideClientHydration(
  withEventReplay(),
  withIncrementalHydration(),
);




## RxJS (Overview → Operators → HttpClient)

Aligned with: https://rxjs.dev/guide/overview

### Topics
- Creating Observables (manual / `of` / `from` / `interval`)
- Core operators (`map`, `filter`, `tap`, `take`, `finalize`)
- HttpClient operators:
  - `switchMap` (search / cancel previous)
  - `mergeMap` (parallel requests)
  - `concatMap` (queue requests)
  - `exhaustMap` (prevent double submit)
- Error handling (`catchError`, `retry`, `timeout`)
- Combining streams (`forkJoin`, `combineLatest`)

### Folder
`src/app/Rxjs`


---

## 11. Unit Testing (Vitest)

Angular 21 uses **Vitest** as the default unit testing framework for new CLI projects (fast Node runner with a DOM emulation like `jsdom`).  
This section includes practical demos for testing **components, services, directives, pipes, forms, and routing**.

### Topics
- Component testing (DOM, events, `@Input` / `@Output`, Signals)
- Reactive Forms testing (validation + submit)
- Services testing (pure services + `HttpClientTesting`)
- Attribute directives testing
- Pipes testing (e.g., SafeUrlPipe)
- Routing & navigation testing (PUBLIC_ROUTES, redirects, navigation)

### Folder
`src/app/Unit Testing`

---

### Run Tests

#### Run all unit tests (watch mode) Jasmine & Karma
```bash
ng test```

#### Run all unit tests (watch mode) Vitest
```bash
npm run test:vitest:ui```



## 12. Internationalization (i18n)

Angular 21 supports both **static (build-time)** and **runtime** internationalization strategies.  
This section demonstrates **both approaches**, aligned with real-world Angular applications.

---

### 1. Static Internationalization (XLF – Build-time)

Angular built-in i18n using **XLIFF (XLF)** files.  
Each language is compiled into a **separate application build**.

### Topics
- Angular built-in i18n
- XLIFF (XLF) translation files
- Build-time localization
- Multiple locale builds (e.g. `en`, `ar`)
- RTL support for Arabic
- SEO-friendly pages

### Folder
`src/app/Internationalization`

### Build Localized Versions
```bash
ng serve --configuration=ar --port 4300 -o
ng serve --configuration=en --port 4200 -o
```

---

### 2. Runtime Internationalization (JSON – Transloco)

Runtime language switching using **JSON-based translations** without rebuilding the application.

### Topics
- Runtime language switching
- JSON translation files
- User language preference
- RTL / LTR handling at runtime
- Standalone-friendly configuration
### Install
`npm i @ngneat/transloco` 
### Folder
`src/app/Runtime-Localization`

### Translation Assets
```text
public/i18n
 ├─ en.json
 └─ ar.json
```

### Run Runtime i18n Demo
```bash
ng serve
```

---

### Summary
- **XLF (Build-time)** → Static, SEO-friendly, separate builds per language
- **JSON (Runtime)** → Dynamic, instant language switching without rebuild

This setup reflects **best practices used in production Angular applications**.

---

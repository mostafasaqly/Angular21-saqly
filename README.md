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

## 10. Server-side & Hybrid Rendering (Updated)

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

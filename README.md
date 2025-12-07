# Angular 21 – Saqly Learning Path

This repository contains a full learning path for Angular 21, organized to match the official Angular Documentation structure.  
Each folder represents a topic or chapter demonstrated in the project.

---

## 1. Introduction
Fundamental Angular concepts and quick start materials.

- What is Angular?  
- Installation  
- Essentials → [`/src/app/Essentials`](src/app/Essentials)  
- Start Coding  

---

## 2. Signals (In-depth Guides)
Modern Angular reactivity using Signals.

Topics include:

- Signal basics  
- Computed signals  
- Effects  
- Signal-based forms  
- Best practices  

Folder:  
[`/src/app/Signals`](src/app/Signals)

---

## 3. Components
Everything related to building and understanding Angular components.

- Component structure  
- Inputs & Outputs  
- Change Detection  
- Content Projection (`ng-content`)  
- View Queries  

Folder:  
[`/src/app/Components`](src/app/Components)

---

## 4. Templates
Full coverage of the new Angular template syntax.

- Control Flow (`@if`, `@for`, `@switch`)  
- Blocks  
- Template expressions  
- Rendering performance tips  

Folder:  
[`/src/app/Templates`](src/app/Templates)

---

## 5. Directives
Deep dive into Angular directives.

- Structural directives  
- Attribute directives  
- HostBinding / HostListener  
- Reusable directive patterns  

Folder:  
[`/src/app/Directives Part`](src/app/Directives%20Part)

---

## 6. Dependency Injection (Updated)
Modern DI system in Angular 21.

Topics include:

- `inject()` function  
- `providedIn` options  
- Tree-shakable providers  
- Hierarchical injectors  

Folder:  
[`/src/app/Dependency injection`](src/app/Dependency%20injection)

---

## 7. Routing (Updated) 
# Angular Routing Demo (v21)

This folder contains a **complete routing playground** that follows the official
[`angular.dev/guide/routing`](https://angular.dev/guide/routing) topics and shows
them all in a single demo app.

The goal is to use it in teaching / live sessions:
students can open the app and *see* every routing feature working, then open the
corresponding file and compare it with the documentation.

---
1️⃣ Getting Started – Routing Overview

appStart.ts (or main.ts)

app.routes.ts

home.ts

2️⃣ Basic Navigation – Navigate to Routes

home.ts

products.ts

users.ts

3️⃣ Route Params, Query Params & Route State

usersDetails.ts

route-state-demo.ts

4️⃣ Redirecting Routes

app.routes.ts
(redirect section)

5️⃣ Guards – Controlling Route Access

auth.service.ts

auth.guard.ts

app.routes.ts
(the /users/:id route)

6️⃣ Resolvers – Route Data Resolvers

fake-user.service.ts

app.routes.ts
(resolver definition)

usersDetails.ts

7️⃣ Child Routes – Admin Area

admin-layout.ts

adminDashboard.ts

adminSettings.ts or guards-demo-form.ts

app.routes.ts
(the /admin route with children)

8️⃣ CanDeactivate – Prevent Leaving with Unsaved Changes

guards-demo-form.ts

app.routes.ts
(pendingChangesGuard section)

9️⃣ Named Outlets – Popup Help Panel

popup-help.ts

app.routes.ts
(route with outlet: 'popup')

appStart.ts
(<router-outlet name="popup">)

🔟 Custom Route Matches

custom-match-profile.ts

app.routes.ts
(twitterHandleMatcher)

1️⃣1️⃣ Rendering, Behavior, Animations & Router Events

appStart.ts or main.ts

withInMemoryScrolling

withPreloading

withRouterConfig

withViewTransitions

withNavigationErrorHandler

router-logger.service.ts
---

## Tech stack

- **Angular v21** (standalone APIs)
- **Router v21** with:
  - `provideRouter(...)`
  - `withComponentInputBinding`
  - `withInMemoryScrolling`
  - `withPreloading(PreloadAllModules)`
  - `withRouterConfig`
  - `withViewTransitions`

---

## How to run

```bash
npm install
ng serve
ng test
# open http://localhost:4200


---

## 8. Forms (Updated) 
# Angular Forms Demo (v21)

This project demonstrates the different form capabilities in **Angular 21**, including the new **Signal-Based Forms API**, classic Reactive Forms, Typed Reactive Forms, Template-driven Forms, and Dynamic Forms using `FormArray`.

The demo provides a clean tab-based UI for switching between the different examples:

---

## 📌 Available Demo Views

### 1. **Signal Forms**
Located in: `signal-login-form.component.ts`  
- Uses Angular 21's new **signal-based forms** API.  
- Fully reactive without zones.  
- Uses `form()`, `Field`, validators, and `submit()`.  
- Demonstrates validation and control flow (`@if`, `@switch`) in templates.

---

### 2. **Reactive Forms**
Located in: `reactive-profile-form.component.ts`  
- Demonstrates the classic **Reactive Forms API** (`FormGroup`, `FormControl`).  
- Includes validation and value changes tracking.  
- Foundation for most enterprise Angular applications.

---

### 3. **Strictly Typed Reactive Forms**
Located in: `typed-order-form.component.ts`  
- Shows the typed version of reactive forms introduced recently.  
- Strong typing → fewer runtime errors & better autocomplete.

---

### 4. **Template-driven Forms**
Located in: `template-contact-form.component.ts`  
- Standard Angular template-driven approach using `ngModel`.  
- Suitable for simple, small-scale forms.

---

### 5. **Dynamic Forms (Reactive FormArray)**
Located in: `dynamic-survey-form.component.ts`  
- Demonstrates building forms dynamically from configuration.  
- Useful for surveys, dynamic UI building, and admin panels.

---

### 6. **Dynamic Input Forms (Add/Remove Inputs at Runtime)**
Located in: `DynamicInputDemo.component.ts`  
- Uses `FormArray` to add/remove inputs dynamically.  
- Each input has its own validation.  
- Uses Angular v21 template features:  
  - `@for` for looping  
  - `@if` for conditional rendering  
  - Tracking by the form control itself (`track item`) for stable DOM updates

Example behavior:
- Click **+** to add a new input  
- Click **–** to remove a specific input  
- Cannot accidentally delete the wrong field thanks to stable tracking  
- Automatically updates JSON output below the form

---

## 🧭 Navigation Component

The main navigation exists in:



Signal Forms examples are inside the Signals folder.

---

## 9. HTTP Client -- Soon
Best practices for handling APIs in Angular.

Recommended folder name (if added later):  
`/src/app/Http`

---

## 📌 Notes
- Folders are organized based on the Angular Documentation structure.  
- Each chapter aligns with real Angular v21 features and best practices.  
- You can extend the repo with Routing, HTTP, State Management, Tailwind, or Angular ARIA demos at any time.

---

## 🎯 Goal of This Repository
This repo serves as a practical, hands-on learning path for Angular 21 — following the exact order of the official Angular docs, but with real examples, simplified explanations, and clean project organization.


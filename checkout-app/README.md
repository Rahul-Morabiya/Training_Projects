# 🚀 Cartify — Frontend Checkout System

## Images
1) Home Page
<img width="1895" height="990" alt="image" src="https://github.com/user-attachments/assets/d3a52ed3-f86b-48c5-a4ea-b579b58d0479" />



2) Dev Panel (Simulation , Analytics and Debug in Light Theme)
<img width="1895" height="998" alt="image" src="https://github.com/user-attachments/assets/efb2b260-a23e-4851-a8c4-bc677b25e081" />



3) Checkout Page
<img width="1919" height="991" alt="image" src="https://github.com/user-attachments/assets/d680b751-b7b4-4a9a-bfa0-cb8b38613c59" />


4) Payment Page
<img width="1919" height="998" alt="image" src="https://github.com/user-attachments/assets/0d0fe29b-103e-4589-a092-d4b6e06b3db0" />


5) Order Timeline and Status Page
<img width="1919" height="992" alt="image" src="https://github.com/user-attachments/assets/1efb735d-58c1-42f1-9233-ac4cb5bd571a" />


---

## ✨ Features

* 🛍️ Product browsing with filters, sorting & search
* ⚡ Infinite scrolling + virtualization
* 🧠 Optimized cart with normalized state
* 🔐 Multi-tab checkout locking system
* 💳 Full checkout + payment simulation
* 📦 Order tracking with live progress
* 🔔 Global notification system
* 📊 Analytics dashboard (dev mode)
* 🧪 Simulation engine (failures & latency)
* 🧰 Debug panel for internal state inspection

---

## 🏗️ Architecture

```
UI Layer (React Components)
↓
Domain Layer (Zustand Stores)
↓
Core Layer (Infrastructure)
↓
Browser Runtime (Storage, Events, Network)
```

---

## 📁 Project Structure

```
src/
├── app/                # App entry + routing
├── components/         # UI components
├── pages/              # Page-level components
├── domains/            # Business logic (stores)
├── core/               # Infrastructure layer
├── hooks/              # Custom hooks
├── utils/              # Utility functions
├── types/              # Type definitions
```

---

## 🧠 Core Concepts

### 1. Normalized State

Cart uses:

```
itemsById + itemIds
```

→ O(1) access & performance optimization

---

### 2. Checkout Locking System

* Uses `localStorage` + `BroadcastChannel`
* Prevents multi-tab conflicts

---

### 3. State Machine (Orders)

```
CART_READY
→ CHECKOUT_VALIDATED
→ ORDER_SUBMITTED
→ ORDER_SUCCESS / ORDER_FAILED
```

---

### 4. Simulation Engine

Global runtime:

```
window.__SIM__ = {
  fail: boolean,
  slow: boolean
}
```

Used to simulate:

* API failures
* Slow network

---

### 5. Analytics System

Tracks events:

```
ORDER_SUCCESS
ORDER_FAILED
```

---

## ⚙️ Tech Stack

* React (Vite)
* TypeScript
* Zustand (state management)
* TailwindCSS
* Framer Motion
* Axios
* TanStack Virtual

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

### 3. Open in browser

```
http://localhost:5173
```

---

## 🧪 Dev Mode

Toggle Dev Mode to access:

* 📊 Analytics Dashboard
* 🧰 Debug Panel
* 🧪 Simulation Panel

---

## 🔥 Key Highlights

* No backend required
* Handles edge cases like:

  * multi-tab conflicts
  * offline mode
  * retry logic
* Production-inspired architecture






# VectorShift Technical Assessment – Pipeline Builder

This repository contains my submission for the **VectorShift Frontend Technical Assessment**.  
The project implements a node-based pipeline editor using **React + ReactFlow** on the frontend and a **FastAPI** backend for pipeline analysis.

The focus of this submission was correctness, backend integration, and dynamic node behavior, while clearly documenting trade-offs and remaining improvements.

---

## 🚀 What I Built

### 1. Pipeline Builder (Frontend)
- Built an interactive pipeline editor using **ReactFlow**
- Users can visually connect nodes to form a directed pipeline
- Pipeline state is managed using `useNodesState` and `useEdgesState`

---

### 2. Custom Text Node
The Text node includes enhanced functionality:

- Auto-resizing text input (height grows with content)
- Support for variables using `{{ variable }}` syntax
- Dynamic input handles generated for each detected variable
- Text state is synced with ReactFlow node data

---

### 3. Backend Pipeline Analysis (FastAPI)
Implemented a backend endpoint at:

```

POST /pipelines/parse

````

The backend:
- Counts total number of nodes
- Counts total number of edges
- Validates whether the pipeline is a **Directed Acyclic Graph (DAG)**

DAG validation is implemented using **Kahn’s Algorithm (topological sort)**.

---

### 4. Frontend ↔ Backend Integration
- Frontend submits the current pipeline (nodes + edges) to the backend
- Backend responds with:
  
  json
  {
    "num_nodes": number,
    "num_edges": number,
    "is_dag": boolean
  }


* Frontend displays this information in a user-friendly alert

---

## ✅ Requirements Fully Met

### ✔ Part 4: Backend Integration

* Correct API contract implemented
* Node count and edge count calculated
* DAG validation implemented
* Frontend successfully submits pipeline and displays backend response

---

### ✔ Part 3: Text Node Logic

* Auto-resizing text input
* `{{ variable }}` detection
* Dynamic input handles created for each variable

---

## ⚠️ Challenges & Limitations (Honest Reflection)

### 1. Node Abstraction (Part 1 – Partial)

**Issue faced:**

* Time was prioritized toward correctness, backend integration, and dynamic node behavior
* As a result, a shared `BaseNode` abstraction for all node types was not fully implemented

**Current state:**

* Custom nodes exist and are cleanly structured
* The system is easy to extend
* However, duplication between node components has not been fully abstracted

**How I would improve this next:**

* Introduce a `BaseNode` component to encapsulate:

  * Common layout
  * Shared styles
  * Handle rendering logic
* Build all node types (Text, Input, Output, LLM, etc.) on top of this abstraction

---

### 2. Styling (Part 2 – Functional but Minimal)

**Issue faced:**

* Priority was given to logic and correctness over visual polish

**Current state:**

* Clean dark-themed UI
* Consistent and readable node layout
* Styling is functional but not design-system–heavy

**Next improvements:**

* Introduce a shared theme file
* Improve spacing, typography, and visual hierarchy
* Apply consistent styling via abstraction

---

## 🧠 Design Decisions

* Prioritized **correct data flow and backend compliance**
* Focused on making the system easy to reason about and extend
* Chose clarity and robustness over over-engineering

---

## 🧪 How to Run Locally

### Backend

```bash
cd backend
python -m uvicorn main:app --reload
```
## 📸 Backend API Test (Optional Evidence)
<img width="1750" height="725" alt="Screenshot 2026-01-08 132735" src="https://github.com/user-attachments/assets/5c63c70b-e99e-4df6-a988-7b296fda2686" />
<img width="1085" height="888" alt="Screenshot 2026-01-08 132759" src="https://github.com/user-attachments/assets/b638299b-7dcb-40f9-9059-0abcf69334b9" />

The `/pipelines/parse` endpoint was tested using Swagger UI.

It correctly returns:
- Total number of nodes
- Total number of edges
- DAG validation status


Screenshots below demonstrate a successful API response with valid input.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🏁 Final Notes

This submission demonstrates:

* Strong frontend–backend integration
* Correct handling of graph structures and DAG validation
* Dynamic UI behavior with ReactFlow
* Clear understanding of trade-offs and next steps

With additional time, I would focus on:

* Completing the node abstraction layer
* Enhancing design consistency
* Expanding the node library further

Thank you for reviewing my submission.






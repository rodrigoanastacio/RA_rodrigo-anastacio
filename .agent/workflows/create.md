# /create - Create Application (Rigorous Flow)

$ARGUMENTS

---

## Task

This command initiates a high-precision application creation process following the **4-Phase Standard**.

### Steps:

1. **Phase 1: ANALYSIS (The Socratic Gate)**
   - Research requirements using system tools.
   - **STOP:** Use `@[skills/brainstorming]` to ask at least 3 strategic questions.
   - Clarify trade-offs, target users, and critical edge cases.

2. **Phase 2: PLANNING**
   - Use `project-planner` to create the `{task-slug}.md` file.
   - Map dependencies and affected file structures.

3. **Phase 3: SOLUTIONING (Architecture Approval)**
   - **WAIT:** Define and present the logic contract (Schema, API signatures, State).
   - Get user approval before writing a single line of component/logic code.

4. **Phase 4: IMPLEMENTATION (Clean Code Build)**
   - Orchestrate expert agents (`backend-specialist`, `frontend-specialist`, `database-architect`).
   - **STRICT RULE:** Apply `@clean-code` (Zero Tolerance for Comments).
   - Run domain-specific validation scripts (Audit, Lint, Security).

### Final Checklist:

- Start preview with `auto_preview.py`.
- Final audit using `checklist.py`.

---

## Usage Examples

```
/create blog site
/create e-commerce app with product listing and cart
/create Instagram clone
```

---

## Performance Standard

- **Code:** Highly semantic, small functions, no comments.
- **Speed:** Non-interactive execution after Solutioning approval.
- **Safe:** Guard clauses and types everywhere.

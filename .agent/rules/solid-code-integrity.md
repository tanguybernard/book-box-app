---
trigger: always_on
---

# Rule: SOLID Principles Enforcement

Apply the following principles to every code generation and refactoring task:

1. **SRP (Single Responsibility):** Each class/module must have only one reason to change. If a function exceeds 20 lines or handles multiple logic types (e.g., UI + Data), split it.
2. **OCP (Open/Closed):** Prefer composition and polymorphism over hardcoded conditionals (if/else, switch) for behavior extension. Use Strategy or Factory patterns.
3. **LSP (Liskov Substitution):** Subclasses must be substitutable for their base classes without breaking the application. Do not throw 'NotImplementedError' for inherited methods.
4. **ISP (Interface Segregation):** Create small, specific interfaces. A client should never be forced to depend on methods it does not use.
5. **DIP (Dependency Inversion):** Depend on abstractions, not concretions. Use Dependency Injection (DI). High-level modules must not depend on low-level modules.

**Validation Step:** Before finalizing code, perform a "SOLID Audit". If a principle is violated, refactor immediately and explain why.
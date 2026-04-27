// src/hooks/useAccordion.js

// Iteration 5 (Bonus): Custom hook for toggling accordion sections
import { useState } from "react";

export function useAccordion(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = () => setIsOpen((prev) => !prev);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, toggle, open, close };
}

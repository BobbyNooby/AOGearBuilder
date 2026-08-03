// Formula definitions (formulas.jsonc, stripped of // comments on load).

export interface FormulaDef {
  expression?: string;          // complex formulas (mathjs-evaluated, scoped)
  params?: Record<string, unknown>;
  description?: string;
  status?: string;              // e.g. "future"
}

export type Formulas = Record<string, FormulaDef>;

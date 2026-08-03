// Minimal safe formula evaluator (no external deps).
// Supports: numbers, variables, + - * / ^, parentheses,
// functions: clamp, ln, sqrt, floor, ceil, min, max, abs.
// Scoped: only these identifiers are allowed. No assignment / import.

type Scope = Record<string, number>;

function tokenize(expr: string): string[] {
  const tokens: string[] = [];
  const re = /\s*([A-Za-z_]+|\d+\.?\d*|[()+\-*/^,])\s*/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(expr)) !== null) tokens.push(m[1]);
  // normalise subtraction as addition of negative (handle unary minus edge)
  return tokens;
}

const FUNCS: Record<string, (...a: number[]) => number> = {
  clamp: (x, lo, hi) => Math.min(Math.max(x, lo), hi),
  ln: Math.log,
  sqrt: Math.sqrt,
  floor: Math.floor,
  ceil: Math.ceil,
  min: (...a) => Math.min(...a),
  max: (...a) => Math.max(...a),
  abs: Math.abs,
};

// Shunting-yard → RPN → eval
export function evalFormula(expr: string, scope: Scope): number {
  const tokens = tokenize(expr);
  const out: (number | string)[] = [];
  const ops: string[] = [];
  const prec: Record<string, number> = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
  const isFunc = (t: string) => t in FUNCS;
  const isNum = (t: string) => /^\d+\.?\d*$/.test(t);

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (isNum(t)) out.push(parseFloat(t));
    else if (isFunc(t) && tokens[i + 1] === '(') ops.push(t);        // function call
    else if (isFunc(t) && t in scope) out.push(scope[t]);             // scope var shadows func name (floor/ceiling)
    else if (isFunc(t)) throw new Error(`Function ${t} not followed by (`);
    else if (t === ',') {
      while (ops.length && ops[ops.length - 1] !== '(') out.push(ops.pop()!);
    } else if (t in prec) {
      while (ops.length && ops[ops.length - 1] !== '(' && prec[ops[ops.length - 1]] >= prec[t])
        out.push(ops.pop()!);
      ops.push(t);
    } else if (t === '(') ops.push(t);
    else if (t === ')') {
      while (ops.length && ops[ops.length - 1] !== '(') out.push(ops.pop()!);
      ops.pop();
      if (ops.length && isFunc(ops[ops.length - 1])) out.push(ops.pop()!);
    } else if (t in scope) out.push(scope[t]);
    else throw new Error(`Unknown variable in formula: ${t}`);
  }
  while (ops.length) out.push(ops.pop()!);

  const st: number[] = [];
  for (const t of out) {
    if (typeof t === 'number') st.push(t);
    else if (t in FUNCS) {
      const argc = t === 'clamp' ? 3 : t === 'min' || t === 'max' ? 2 : 1;
      const args = st.splice(st.length - argc, argc);
      st.push(FUNCS[t](...args));
    } else {
      const b = st.pop()!, a = st.pop()!;
      st.push(t === '+' ? a + b : t === '-' ? a - b : t === '*' ? a * b : t === '/' ? a / b : Math.pow(a, b));
    }
  }
  return st[0];
}

// Convenience: evaluate a FormulaDef, merging params into scope.
export function evalFormulaDef(
  def: { expression?: string; params?: Record<string, unknown> },
  extraScope: Scope
): number {
  if (!def.expression) throw new Error('Formula has no expression');
  const scope: Scope = {};
  for (const [k, v] of Object.entries(def.params ?? {})) {
    if (typeof v === 'number') scope[k] = v;
  }
  for (const [k, v] of Object.entries(extraScope)) {
    scope[k] = v;
  }
  return evalFormula(def.expression, scope);
}

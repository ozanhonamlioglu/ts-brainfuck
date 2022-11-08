/**
 * Bit inverting
 * 
 * I extends `${infer Head}${infer Tail}` -> Head gets first, Tail gets all others.
 * 
 * for example: 10100101
 * I extends `${infer Head}${infer Second}${infer Third}${infer Tail}` -> Head: 1, Second: 0, Third: 1, Tail: 00101
 */
type Invert<I extends string, R extends string = ""> = I extends `${infer Head}${infer Tail}`
  ? Invert<Tail, `${R}${Head extends "1" ? "0" : "1"}`>
  : R;

type R = Invert<"0011">;

// ---------------------------------------------------------------------------------------------------

/**
 * Find return type
 */
type FunctionReturnType<T> = T extends (...args: any) => infer R ? R : T;

const person = () => "fuck";
type PersonType = FunctionReturnType<typeof person>;

// ---------------------------------------------------------------------------------------------------
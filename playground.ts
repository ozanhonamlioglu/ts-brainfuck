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

type Test1 = Invert<"0011">;

// ---------------------------------------------------------------------------------------------------

/**
 * Find return type
 */
type FunctionReturnType<T> = T extends (...args: any) => infer R ? R : T;

const person = () => "fuck";
type Test2 = FunctionReturnType<typeof person>;

// ---------------------------------------------------------------------------------------------------

/**
 * Wrap the word
 */

type WrapLine<I extends string, R extends string = ""> = I extends `${infer Head}${infer Tail}`
? WrapLine<Tail, `${R}*`>
: R;

type Wrap<I extends string> = `**${WrapLine<I>}
* ${I} *
**${WrapLine<I>}`;

type Test3 = Wrap<"Hello World">;

// ---------------------------------------------------------------------------------------------------

/**
 * Count the word
 */

type WordCount<I extends string, R extends string[] = [""]> = I extends `${infer Head} ${infer Tail}`
  ? WordCount<Tail, [...R, Head]>
  : R["length"];

type Test4 = WordCount<"Hello World">;

// ---------------------------------------------------------------------------------------------------

/**
 * Find Minimum
 */

type FindMin<A, B, C extends 0[] = []> = C["length"] extends A 
  ? A 
  : C["length"] extends B
  ? B
  : FindMin<A, B, [0, ...C]>

type Test5 = FindMin<8, 4>; // -> 4;

// ---------------------------------------------------------------------------------------------------

/**
 * Find Maximum
 */

type FindMax<A, B, C extends 0[] = []> = C["length"] extends A 
 ? B
 : C["length"] extends B
 ? A
 : FindMax<A, B, [0, ...C]>

type Test6 = FindMax<8, 24>; // -> 24;

// ---------------------------------------------------------------------------------------------------
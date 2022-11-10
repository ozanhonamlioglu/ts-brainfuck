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
/**
 * Add
 */
 type Count<I, O extends 0[] = []> = O["length"] extends I ? O : Count<I, [...O, 0]>
 type Add<A, B> = [...Count<A>, ...Count<B>]["length"]

 type Dec<A> = Count<A> extends [infer A, ...infer Tail] ? Tail["length"] : 0;
 type Inc<A> = [...Count<A>, 0]["length"]
 
type Subtract<A, B> = B extends 0 ? A : Subtract<Dec<A>, Dec<B>>;

 type Test7 = Add<3, 24>;
 type Test8 = Subtract<5, 3>;

// ---------------------------------------------------------------------------------------------------
/**
 * Multiply
 */

/* type Multiply<A, B, C extends 0[] = [], T extends 0[] = []> = T["length"] extends A 
? C["length"]
: Multiply<A, B, [...C, ...Count<B>], [0, ...T]> */

type Multiply<A, B, R = 0> = A extends 0 ? R : Multiply<Dec<A>, B, Add<R, B>>

type Test9 = Multiply<2, 19>

// ---------------------------------------------------------------------------------------------------
/**
 * Divide
 */

type Divide<A, B, R = 0> = A extends 0 ? R : Divide<Subtract<A, B>, B, Inc<R>>

type Test10 = Divide<12, 5>
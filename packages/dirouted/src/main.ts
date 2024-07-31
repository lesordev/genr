function foo() {
  console.log("foo");
}

export function sayHello() {
  console.log("Hello from dirouted!");
  foo();
}

export function sum(a: number | undefined, b: number | undefined) {
  return (a ?? 0) + (b ?? 0);
}

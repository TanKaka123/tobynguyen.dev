---
title: "Liskov Substitution Principle in Functional TypeScript"
date: "2020-10-11"
readingTime: 8
coverImage: "/timothy-dykes-LhqLdDPcSV8-unsplash.webp"
excerpt: "If it looks like a duck, quacks like a duck, but needs batteries, you probably have the wrong abstraction."
tags: ["reactjs", "nextjs"]
---

_This is part three of a five-part series about SOLID principles in functional TypeScript._

## What is the Liskov Substitution Principle?

The Liskov substitution principle (LSP) is one of the five SOLID principles. It states that:

> "Objects in a program should be [substitutable] with instances of their subtypes without altering the correctness of that program."

The [requirements for substitutability](https://en.wikipedia.org/wiki/Liskov_substitution_principle#Principle) are complex but can be summarized as follows:
a subtype should not change the assumptions about its supertype.

**If we expect a certain behavior from a type, its subtypes should honor it.** Thus, a client can use any subtype confidently.
This helps decouple the client from the code it uses and improves interoperability.

> A client of a supertype shouldn't have to behave differently depending on which subtype it uses.

Also, considering the behavior of the subtypes becomes predictable, the LSP proves itself an instance of the [principle of least astonishment](https://en.wikipedia.org/wiki/Principle_of_least_astonishment).

In short, **the Liskov substitution principle promotes the right abstraction.**

## Example

In geometry, a square is a rectangle with even sides.
One could be tempted to frame this relation by having a `Square` extend a `Rectangle`.

To illustrate why this is suboptimal, let's first use OOP since most LSP violations involve inheritance:

```ts
class Rectangle {
  constructor(private width: number, private length: number) {}

  public setWidth(width: number) {
    this.width = width;
  }

  public setLength(length: number) {
    this.length = length;
  }

  public getArea() {
    return this.width * this.length;
  }
}
```

```ts
class Square extends Rectangle {
  constructor(side: number) {
    super(side, side);
  }

  public setWidth(width: number) {
    // A square must maintain equal sides
    super.setWidth(width);
    super.setLength(width);
  }

  public setLength(length: number) {
    super.setWidth(length);
    super.setLength(length);
  }
}
```

Now if a client was to use a `Rectangle` (or a `Square`):

```ts
const rect: Rectangle = new Square(10); // Can be either a Rectangle or a Square
rect.setWidth(20);
expect(rect.getArea()).toBe(200); // ❌ If rect is a Square, area is 400
```

`Rectangle` assumes an area of 200. `Square` breaks that behavior by expecting an area of 400.
Therefore, **`Rectangle` and `Square` are not substitutable.**

While this design is still serviceable, it fails the Liskov test and misses out on the benefits mentioned earlier.
Moreover, clients of our code may have to adapt, like so:

```ts
const rect: Rectangle = new Square(10);
rect.setWidth(20);
if (rect instanceof Square) {
  // ...
} else {
  // ...
}
```

But this only circumvents the actual problem. In fact:

> Type checking a polymorphic value is a good indicator of an LSP violation.

Visibly, the Liskov substitution principle is telling us **`Rectangle` is not a good abstraction for `Square`**.

A possible solution would be to revisit the abstraction with a generic `Shape` instead:

```ts
interface Shape {
  getArea: () => number;
}

interface Rectangle extends Shape {
  width: number;
  length: number;
}

interface Square extends Shape {
  sides: number;
}

// Implementation...
```

Now, `Shape` is substitutable by both `Rectangle` and `Square`, because none of the two subtypes break the behavior defined by `Shape`.

As you might have noticed, steering clear from inheritance is one way to avoid LSP violations.
Which is yet another example of composition over inheritance.

## In conclusion

The LSP goes a quack further from the [open-closed principle](/open-closed-principle-in-functional-typescript) because not only should we prefer extending modules over modifying them, we should avoid modifying existing behaviors from said extensions; only build over it.

## More on SOLID principles

- Single-Responsibility Principle _(upcoming!)_
- [Open-Closed Principle](/open-closed-principle-in-functional-typescript)
- [Liskov Substitution Principle](/liskov-substitution-principle-in-functional-typescript)
- Interface Segregation Principle _(upcoming!)_
- [Dependency Inversion Principle](/dependency-inversion-principle-in-functional-typescript)

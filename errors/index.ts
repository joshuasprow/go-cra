import stringify from "safe-json-stringify";

export class UnnamedError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class UnknownError<U extends unknown> extends Error {
  name: string;
  original: U;
  message: string;
  constructor(original: U) {
    super();
    this.name = "UnknownError";
    this.original = original;
    this.message = `${this.name}: ${stringify(this.original as any)}`;
  }
}

export const parse = <U extends unknown>(original: U) => {
  if (original instanceof Error) return original;

  if (typeof original === "string") return new UnnamedError(original);

  return new UnknownError(original);
};

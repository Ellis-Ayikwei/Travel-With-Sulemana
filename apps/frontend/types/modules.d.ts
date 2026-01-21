// Type declarations for modules that may not have types
declare module "jsonwebtoken" {
  export function sign(payload: any, secret: string, options?: any): string;
  export function verify(token: string, secret: string): any;
  export function decode(token: string): any;
}

declare module "bcryptjs" {
  export function compare(data: string, encrypted: string): Promise<boolean>;
  export function hash(data: string, rounds: number): Promise<string>;
}


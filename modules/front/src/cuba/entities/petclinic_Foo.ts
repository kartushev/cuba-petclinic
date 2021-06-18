import { StandardEntity } from "./base/sys$StandardEntity";
export class Foo extends StandardEntity {
    static NAME = "petclinic_Foo";
    bar?: string | null;
}
export type FooViewName = "_base" | "_local" | "_minimal";
export type FooView<V extends FooViewName> = V extends "_base" ? Pick<Foo, "id" | "bar"> : V extends "_local" ? Pick<Foo, "id" | "bar"> : never;

import { BaseGenericIdEntity } from "./sys$BaseGenericIdEntity";
export class BaseIntegerIdEntity extends BaseGenericIdEntity {
    static NAME = "sys$BaseIntegerIdEntity";
    id?: number | null;
}
export type BaseIntegerIdEntityViewName = "_base" | "_local" | "_minimal";
export type BaseIntegerIdEntityView<V extends BaseIntegerIdEntityViewName> = never;

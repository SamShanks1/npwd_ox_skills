export interface ISkill {
  name: string;
  description: string;
  xp: number;
  levels: number[];
}

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export interface ResourceConfig {
  skills: {
    name: string;
    description: string;
    levels: number[];
  }[];
}

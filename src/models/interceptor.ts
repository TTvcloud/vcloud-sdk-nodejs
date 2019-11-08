import { FetchOptions } from './service';

export type PreHandler = Partial<{
  resolve: (p: PreResolve) => any;
  reject: (e: Error) => any;
}>;

export type PostHandler = Partial<{
  resolve: (p: any) => any;
  reject: (e: Error) => any;
}>;

export interface PreResolve {
  action: string;
  options: FetchOptions;
}

export type PropsWithClassName<T = Record<string, never>> = T & {
  className?: string;
};

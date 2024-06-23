import { ReactNode, Children } from "react";

export const Each = <T,>({
  render,
  of,
}: {
  render: (item: T, index: number) => ReactNode;
  of: T[];
}) => {
  return Children.toArray(of.map((item, index) => render(item, index)));
};

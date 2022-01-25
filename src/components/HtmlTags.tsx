import React, { PropsWithChildren } from 'react';

export function H2({ children }: PropsWithChildren<{}>) {
  return <h2 className="text-3xl font-sans my-3"> {children}</h2>;
}

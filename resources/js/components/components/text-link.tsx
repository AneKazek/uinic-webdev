import React from 'react';

type TextLinkProps = React.ComponentProps<'a'> & {
  underline?: boolean;
};

export default function TextLink({ underline = true, className, ...props }: TextLinkProps) {
  const base = underline ? 'underline underline-offset-4' : '';
  return <a className={`${base} ${className ?? ''}`} {...props} />;
}
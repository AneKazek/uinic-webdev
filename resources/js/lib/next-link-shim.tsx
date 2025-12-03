import React from 'react';

// Minimal shim untuk `next/link` di lingkungan Vite/React
// Menghasilkan anchor standar agar perilaku visual sama
const Link = React.forwardRef<HTMLAnchorElement, any>(({ href, children, ...rest }, ref) => {
  const resolvedHref = typeof href === 'string' ? href : String(href);
  return (
    <a ref={ref} href={resolvedHref} {...rest}>
      {children}
    </a>
  );
});

export default Link;
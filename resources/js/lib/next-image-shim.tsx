import React from 'react';

// Shim ringan untuk kompatibilitas import `next/image` di Vite/React.
// Mendukung properti umum seperti layout="fill", objectFit, objectPosition, priority.
export default function Image(props: any) {
  const {
    src,
    alt = '',
    width,
    height,
    className,
    style,
    layout,
    objectFit,
    objectPosition,
    priority,
    sizes,
    srcSet,
    loading,
    decoding,
    fetchpriority,
  } = props || {};

  const resolvedSrc = typeof src === 'string' ? src : src?.src ?? '';

  const isFill = layout === 'fill';
  const baseStyle: React.CSSProperties = {
    ...(style || {}),
    ...(isFill
      ? {
          position: 'absolute',
          inset: 0 as any,
          width: '100%',
          height: '100%',
        }
      : {}),
    ...(objectFit ? { objectFit } : {}),
    ...(objectPosition ? { objectPosition } : {}),
  };

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      width={isFill ? undefined : width}
      height={isFill ? undefined : height}
      className={className}
      style={baseStyle}
      loading={loading ?? (priority ? 'eager' : 'lazy')}
      decoding={decoding ?? 'async'}
      fetchPriority={fetchpriority ?? (priority ? 'high' : undefined)}
      sizes={sizes ?? (isFill ? '100vw' : undefined)}
      srcSet={srcSet}
    />
  );
}
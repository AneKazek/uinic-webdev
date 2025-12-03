import React from 'react';

type Strategy = 'afterInteractive' | 'lazyOnload' | 'beforeInteractive';

type NextScriptProps = React.DetailedHTMLProps<React.ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement> & {
  strategy?: Strategy;
};

export default function Script({ strategy, ...props }: NextScriptProps) {
  const extra: Partial<React.ScriptHTMLAttributes<HTMLScriptElement>> = {};

  if (strategy === 'afterInteractive' || strategy === 'lazyOnload') {
    // Emulate Next.js strategy by deferring execution until after parse
    extra.defer = true;
  }
  // beforeInteractive would be a normal blocking script; leave as-is

  return <script {...props} {...extra} />;
}
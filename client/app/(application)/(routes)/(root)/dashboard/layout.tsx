import NextTopLoader from 'nextjs-toploader';
import React from 'react'

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NextTopLoader showSpinner={false} easing="ease" />
      {children}</div>
  )
}

export default layout
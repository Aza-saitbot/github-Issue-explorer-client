import { forwardRef, SVGAttributes } from 'react';

export const ArrowIcon = forwardRef<SVGSVGElement, SVGAttributes<SVGElement>>((props, ref) => {
  return (
    <svg ref={ref} {...props} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 5L21 12M21 12L14 19M21 12L3 12" stroke={'currentColor'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
});

ArrowIcon.displayName = 'ArrowIcon';
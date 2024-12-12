import { useEffect, useRef } from 'react';

export function useIntersectionObserver<T>(callback: () => void, triggerDeps?: T) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              callback();
            }
          });
        },
        {
          root: null,
          threshold: 0,
          rootMargin: '0px'
        }
      );

      observerRef.current?.observe(containerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [containerRef.current, triggerDeps]);

  return containerRef;
}

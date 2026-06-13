import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
}

const ScrollReveal = ({ children }: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const domRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the element is in view, show it; if not, hide it
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div 
      ref={domRef} 
      className={`reveal-item ${isVisible ? 'is-visible' : ''}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
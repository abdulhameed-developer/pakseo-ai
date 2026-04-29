
import React, { useState, useEffect, useRef } from 'react';

export const useDragScroll = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [dragged, setDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [overflow, setOverflow] = useState({ left: false, right: false });

  const updateOverflow = () => {
    const el = ref.current;
    if (!el) return;
    const canScrollLeft = el.scrollLeft > 5;
    const canScrollRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 5;
    setOverflow({ left: canScrollLeft, right: canScrollRight });
  };

  const scrollBy = (amount: number) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    updateOverflow();
    el.addEventListener('scroll', updateOverflow);
    window.addEventListener('resize', updateOverflow);
    const timer = setTimeout(updateOverflow, 150);
    return () => {
      el.removeEventListener('scroll', updateOverflow);
      window.removeEventListener('resize', updateOverflow);
      clearTimeout(timer);
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;
    setIsDown(true);
    setDragged(false);
    ref.current.style.scrollBehavior = 'auto';
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDown(false);
    setTimeout(() => setDragged(false), 50);
    if (ref.current) ref.current.style.scrollBehavior = 'smooth';
  };

  const onMouseUp = () => {
    setIsDown(false);
    setTimeout(() => setDragged(false), 50);
    if (ref.current) ref.current.style.scrollBehavior = 'smooth';
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !ref.current) return;
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 2.5;
    if (Math.abs(walk) > 5) setDragged(true);
    e.preventDefault();
    ref.current.scrollLeft = scrollLeft - walk;
  };

  return { 
    events: { onMouseDown, onMouseLeave, onMouseUp, onMouseMove }, 
    ref, 
    overflow, 
    dragged,
    scrollBy,
    refresh: updateOverflow 
  };
};

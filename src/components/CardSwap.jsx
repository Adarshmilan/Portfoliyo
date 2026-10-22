import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total, depth = distX * 1.5) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * depth,
  zIndex: total - i
});
const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  depthDistance, // how far each card sits behind the one in front (defaults to 1.5x cardDistance)
  easing = 'elastic',
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);
  const bringToFrontRef = useRef(() => {});

  useEffect(() => {
    const total = refs.length;
    const depth = depthDistance ?? cardDistance * 1.5;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total, depth), skewAmount));

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length, depth);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length, depth);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    const startAuto = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(swap, delay);
    };
    let resumeTimer;
    let hovering = false; // real mouse only, so taps on phones don't count

    // Tapped/clicked card comes to the front; the rest keep their order behind it.
    // Auto-shuffling pauses for a few seconds so the chosen card stays put.
    bringToFrontRef.current = (index) => {
      clearInterval(intervalRef.current);
      clearTimeout(resumeTimer);
      refs.forEach(r => gsap.killTweensOf(r.current));
      tlRef.current?.kill();

      order.current = [index, ...order.current.filter(i => i !== index)];
      const tl = gsap.timeline();
      tlRef.current = tl;
      order.current.forEach((idx, pos) => {
        const slot = makeSlot(pos, cardDistance, verticalDistance, total, depth);
        const el = refs[idx].current;
        gsap.set(el, { zIndex: slot.zIndex });
        tl.to(el, { x: slot.x, y: slot.y, z: slot.z, duration: 0.6, ease: 'power3.out' }, 0);
      });

      resumeTimer = window.setTimeout(() => !hovering && startAuto(), 6000);
    };

    swap();
    startAuto();

    if (pauseOnHover) {
      const node = container.current;
      const pause = (e) => {
        if (e.pointerType !== 'mouse') return;
        hovering = true;
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = (e) => {
        if (e.pointerType !== 'mouse') return;
        hovering = false;
        tlRef.current?.play();
        startAuto();
      };
      node.addEventListener('pointerenter', pause);
      node.addEventListener('pointerleave', resume);
      return () => {
        node.removeEventListener('pointerenter', pause);
        node.removeEventListener('pointerleave', resume);
        clearInterval(intervalRef.current);
        clearTimeout(resumeTimer);
      };
    }
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(resumeTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, depthDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e);
            bringToFrontRef.current(i);
            onCardClick?.(i);
          }
        })
      : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;

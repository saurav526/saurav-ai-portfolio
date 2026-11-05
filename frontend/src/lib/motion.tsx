import React from 'react';
export interface MotionProps extends React.HTMLAttributes<HTMLElement> {
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  exit?: Record<string, unknown>;
  whileHover?: Record<string, unknown>;
  whileTap?: Record<string, unknown>;
  whileInView?: Record<string, unknown>;
  viewport?: Record<string, unknown>;
  transition?: Record<string, unknown>;
  layout?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

const cache: Record<string, React.ComponentType<MotionProps>> = {};

function getMotionComponent(tag: string): React.ComponentType<MotionProps> {
  if (!cache[tag]) {
    const Comp = React.forwardRef<HTMLElement, MotionProps>((props, ref) => {
      const {
        initial: _initial,
        animate,
        exit: _exit,
        whileHover: _whileHover,
        whileTap: _whileTap,
        whileInView: _whileInView,
        viewport: _viewport,
        transition: _transition,
        layout: _layout,
        className = '',
        style,
        children,
        ...rest
      } = props;

      let animClass = 'transition-all duration-300 ease-out';
      if (animate && typeof animate === 'object') {
        if ('rotateZ' in animate) {
          animClass +=
            animate.rotateZ === -360
              ? ' animate-spin-reverse-slow'
              : ' animate-spin-slow';
        } else if ('y' in animate && Array.isArray(animate.y)) {
          animClass += ' animate-float-slow';
        }
      }

      return React.createElement(
        tag,
        {
          ref,
          className: `${animClass} ${className}`.trim(),
          style,
          ...rest,
        },
        children
      );
    });
    Comp.displayName = `motion.${tag}`;
    cache[tag] = Comp;
  }
  return cache[tag];
}

const baseMotion = {
  div: getMotionComponent('div'),
  p: getMotionComponent('p'),
  span: getMotionComponent('span'),
  button: getMotionComponent('button'),
  section: getMotionComponent('section'),
  a: getMotionComponent('a'),
  h1: getMotionComponent('h1'),
  h2: getMotionComponent('h2'),
  h3: getMotionComponent('h3'),
  ul: getMotionComponent('ul'),
  li: getMotionComponent('li'),
};

export const motion = new Proxy(baseMotion, {
  get(target, prop: string) {
    if (prop in target) {
      return target[prop as keyof typeof baseMotion];
    }
    return getMotionComponent(String(prop));
  },
}) as typeof baseMotion & Record<string, React.ComponentType<MotionProps>>;

export const AnimatePresence: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <>{children}</>;

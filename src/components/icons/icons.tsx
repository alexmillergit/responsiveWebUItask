import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  fill: 'none',
  'aria-hidden': true,
  focusable: false,
};

/** Three-bar menu icon: 16×12 of line plus 1px of round cap on every side. */
export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} width="18" height="14" viewBox="-1 -1 18 14" {...props}>
      <path
        d="M0 0H16M0 6H16M0 12H16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Close icon: 12×12 of line plus 1px of round cap on every side. */
export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} width="14" height="14" viewBox="-1 -1 14 14" {...props}>
      <path
        d="M0 12L12 0M0 0L12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Small right-pointing chevron (6×10), exported from the design file. */
export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...base} width="6" height="10" viewBox="359 205 6 10" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M359.293 214.707C358.902 214.317 358.902 213.683 359.293 213.293L362.586 210L359.293 206.707C358.902 206.317 358.902 205.683 359.293 205.293C359.683 204.902 360.317 204.902 360.707 205.293L364.707 209.293C365.098 209.683 365.098 210.317 364.707 210.707L360.707 214.707C360.317 215.098 359.683 215.098 359.293 214.707Z"
      />
    </svg>
  );
}

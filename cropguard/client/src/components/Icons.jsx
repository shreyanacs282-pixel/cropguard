/**
 * Icons.jsx
 * ---------
 * Small inline SVG icons. Kept local so the project has no icon dependency.
 * Every icon takes the usual className prop.
 */

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
  'aria-hidden': true
};

export const LeafIcon = (p) => (
  <svg {...base} {...p}><path d="M12 21C12 13 15 7 21 4c1 7-2 14-9 15z"/><path d="M12 21C8 16 4 15 3 9c6 0 8 4 9 12z"/><path d="M12 21v-4"/></svg>
);
export const CameraIcon = (p) => (
  <svg {...base} {...p}><rect x="2.5" y="6" width="19" height="14" rx="2.5"/><circle cx="12" cy="13" r="4"/><path d="M8 6l1.4-2.2h5.2L16 6"/></svg>
);
export const UploadIcon = (p) => (
  <svg {...base} {...p}><path d="M12 16V4"/><path d="M7.5 8.5L12 4l4.5 4.5"/><path d="M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3"/></svg>
);
export const SearchIcon = (p) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>
);
export const ChartIcon = (p) => (
  <svg {...base} {...p}><path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/></svg>
);
export const ClockIcon = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>
);
export const BookIcon = (p) => (
  <svg {...base} {...p}><path d="M4 5.5A1.5 1.5 0 015.5 4H19v15.5H5.5A1.5 1.5 0 014 18z"/><path d="M4 18.5A1.5 1.5 0 015.5 17H19"/><path d="M9 8h6"/></svg>
);
export const AlertIcon = (p) => (
  <svg {...base} {...p}><path d="M12 4.5l8.5 15H3.5z"/><path d="M12 10v4"/><path d="M12 17.2v.1"/></svg>
);
export const CheckIcon = (p) => (
  <svg {...base} {...p}><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
);
export const BugIcon = (p) => (
  <svg {...base} {...p}><rect x="8" y="7" width="8" height="12" rx="4"/><path d="M8 11H4M8 15H4.5M16 11h4M16 15h3.5M9.5 7L8 4.5M14.5 7L16 4.5M12 19v2.5"/></svg>
);
export const PhoneIcon = (p) => (
  <svg {...base} {...p}><path d="M5 4h4l1.5 4-2 1.5a12 12 0 006 6L16 13.5 20 15v4a1 1 0 01-1 1A15.5 15.5 0 014 5a1 1 0 011-1z"/></svg>
);
export const XIcon = (p) => (
  <svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>
);
export const MenuIcon = (p) => (
  <svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>
);
export const GlobeIcon = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path d="M12 3.5c2.2 2.4 3.3 5.4 3.3 8.5S14.2 18.1 12 20.5c-2.2-2.4-3.3-5.4-3.3-8.5S9.8 5.9 12 3.5z"/></svg>
);

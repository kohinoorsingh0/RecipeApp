export function SpoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.5 2.5c-2.2 0-4 2.13-4 4.75 0 2.02 1.08 3.74 2.6 4.4L6.4 20a1.6 1.6 0 0 0 3.2 0l-.7-8.35c1.52-.66 2.6-2.38 2.6-4.4 0-2.62-1.8-4.75-4-4.75Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M15.5 2.5v6.1M18.5 2.5v6.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path
        d="M19 12.7V21a1 1 0 0 1-2 0v-8.3c-1.24-.32-2-1.6-2-3.1V2.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M20 20l-4.3-4.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function HeartIcon({ filled, ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 20.2s-7.4-4.6-9.7-9.1C.6 7.6 2 4 5.4 3.3c2-.4 3.9.5 5 2.1a5.1 5.1 0 0 1 1.6-1.7c1.6-1.1 4-1.2 5.5.1 2.6 2.2 2 6-.3 9C15.4 15.6 12 20.2 12 20.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8.5v7l6-3.5-6-3.5Z" fill="currentColor" />
    </svg>
  );
}

export function LinkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10 14a4 4 0 0 0 5.66 0l2.83-2.83a4 4 0 1 0-5.66-5.66l-1.06 1.06"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 10a4 4 0 0 0-5.66 0L5.5 12.83a4 4 0 1 0 5.66 5.66l1.06-1.06"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M19 12H5M5 12l6-6M5 12l6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
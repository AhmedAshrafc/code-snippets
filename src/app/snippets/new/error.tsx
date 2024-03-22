// To display an error in case of a database connection issues.
// Unlike other special file names, the error.tsx file MUST have use client at the top.
"use client";

interface ErrorPageProps {
  error: Error;
  // This allows us to automatically refresh a route.
  // Usually we add a button that a user can click on and whenever they click on it, it will refresh the page.
  reset: () => void;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  return <div>{error.message}</div>;
}

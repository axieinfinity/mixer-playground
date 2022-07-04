import dynamic from 'next/dynamic';

export const AxieFigure = dynamic(
  () => import('./AxieFigure').then(module => module.AxieFigure),
  { ssr: false, loading: () => <></> },
);
import dynamic from "next/dynamic";
import { PuffLoading } from "../puff-loading/PuffLoading";

export const AxieFigure = dynamic(
  () => import("./AxieFigure").then((module) => module.AxieFigure),
  {
    ssr: false,
    loading: () => <PuffLoading size={200} />,
  }
);

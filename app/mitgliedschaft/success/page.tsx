import { Suspense } from "react";
import SuccessPageContent from "./success-content";

export default function Page() {
  return (
    <Suspense fallback={<div style={{ color: "#f5f5f5", padding: "10rem 3rem" }}>Laden...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}
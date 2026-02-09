import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DashboardGrid } from "@/components/layout/dashboard-grid";
import { CrewPanel } from "@/components/modules/crew-panel";
import { TelemetryPanel } from "@/components/modules/telemetry-panel";
import { PassesPanel } from "@/components/modules/passes-panel";
import { OrbitalMap } from "@/components/modules/orbital-map";

export default function Home() {
  return (
    <>
      <Header />
      <DashboardGrid
        mapParam={<OrbitalMap />}
        crewPanel={<CrewPanel />}
        telemetryPanel={<TelemetryPanel />}
        passesPanel={<PassesPanel />}
      />
      <Footer />
    </>
  );
}

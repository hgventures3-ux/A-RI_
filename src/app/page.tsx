import Hero from "@/components/Hero";
import MakhanaEducation from "@/components/MakhanaEducation";
import PondToPlate from "@/components/PondToPlate";
import FlavorExplorer from "@/components/FlavorExplorer";
import Heritage from "@/components/Heritage";
import Superfood from "@/components/Superfood";
import Certifications from "@/components/Certifications";
import Blog from "@/components/Blog";
import EspacePro from "@/components/EspacePro";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <MakhanaEducation />
      <PondToPlate />
      <FlavorExplorer />
      <Heritage />
      <Superfood />
      <Certifications />
      <Blog />
      <EspacePro />
    </main>
  );
}

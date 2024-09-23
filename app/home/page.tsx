import Container from "@/components/sections/home/container";
import Cta from "@/components/sections/home/cta";
import Features from "@/components/sections/home/features";
import Hero from "@/components/sections/home/hero";
import Layout from "@/components/sections/home/layout";
import Logos from "@/components/sections/home/logos";

export default function HomePage() {
  return (
    <Layout>
      <Container>
        <Hero />
        <Features />
        <Logos />
        <Cta />
      </Container>
    </Layout>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InfoIcon } from "@phosphor-icons/react/dist/ssr";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </section>
  );
}

function Document({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

export default function BrainstormingSummary() {
  return (
    <div className="p-4">
      <Section title="Session Summary">
        <Card>
          <CardContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
            reprehenderit maxime, excepturi facere recusandae vitae, voluptate
            provident, commodi quo natus labore nesciunt eum incidunt? Nesciunt
            id voluptatibus inventore sapiente hic?
          </CardContent>
        </Card>
      </Section>

      <Section title="Documents">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4">
          <Document
            title="Product Requirements Document (PRD)"
            description="Serves as a guide for teams to understand what needs to be built, why, and how success will be measured."
          />
          <Document
            title="Style Guide"
            description="Defines the visual and written standards for your product, ensuring consistency in design, branding, and communication."
          />
        </div>
      </Section>
    </div>
  );
}

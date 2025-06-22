import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DownloadSimpleIcon, FileIcon } from "@phosphor-icons/react/dist/ssr";
import { DocumentProps, PDFDownloadLink } from "@react-pdf/renderer";
import { ProductRequirementsDocument } from "../templates/prd";
import { StyleGuideDocument } from "../templates/style-guide";

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
  // link,
  pdf,
}: {
  title: string;
  description: string;
  // link: string;
  pdf?: React.ReactElement<DocumentProps>;
}) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex gap-2">
          <FileIcon className="text-muted-foreground" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {pdf && (
        <CardContent>
          <Button asChild variant="secondary">
            <PDFDownloadLink
              document={pdf}
              fileName={`${title.replace(/\s+/g, "-").toLowerCase()}.pdf`}
            >
              <DownloadSimpleIcon />
              Download
            </PDFDownloadLink>
          </Button>
        </CardContent>
      )}
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
            pdf={<ProductRequirementsDocument />}
          />
          <Document
            title="Style Guide"
            description="Defines the visual and written standards for your product, ensuring consistency in design, branding, and communication."
            pdf={<StyleGuideDocument />}
          />
        </div>
      </Section>
    </div>
  );
}

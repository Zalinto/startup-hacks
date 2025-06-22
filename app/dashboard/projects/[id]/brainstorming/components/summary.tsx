import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DownloadSimpleIcon,
  EyeIcon,
  FileIcon,
} from "@phosphor-icons/react/dist/ssr";
import { DocumentProps, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ProductRequirementsDocument from "../templates/prd";
import BrandGuidelinesDocument from "../templates/style-guide";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDialogTitle } from "@/components/ui/alert-dialog";

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
  pdf,
}: {
  title: string;
  description: string;
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
        <CardContent className="flex gap-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="secondary">
                <EyeIcon /> View PDF
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="min-w-[calc(100%_-_32px)] h-[calc(100vh_-_32px)] flex flex-col">
              <AlertDialogTitle hidden>{title}</AlertDialogTitle>
              <div className="block flex-1 -m-6 mb-0">
                <PDFViewer className="block w-full h-full rounded-sm overflow-clip ">
                  {pdf}
                </PDFViewer>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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

export default function BrainstormingSummary({
  summary,
  prd,
  styleGuide,
}: {
  summary: string;
  prd: any;
  styleGuide: any;
}) {
  return (
    <div className="p-4">
      <Section title="Session Summary">
        <Card>
          <CardContent>{summary}</CardContent>
        </Card>
      </Section>

      <Section title="Documents">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4">
          <Document
            title="Product Requirements Document (PRD)"
            description="Serves as a guide for teams to understand what needs to be built, why, and how success will be measured."
            pdf={<ProductRequirementsDocument data={prd} />}
          />
          <Document
            title="Style Guide"
            description="Defines the visual and written standards for your product, ensuring consistency in design, branding, and communication."
            pdf={<BrandGuidelinesDocument data={styleGuide} />}
          />
        </div>
      </Section>
    </div>
  );
}

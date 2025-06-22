"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import IconSelect from "@/components/ui/icon-select";
import { Input } from "@/components/ui/input";
import PageHeader from "@/components/ui/page-header";
import Section from "@/components/ui/section";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import {
  EnvelopeIcon,
  MegaphoneIcon,
  PencilIcon,
  PlusIcon,
  ProjectorScreenIcon,
  VideoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { useActiveProject, useActiveProjectId } from "../hooks";
import { getCampaignsQuery } from "./queries";
import { CAMPAIGN_TYPE_LABELS } from "@/app/constants";

const newCampaignSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["email", "pitch_deck", "scripted_video"]),
});

function StartNewDialog() {
  const form = useForm<z.infer<typeof newCampaignSchema>>({
    resolver: standardSchemaResolver(newCampaignSchema),
    defaultValues: {
      title: "",
    },
  });

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      form.reset();
    }
  }, [open]);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>
          <PlusIcon />
          Start New
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Start New Campaign</AlertDialogTitle>
          <AlertDialogDescription>
            Begin a new outreach campaign to grow your userbase.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              // console.log("Form submitted with data:", data);
              alert("TODO: Create campaign with data: " + JSON.stringify(data));
              // TODO: submit campaign settings and navigate to campaign detail.
              setOpen(false);
            })}
          >
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Exciting New Feature" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campaign Type</FormLabel>
                    <FormControl>
                      <IconSelect
                        options={["email", "scripted_video", "pitch_deck"].map(
                          (type) => ({
                            label: CAMPAIGN_TYPE_LABELS[type].label,
                            value: type,
                            icon: CAMPAIGN_TYPE_LABELS[type].icon,
                          })
                        )}
                        value={field.value ?? null}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter className="">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button type="submit" disabled={!form.formState.isValid}>
                  Create
                </Button>
              </AlertDialogFooter>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function CampaignsTable() {
  const projectId = useActiveProjectId();
  const campaigns = useQuery(getCampaignsQuery(projectId));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="w-0" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaigns.isLoading && (
          <TableRow>
            <TableCell
              colSpan={4}
              className="text-center text-muted-foreground"
            >
              Loading campaigns...
            </TableCell>
          </TableRow>
        )}
        {campaigns.data?.map((campaign) => (
          <TableRow key={campaign.campaign_id}>
            <TableHead>
              <Link
                href={`/dashboard/projects/${projectId}/outreach/${campaign.campaign_id}`}
              >
                {campaign.title}
              </Link>
            </TableHead>
            <TableCell>{CAMPAIGN_TYPE_LABELS[campaign.type].label}</TableCell>
            <TableCell>
              {new Date(campaign.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <Button size="icon" variant="outline" asChild>
                <Link
                  href={`/dashboard/projects/${projectId}/outreach/${campaign.campaign_id}`}
                >
                  <PencilIcon />
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
        {campaigns.data?.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={4}
              className="text-center text-muted-foreground"
            >
              No campaigns found. Start a new one!
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default function ProjectOutreach() {
  const project = useActiveProject().data;
  return (
    <>
      <PageHeader
        title={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>{project?.title ?? "Loading..."}</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage className="line-clamp-1 font-bold flex gap-2 items-center">
                <MegaphoneIcon />
                <span>Outreach</span>
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        }
        nav={<StartNewDialog />}
      />
      <div className="p-4">
        <Section title="Campaigns">
          <CampaignsTable />
        </Section>
      </div>
    </>
  );
}

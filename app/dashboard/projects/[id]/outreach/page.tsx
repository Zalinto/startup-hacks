"use client";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
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
import { Input } from "@/components/ui/input";
import PageHeader from "@/components/ui/page-header";
import { cn } from "@/lib/utils";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Icon } from "@phosphor-icons/react";
import {
  EnvelopeIcon,
  MegaphoneIcon,
  PlusIcon,
  ProjectorScreenIcon,
  VideoIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { useActiveProject } from "../hooks";
import { useEffect, useState } from "react";

const newCampaignSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["email", "pitch_deck", "scripted_video"]),
});

function OptionSelect({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string; icon: Icon }[];
  value: string | null;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid grid-flow-col auto-cols-fr gap-2">
      {options.map((option) => (
        <button
          type="button"
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "flex flex-col items-center gap-2 p-4 rounded-md border border-input transition-colors",
            value === option.value
              ? "bg-accent border-accent-foreground text-foreground"
              : "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
          )}
        >
          <option.icon size={24} />
          <span className="text-sm">{option.label}</span>
        </button>
      ))}
    </div>
  );
}

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
              console.log("Form submitted with data:", data);
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
                      <OptionSelect
                        options={[
                          {
                            label: "Email",
                            value: "email",
                            icon: EnvelopeIcon,
                          },
                          {
                            label: "Video",
                            value: "scripted_video",
                            icon: VideoIcon,
                          },
                          {
                            label: "Pitch Deck",
                            value: "pitch_deck",
                            icon: ProjectorScreenIcon,
                          },
                        ]}
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
    </>
  );
}

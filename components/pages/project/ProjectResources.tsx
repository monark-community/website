import { ReactNode } from "react";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BookOpenIcon,
  BriefcaseBusinessIcon,
  ChartColumnIcon,
  FileTextIcon,
  LockIcon,
  LucideIcon,
  PaletteIcon,
  PresentationIcon,
  RocketIcon,
  ScaleIcon,
} from "lucide-react";
import { ProjectResource, ProjectResourceGroup, ProjectResourceType } from "@/types/project.types";
import { getAppResourceUrl, getAppSignInUrl } from "@/lib/monark-app";
import { Button } from "@/components/ui/button";
import { ProjectPageI18n } from "./project-page.i18n";
import ProjectKickstartDialog from "./ProjectKickstartDialog";

const typeIcons: Record<ProjectResourceType, LucideIcon> = {
  business_plan: BriefcaseBusinessIcon,
  technical_docs: BookOpenIcon,
  slide_deck: PresentationIcon,
  financials: ChartColumnIcon,
  legal: ScaleIcon,
  design: PaletteIcon,
  other: FileTextIcon,
};

const defaultGroup: Record<ProjectResourceType, ProjectResourceGroup> = {
  business_plan: "business",
  slide_deck: "business",
  financials: "business",
  legal: "business",
  technical_docs: "product",
  design: "product",
  other: "product",
};

const GROUP_ORDER: ProjectResourceGroup[] = ["business", "product", "builders"];

const cardClass =
  "flex h-full w-full gap-4 rounded-2xl border bg-card p-5 text-left no-underline transition-colors hover:border-primary/50 hover:bg-secondary/40";

function CardBody({
  Icon,
  title,
  format,
  description,
  action,
  locked,
  inPage = false,
}: {
  Icon: LucideIcon;
  title: string;
  format?: string;
  description?: string;
  action: string;
  locked: boolean;
  /** Opens on this page (a dialog) rather than in a new tab. */
  inPage?: boolean;
}) {
  return (
    <>
      <span
        aria-hidden="true"
        className={`relative inline-flex size-11 shrink-0 items-center justify-center rounded-xl ${
          locked ? "bg-secondary text-muted-foreground" : "bg-primary/10 text-primary"
        }`}
      >
        <Icon className="size-5" strokeWidth={1.75} />
        {locked && (
          <span className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full border bg-card text-foreground">
            <LockIcon className="size-3" strokeWidth={2.25} />
          </span>
        )}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-bold text-foreground">{title}</span>
          {format && <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{format}</span>}
        </span>
        {description && <span className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</span>}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-primary-ink">
          {locked && <LockIcon aria-hidden="true" className="size-3.5" />}
          {action}
          {!locked && (inPage ? <ArrowRightIcon aria-hidden="true" className="size-3.5" /> : <ArrowUpRightIcon aria-hidden="true" className="size-3.5" />)}
        </span>
      </span>
    </>
  );
}

interface Props {
  projectId: string;
  resources: ProjectResource[];
  labels: ProjectPageI18n["resources_labels"];
  /** Kickstart guide body (dev environment + required resources); omitted when there is none. */
  kickstart?: { intro: string; content: ReactNode };
}

/**
 * Project documents grouped by audience. Public ones link out; locked ones show
 * what exists and open in the Monark app, which asks the visitor to sign in.
 * The kickstart guide is always public and opens in a dialog.
 */
export default function ProjectResources({ projectId, resources, labels, kickstart }: Props) {
  const lockedCount = resources.filter((r) => !r.href).length;
  const byGroup = new Map<ProjectResourceGroup, ReactNode[]>();
  const add = (group: ProjectResourceGroup, node: ReactNode) =>
    byGroup.set(group, [...(byGroup.get(group) ?? []), node]);

  if (kickstart) {
    add(
      "builders",
      <ProjectKickstartDialog
        key="kickstart"
        title={labels.kickstart_title}
        intro={kickstart.intro}
        trigger={
          <button type="button" className={cardClass}>
            <CardBody
              Icon={RocketIcon}
              title={labels.kickstart_title}
              format={labels.kickstart_format}
              description={labels.kickstart_description}
              action={labels.kickstart_open}
              locked={false}
              inPage
            />
          </button>
        }
      >
        {kickstart.content}
      </ProjectKickstartDialog>
    );
  }

  for (const resource of resources) {
    const locked = !resource.href;
    const action = locked ? labels.sign_in : labels.open;
    add(
      resource.group ?? defaultGroup[resource.type] ?? "product",
      <a
        key={resource.id}
        href={resource.href ?? getAppResourceUrl(projectId, resource.id)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={locked ? `${resource.title} (${labels.locked}): ${action}` : undefined}
        className={cardClass}
      >
        <CardBody
          Icon={typeIcons[resource.type] ?? FileTextIcon}
          title={resource.title}
          format={resource.format}
          description={resource.description}
          action={action}
          locked={locked}
        />
      </a>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {lockedCount > 0 && (
        <div className="flex flex-col gap-4 rounded-2xl border border-primary/30 bg-primary/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-4">
            <span aria-hidden="true" className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <LockIcon className="size-5" />
            </span>
            <div>
              <p className="m-0 max-w-none font-bold text-foreground">
                {labels.banner_title.replace("{n}", String(lockedCount))}
              </p>
              <p className="m-0 mt-1 text-sm text-muted-foreground">{labels.banner_body}</p>
            </div>
          </div>
          <Button asChild className="shrink-0 no-underline">
            <a href={getAppSignInUrl(projectId)} target="_blank" rel="noopener noreferrer">
              {labels.banner_cta}
              <ArrowUpRightIcon aria-hidden="true" />
            </a>
          </Button>
        </div>
      )}

      {GROUP_ORDER.filter((g) => byGroup.has(g)).map((group) => (
        <div key={group}>
          <h3 className="mb-3 mt-0 text-base text-muted-foreground">{labels.groups[group]}</h3>
          <ul className="m-0 grid max-w-none list-none gap-3 p-0 sm:grid-cols-2">
            {byGroup.get(group)!.map((node, i) => (
              <li key={i} className="m-0">{node}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

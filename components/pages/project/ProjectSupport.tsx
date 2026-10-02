import {
  BlocksIcon,
  BookOpenIcon,
  CalendarSyncIcon,
  HandCoinsIcon,
  LayoutTemplateIcon,
  LucideIcon,
  MessageCircleIcon,
  PaletteIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react";
import { ProjectPageI18n, SupportIconName } from "./project-page.i18n";

const icons: Record<SupportIconName, LucideIcon> = {
  blocks: BlocksIcon,
  users: UsersIcon,
  "message-circle": MessageCircleIcon,
  "calendar-sync": CalendarSyncIcon,
  palette: PaletteIcon,
  "book-open": BookOpenIcon,
  wallet: WalletIcon,
  "layout-template": LayoutTemplateIcon,
};

interface Props {
  labels: ProjectPageI18n["support_labels"];
  projectName: string;
  /** Formatted amount Monark has invested, when the project has one. */
  investment: string | null;
}

/** What Monark gives every project team, plus what it has invested in this one. */
export default function ProjectSupport({ labels, projectName, investment }: Props) {
  return (
    <div className="rounded-3xl border bg-secondary/60 p-6 sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <p className="m-0 max-w-[34rem] text-lg leading-relaxed text-foreground">{labels.intro}</p>
        {investment && (
          <div className="flex shrink-0 items-center gap-4 rounded-2xl border bg-card px-5 py-4">
            <span aria-hidden="true" className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <HandCoinsIcon className="size-6" strokeWidth={1.75} />
            </span>
            <p className="m-0 max-w-[16rem] text-sm text-muted-foreground">
              <strong className="block text-2xl font-extrabold tabular-nums tracking-display text-foreground">{investment}</strong>
              {labels.investment.replace("{name}", projectName)}
            </p>
          </div>
        )}
      </div>
      <ul className="m-0 mt-8 grid max-w-none list-none grid-cols-2 gap-x-4 gap-y-6 p-0 sm:gap-x-6 xl:grid-cols-4">
        {labels.items.map((item) => {
          const Icon = icons[item.icon];
          return (
            <li key={item.title} className="m-0 flex flex-col gap-2">
              <span aria-hidden="true" className="inline-flex size-10 items-center justify-center rounded-xl bg-card text-primary">
                <Icon className="size-5" strokeWidth={1.75} />
              </span>
              <span className="font-bold text-foreground">{item.title}</span>
              <span className="text-sm leading-relaxed text-muted-foreground">{item.description}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

"use client";

import { ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Props {
  /** The resource card that opens the dialog. */
  trigger: ReactNode;
  title: string;
  intro: string;
  /** Developer environment and required resources, rendered from MDX on the server. */
  children: ReactNode;
}

/** Project kickstart guide: the shared dev environment plus the project's required resources. */
export default function ProjectKickstartDialog({ trigger, title, intro, children }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto rounded-2xl">
        <DialogTitle className="pr-10 text-2xl font-extrabold tracking-display">{title}</DialogTitle>
        <DialogDescription className="text-base">{intro}</DialogDescription>
        <div className="flex flex-col gap-6">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

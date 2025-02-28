import React from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/shared/navlink/navlink";
import { Locale } from "@/i18n.config";
import * as i18n from "./about.i18n";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

type Params = Promise<{ locale: Locale }>;

export default async function AboutMonarkPage({ params }: { params: Params }) {
  const { locale } = await params;
  const t = i18n[locale].about_page;

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="max-w-[900px] mx-auto ">
        <h1 className="mb-6">{t.title}</h1>
        {t.sections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{section.heading}</h2>
            <p className="text-lg whitespace-pre-line">{section.content}</p>
          </div>
        ))}
      </section>
      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">{t.team.team_title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {t.team.members.map((member) => (
              <Card key={member.name}>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {member.name}
                  </CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <div className="mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="rounded-full border-4 border-primary mx-auto w-full h-auto sm:w-48 sm:h-48"
                    />
                  </div>
                  <ul className="text-left list-disc list-inside">
                    {member.description.map((desc, index) => (
                      <li key={index}>{desc}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <div className="mt-8 text-center">
        <NavLink href="/">
          <Button>{t.back_home}</Button>
        </NavLink>
      </div>
    </div>
  );
}

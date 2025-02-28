import { Locale } from "@/i18n.config";
import * as i18n from "./page.i18n";
import Image from "next/image";
import SOCIALS from "@/components/web/footer/socials/socials";

type Params = Promise<{ locale: Locale }>;

export default async function Article({ params }: { params: Params }) {
  const { locale } = await params;
  const t = i18n[locale].article;

  const articleUrl = `https://monark.dominicfournier.com/${locale}/learn/news/pioneer-in-university-projects-mentorship`;

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article>
        <header className="mb-8">
          <div className="flex items-center max-h-[300px] overflow-hidden rounded-xl mb-4">
            <Image
              src={`/${locale}/images/news/${t.image}`}
              alt={t.title}
              width={900}
              height={300}
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
          <p>
            {t.city}, {t.date}
          </p>
        </header>

        <div className="prose max-w-none text-sm">
          <p>{t.intro}</p>

          <h3>{t.expertiseTitle}</h3>
          <p>
            <div dangerouslySetInnerHTML={{ __html: t.expertiseContent }}></div>
          </p>
          <blockquote>{t.expertiseQuote}</blockquote>

          <h3>{t.methodologyTitle}</h3>
          <p>{t.methodologyContent}</p>
          <blockquote>{t.methodologyQuote}</blockquote>

          <h3>{t.futureProjectsTitle}</h3>
          <p>{t.futureProjectsContent}</p>
          <ul>
            {t.projectsList.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>{t.ecosystemTitle}</h3>
          <p>{t.ecosystemContent}</p>
          <blockquote>{t.ecosystemQuote}</blockquote>

          <h3>{t.impactTitle}</h3>
          <p>{t.impactContent}</p>
          <blockquote>{t.impactQuote}</blockquote>

          <hr />

          <p>{t.conclusion}</p>

          <p>
            <div dangerouslySetInnerHTML={{ __html: t.contactInfo }}></div>
          </p>
          <div className="mt-8">
            <h3>{t.shareTitle}</h3>
            <div className="flex gap-2">
              {SOCIALS.filter((social) => social.shareUrl).map((social) => (
                <a
                  key={social.id}
                  href={`${social.shareUrl}${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={`/vectors/socials/${social.id}.svg`}
                    alt={social.name}
                    width={24}
                    height={24}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

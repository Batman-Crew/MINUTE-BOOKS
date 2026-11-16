import { industries } from "@/lib/industries";
import { industryPhotos } from "@/lib/industry-photos";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Photo Credits",
  description: "Credits and licences for the stock photographs used on the Minute Books website.",
  path: "/credits",
});

export default function Page() {
  return (
    <section className="pb-28 pt-40">
      <div className="container-x max-w-4xl">
        <h1 className="text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.02] tracking-tight">Photo credits</h1>
        <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-muted">
          These stock photographs illustrate the industries we serve. They are from Pexels, are used under the Pexels License, and do not show Minute Books customers. Some have been cropped or brightened.
        </p>
        <ul className="mt-12 divide-y divide-line border-y border-line">
          {industries.map((industry) => {
            const photo = industryPhotos[industry.slug];
            if (!photo) return null;
            return (
              <li key={industry.slug} className="py-5">
                <p className="text-[13px] font-medium text-violet-700">{industry.name}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-2">
                  <a href={photo.source} className="underline underline-offset-2 hover:text-violet-700" target="_blank" rel="noopener noreferrer">{photo.title}</a>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

import type { MetadataRoute } from "next";
import { getEvents } from "@/lib/events";
import { site } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const events = await getEvents();
  return [
    ...["", "/eventos", "/el-teatro", "/contacto"].map((path) => ({ url: `${site.url}${path}` })),
    ...events.map((e) => ({ url: `${site.url}/eventos/${e.slug}` })),
  ];
}

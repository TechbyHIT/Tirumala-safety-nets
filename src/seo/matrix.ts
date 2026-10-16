import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { jobs } from "./jobs";
import { serviceAreaJobPath } from "./urls";

const SHARD = 20000;

const areaRefs = cities.flatMap((city) => city.areas.map((area) => ({ city: city.slug, area: area.slug })));

export function matrixLength() {
  return areaRefs.length * services.length * jobs.length;
}

export function shardSize() {
  return SHARD;
}

export function shardCount() {
  return Math.ceil(matrixLength() / SHARD);
}

export function pathAt(index: number) {
  const perArea = services.length * jobs.length;
  const areaIndex = Math.floor(index / perArea);
  const rest = index % perArea;
  const service = services[Math.floor(rest / jobs.length)];
  const job = jobs[rest % jobs.length];
  const ref = areaRefs[areaIndex];
  if (!service || !job || !ref) return undefined;
  return serviceAreaJobPath(service.slug, ref.city, ref.area, job.slug);
}

export function pathsForShard(id: number) {
  const start = id * SHARD;
  const end = Math.min(start + SHARD, matrixLength());
  const paths: string[] = [];
  for (let index = start; index < end; index += 1) {
    const path = pathAt(index);
    if (path) paths.push(path);
  }
  return paths;
}

export const coverageCounts = {
  cities: cities.length,
  areas: areaRefs.length,
  services: services.length,
  jobs: jobs.length,
  jobPages: areaRefs.length * services.length * jobs.length,
};

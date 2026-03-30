import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const tendersTable = process.env.SUPABASE_TENDERS_TABLE ?? "tenders";

if (!supabaseUrl || !supabaseKey) {
  console.warn("Supabase environment variables are missing; live tender feed will be empty.");
}

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })
  : null;

export type TenderCard = {
  id: string;
  title: string;
  agency?: string | null;
  deadline?: string | null;
  value?: string | null;
  location?: string | null;
  description?: string | null;
  requirements: string[];
  link?: string | null;
  tag?: string | null;
};

type TenderRow = {
  id: string;
  state: string | null;
  source: string | null;
  agency: string | null;
  reference: string | null;
  title: string | null;
  status: string | null;
  location: string | null;
  description: string | null;
  closing_local: string | null;
  url: string | null;
  extra_links: Record<string, unknown> | null;
  raw: Record<string, unknown> | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function pickString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length ? value.trim() : undefined;
}

function deriveRequirements(row: TenderRow): string[] {
  const requirements: string[] = [];
  const extra = (row.extra_links ?? {}) as Record<string, unknown>;
  const raw = (row.raw ?? {}) as Record<string, unknown> & { detail?: unknown };
  const detail = isRecord(raw.detail) ? (raw.detail as Record<string, unknown>) : {};
  const overview = isRecord(detail.overview)
    ? (detail.overview as Record<string, unknown>)
    : {};

  const projectGoals =
    pickString(extra.projectGoals) ||
    pickString(detail.projectGoals) ||
    pickString(raw["Project Goals"]);

  if (projectGoals) {
    projectGoals
      .split(/\n|•|-/)
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 3)
      .forEach((item) => requirements.push(item));
  }

  const classification =
    pickString(raw["Classification Tags"]) || pickString(raw.categories) || pickString(overview["Category(s)"]);
  if (!requirements.length && classification) {
    classification
      .split(/[,;]+/)
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 3)
      .forEach((item) => requirements.push(item));
  }

  if (!requirements.length && row.status) {
    requirements.push(row.status);
  }

  if (!requirements.length) {
    requirements.push("See tender brief for full requirements");
  }

  return requirements;
}

function formatValue(row: TenderRow): string | null {
  if (row.state && row.reference) {
    return `${row.state} · Ref ${row.reference}`;
  }
  if (row.reference) return `Ref ${row.reference}`;
  if (row.state) return row.state;
  return row.source || null;
}

export async function fetchLatestTenderCards(limit = 6, states: string[] = ["WA", "NSW"]): Promise<TenderCard[]> {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from(tendersTable)
    .select(
      "id,state,source,agency,reference,title,status,location,description,closing_local,url,extra_links,raw"
    )
    .in("state", states)
    .order("closing_local", { ascending: true })
    .limit(limit * states.length)
    .returns<TenderRow[]>();

  if (error) {
    console.error("Supabase tender fetch failed:", error.message);
    return [];
  }

  if (!data) return [];

  const mapped = data
    .map((row) => {
      const requirements = deriveRequirements(row);
      return {
        id: row.id,
        title: row.title || row.reference || "Untitled tender",
        agency: row.agency,
        deadline: row.closing_local,
        value: formatValue(row),
        location: row.location,
        description: row.description,
        requirements,
        link: row.url,
        tag: row.state || row.source,
      } satisfies TenderCard;
    })
    .filter(Boolean);

  return mapped.slice(0, limit);
}

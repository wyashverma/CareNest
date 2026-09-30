import { searchCategoryMeta, searchCategoryOrder, searchIndex } from '@/data/searchIndex';
import type { SearchGroup, SearchItem, SearchOptions } from '@/types/search';
import { mockDelay } from '@/utils/mockDelay';
import { USE_MOCK } from './http/config';
import { apiGet } from './http/apiClient';

/** MOCK adapter: substring match over the sample index. Every word in the query must match. */
function searchLocal(query: string, limitPerCategory: number): SearchGroup[] {
  const q = query.trim().toLowerCase();
  const words = q.split(/\s+/).filter(Boolean);
  if (!words.length) return [];

  const groups: SearchGroup[] = [];
  for (const category of searchCategoryOrder) {
    const { label, route } = searchCategoryMeta[category];
    const scored = searchIndex
      .filter((e) => e.category === category)
      .map((e) => {
        const title = e.title.toLowerCase();
        const haystack = [title, e.subtitle.toLowerCase(), ...(e.keywords ?? [])].join(' ');
        if (!words.every((w) => haystack.includes(w))) return null;
        const score = title.startsWith(q) ? 3 : title.includes(q) ? 2 : 1;
        // Detail pages do not exist yet, so results link to the filtered listing.
        const item: SearchItem = {
          id: e.id,
          category,
          title: e.title,
          subtitle: e.subtitle,
          to: `${route}?q=${encodeURIComponent(e.title)}`,
        };
        return { item, score };
      })
      .filter((x): x is { item: SearchItem; score: number } => x !== null)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title));

    if (scored.length) {
      groups.push({ category, label, total: scored.length, items: scored.slice(0, limitPerCategory).map((x) => x.item) });
    }
  }
  return groups;
}

export async function searchAll(query: string, { limitPerCategory = 3 }: SearchOptions = {}): Promise<SearchGroup[]> {
  if (USE_MOCK) return mockDelay(searchLocal(query, limitPerCategory), 150); // MOCK
  return apiGet<SearchGroup[]>(`/search?q=${encodeURIComponent(query)}&limit=${limitPerCategory}`);
}

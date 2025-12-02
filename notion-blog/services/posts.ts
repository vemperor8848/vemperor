import { getRecordMap } from '@blog/libs/notion';
import { mapImageUrl } from '@blog/libs/map-image';
import { Post } from '@blog/types/post';
import {
  FALLBACK_COVER,
  getBlurImage,
} from '@blog/utils/get-blur-image';

const coverResolutionCache = new Map<string, string>();

async function resolveExternalCover(url: string): Promise<string> {
  if (!url) return '';
  if (coverResolutionCache.has(url)) {
    return coverResolutionCache.get(url)!;
  }

  let resolvedUrl = url;

  try {
    const parsed = new URL(url);

    if (parsed.hostname === 'ibb.co' || parsed.hostname === 'www.ibb.co') {
      // Prefer the direct image behind the share page; fallback to default cover if it can't be found.
      resolvedUrl = '';
      const response = await fetch(url);

      if (response.ok) {
        const html = await response.text();
        const match = html.match(
          /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
        );

        if (match?.[1]) {
          resolvedUrl = match[1];
        }
      }
    }
  } catch {
    // keep the original URL on failure
  }

  coverResolutionCache.set(url, resolvedUrl);
  return resolvedUrl;
}

export async function getAllPostsFromNotion() {
  const allPosts: Post[] = [];
  const databaseId = process.env.NOTION_DATABASE_ID;
  const recordMap = await getRecordMap(databaseId || '');
  const { block, collection } = recordMap;
  const schema = Object.values(collection)[0].value.schema;
  const propertyMap: Record<string, string> = {};

  Object.keys(schema).forEach((key) => {
    propertyMap[schema[key].name] = key;
  });

  for (const pageId of Object.keys(block)) {
    if (
      block[pageId].value.type === 'page' &&
      block[pageId].value.properties
    ) {
      try {
        const { properties, last_edited_time } = block[pageId].value;

        const getProp = (name: string) => properties?.[propertyMap[name]];

        const slugProp = getProp('Slug');
        const pageProp = getProp('Page');
        if (!slugProp?.[0]?.[0] || !pageProp?.[0]?.[0]) {
          continue;
        }

        const slug = slugProp[0][0];
        const title = pageProp[0][0];

        // Category: support text or multi_select
        const categoryProp = getProp('Category');
        let categories: string[] = [];
        if (Array.isArray(categoryProp?.[0])) {
          // text: [[ 'notes,design' ]]
          const raw = categoryProp[0][0];
          if (typeof raw === 'string') {
            categories = raw
              .split(',')
              .map((c) => c.trim())
              .filter(Boolean);
          }
        }
        // fallback: multi_select structure
        if (!categories.length && Array.isArray(categoryProp)) {
          categories = categoryProp
            .map((v: any) => v?.[0])
            .filter((v: any) => typeof v === 'string' && v.trim().length > 0);
        }

        // Cover: file or external url
        const coverProp = getProp('Cover');
        const coverRaw = coverProp?.[0]?.[1]?.[0]?.[1] || '';
        const coverUrl =
          typeof coverRaw === 'string' && coverRaw.startsWith('attachment:')
            ? ''
            : coverRaw || '';

        // Date
        const dateProp = getProp('Date');
        const date = dateProp?.[0]?.[1]?.[0]?.[1]?.start_date || '';

        // Published: support select Yes or checkbox true
        const publishedProp = getProp('Published');
        const publishedValue = publishedProp?.[0]?.[0];
        const published =
          publishedValue === 'Yes' ||
          publishedValue === 'yes' ||
          publishedValue === true;

        const contents = block[pageId].value.content || [];
        const dates = contents.map((content) => {
          return block[content]?.value?.last_edited_time;
        });
        dates.push(last_edited_time);
        dates.sort((a, b) => b - a);
        const lastEditedAt = dates[0];

        const resolvedCoverUrl = await resolveExternalCover(coverUrl);
        let mappedCover = FALLBACK_COVER;

        if (resolvedCoverUrl) {
          try {
            mappedCover =
              mapImageUrl(resolvedCoverUrl, block[pageId].value) ||
              FALLBACK_COVER;
          } catch {
            mappedCover = resolvedCoverUrl || FALLBACK_COVER;
          }
        }

        allPosts.push({
          id: pageId,
          title,
          slug,
          categories,
          // Fix 403 error for images.
          // https://github.com/NotionX/react-notion-x/issues/211
          cover: mappedCover,
          date,
          published,
          lastEditedAt,
        });
      } catch (err) {
        // Skip malformed entries silently
      }
    }
  }

  const blurImagesPromises = allPosts.map((post) => getBlurImage(post.cover));
  const blurImages = await Promise.all(blurImagesPromises);
  allPosts.forEach((post, i) => (post.blurUrl = blurImages[i].base64));

  return allPosts;
}

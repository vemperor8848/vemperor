import { getPlaiceholder } from 'plaiceholder';

const FALLBACK_BLUR =
  'data:image/gif;base64,R0lGODlhAQABAAAAACw=';
const FALLBACK_COVER =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 800%22%3E%3Cdefs%3E%3ClinearGradient id=%22g%22 x1=%220%25%22 x2=%22100%25%22 y1=%220%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 stop-color=%22%23f2f5ff%22/%3E%3Cstop offset=%22100%25%22 stop-color=%22%23e8ecf6%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%221200%22 height=%22800%22 fill=%22url(%23g)%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fill=%22%238599b5%22 font-family=%22Arial, sans-serif%22 font-size=%2280%22 font-weight=%22600%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3ENotes%20%26%20Drops%3C/text%3E%3C/svg%3E';

export async function getBlurImage(src: string) {
  const isFallbackSource = !src || src.startsWith('data:');
  if (isFallbackSource) {
    return {
      base64: FALLBACK_BLUR,
      img: { src: src || FALLBACK_COVER, height: 1, width: 1 },
    };
  }

  try {
    const buffer = await fetch(src).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );

    const {
      metadata: { height, width },
      ...plaiceholder
    } = await getPlaiceholder(buffer, { size: 10 });

    return {
      ...plaiceholder,
      img: { src, height, width },
    };
  } catch {
    return {
      base64: FALLBACK_BLUR,
      img: { src, height: 1, width: 1 },
    };
  }
}

export { FALLBACK_COVER, FALLBACK_BLUR };

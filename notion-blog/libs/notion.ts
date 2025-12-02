import { NotionAPI } from 'notion-client';

const notionAuthToken = process.env.NOTION_AUTH_TOKEN;
const notion = new NotionAPI({
  // Notion 的公开页面可匿名访问，但携带 token 可提升速率限制。
  authToken: notionAuthToken,
});

export function getRecordMap(id: string) {
  if (!id) {
    throw new Error('NOTION_DATABASE_ID is missing. Set it in your environment.');
  }

  return notion.getPage(id);
}

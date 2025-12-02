'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import { useTheme } from 'next-themes';
import { ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x';

import CategoryList from '@blog/components/category-list';
import useMounted from '@blog/hooks/use-mounted';
import { Post } from '@blog/types/post';
import { mapImageUrl } from '@blog/libs/map-image';

export default function NotionPage({
  post,
  recordMap,
}: {
  post: Post;
  recordMap: ExtendedRecordMap;
}) {
  const { theme } = useTheme();
  const mounted = useMounted();

  return (
    <NotionRenderer
      darkMode={mounted ? theme === 'dark' : false}
      recordMap={recordMap}
      fullPage
      forceCustomImages
      showTableOfContents
      disableHeader
      pageHeader={
        <div className="mb-4">
          <CategoryList categories={post.categories} />
        </div>
      }
      mapImageUrl={(url, block) => mapImageUrl(url, block) || ''}
      components={{
        Code,
        Collection,
        Equation,
        Modal,
        Pdf: PdfFallback,
        nextImage: Image,
      }}
    />
  );
}

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
);
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
);
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
);
const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false,
  }
);

// PDF 渲染依赖 canvas，生产环境未安装。使用空占位避免构建失败。
function PdfFallback() {
  return null;
}

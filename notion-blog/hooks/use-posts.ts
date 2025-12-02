import { useEffect, useMemo } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { categoriesState } from '@blog/states/categories';
import { pageState } from '@blog/states/page';
import { queryState } from '@blog/states/query';
import { Post } from '@blog/types/post';
import { search } from '@blog/utils/search';
import { toUniqueArray } from '@blog/utils/to-unique-array';

const POST_PER_PAGE = 12;

export default function usePosts(allPosts: Post[]) {
  const [page, setPage] = useRecoilState(pageState);
  const query = useRecoilValue(queryState);
  const [categories, setCategories] = useRecoilState(categoriesState);

  const allPostsFiltered = useMemo(() => {
    const filtered = allPosts.filter((post) => {
      if (!post.published) {
        return false;
      }

      if (query && !search(post.title, query)) {
        return false;
      }

      if (categories.selected.length) {
        const isCategoryMatch = categories.selected.every((cat) =>
          post.categories.includes(cat)
        );
        if (!isCategoryMatch) {
          return false;
        }
      }

      return true;
    });

    // Deduplicate by slug to avoid duplicate renders when filters re-run.
    const seen = new Set<string>();
    return filtered.filter((post) => {
      if (seen.has(post.slug)) return false;
      seen.add(post.slug);
      return true;
    });
  }, [allPosts, categories.selected, query]);

  const sortedPosts = useMemo(
    () =>
      [...allPostsFiltered].sort((postA, postB) =>
        postA.date > postB.date ? -1 : 1
      ),
    [allPostsFiltered]
  );

  const totalPages = Math.ceil(sortedPosts.length / POST_PER_PAGE);
  const offset = (page ? +page - 1 : 0) * POST_PER_PAGE;
  const postsForCurrentPage = sortedPosts.slice(offset, offset + POST_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [query, categories.selected, setPage]);

  useEffect(() => {
    setCategories((prevCategories) => ({
      ...prevCategories,
      active: toUniqueArray(
        sortedPosts.map((post) => post.categories).flat()
      ),
    }));
  }, [setCategories, sortedPosts]);

  return {
    posts: postsForCurrentPage,
    totalPages,
  };
}

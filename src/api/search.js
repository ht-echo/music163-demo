import request from '@/utils/request';

export function getSearchResult(keywords) {
  return request({
    url: '/search/suggest',
    params: {
      keywords,
    },
  });
}

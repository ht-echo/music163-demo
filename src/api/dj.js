import request from '@/utils/request';

export function getDjProgram() {
  return request({
    url: '/personalized/djprogram',
  });
}
//推荐节目
export function getDjRecommend() {
  return request({
    url: '/dj/recommend',
  });
}

//节目排行榜
export function getDjToplist() {
  return request({
    url: '/dj/program/toplist',
  });
}

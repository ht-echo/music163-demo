import request from '@/utils/request';

//歌手分类列表
export function getSingerCategory(params) {
  const { type = 1, area = -1, initial = -1, } = params;
  return request({
    url: '/artist/list',
    params: { type, area, initial },
  });
}
//获取歌手单曲
export function getSingerInfo(id) {
  return request({
    url: '/artists',
    params: { id },
  });
}

//获取歌手专辑
export function getSingerAlbum(id) {
  const limit = 12;
  return request({
    url: '/artist/album',
    params: { id, limit },
  });
}

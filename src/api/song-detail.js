import request from '@/utils/request';

// 歌曲详情网络请求
export function getSongDeatilData(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id,
    },
  });
}
//获取专辑内容
export function getAlbumData(id) {
  return request({
    url: '/album',
    params: {
      id,
    },
  });
}

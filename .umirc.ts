import { defineConfig } from 'umi';

export default defineConfig({
  base: '/music163-demo/',
  publicPath: process.env.NODE_ENV === 'production' ? '/music163-demo/' : '/',
  links: [{ rel: 'icon', href: '/favicon.png' }],
  title: 'music163 demo',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts',
      routes: [
        { path: '/', exact: true, redirect: '/discover' },
        {
          path: '/discover',
          component: '@/pages/discover',
          routes: [
            {
              path: '/discover',
              exact: true,
              redirect: '/discover/recommend',
            },
            {
              path: '/discover/recommend',
              exact: true,
              component: '@/pages/discover/recommend',
              title: '推荐',
            },
            {
              path: '/discover/ranking',
              component: '@/pages/discover/ranking',
              title: '排行榜',
            },
            {
              path: '/discover/songs',
              component: '@/pages/discover/songs',
              title: '歌单',
            },
            {
              path: '/discover/djradio',
              component: '@/pages/discover/djradio',
              title: '主播电台',
            },
            {
              path: '/discover/artist',
              component: '@/pages/discover/artist',
              title: '歌手',
            },
            {
              path: '/discover/album',
              component: '@/pages/discover/album',
              title: '新碟上架',
            },
            {
              path: '/discover/playlist',
              component: '@/pages/discover/playlist',
              title: '歌单详情',
            },
            {
              path: '/discover/artistInfo',
              component: '@/pages/discover/artist-info',
              title: '歌手详情',
            },
          ],
        },
        { path: '/friend', component: '@/pages/friend', title: '发现音乐' },
        { path: '/mine', component: '@/pages/mine', title: '我的音乐' },
        {
          path: '/download',
          component: '@/pages/download',
          title: '下载客户端',
        },
      ],
    },
  ],
  history: {
    type: 'hash',
  },
  proxy: {
    '/api': {
      // target: 'http://123.57.176.198:3000',
      target: 'https://vercel-cloudmusic.vercel.app',

      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
  },
});

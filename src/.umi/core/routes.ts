// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from 'E:/Z_projects/C_react/pc-music163/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": require('@/layouts').default,
    "routes": [
      {
        "path": "/",
        "exact": true,
        "redirect": "/discover"
      },
      {
        "path": "/discover",
        "component": require('@/pages/discover').default,
        "routes": [
          {
            "path": "/discover",
            "exact": true,
            "redirect": "/discover/recommend"
          },
          {
            "path": "/discover/recommend",
            "exact": true,
            "component": require('@/pages/discover/recommend').default,
            "title": "推荐"
          },
          {
            "path": "/discover/ranking",
            "component": require('@/pages/discover/ranking').default,
            "title": "排行榜",
            "exact": true
          },
          {
            "path": "/discover/songs",
            "component": require('@/pages/discover/songs').default,
            "title": "歌单",
            "exact": true
          },
          {
            "path": "/discover/djradio",
            "component": require('@/pages/discover/djradio').default,
            "title": "主播电台",
            "exact": true
          },
          {
            "path": "/discover/artist",
            "component": require('@/pages/discover/artist').default,
            "title": "歌手",
            "exact": true
          },
          {
            "path": "/discover/album",
            "component": require('@/pages/discover/album').default,
            "title": "新碟上架",
            "exact": true
          },
          {
            "path": "/discover/playlist",
            "component": require('@/pages/discover/playlist').default,
            "title": "歌单详情",
            "exact": true
          },
          {
            "path": "/discover/artistInfo",
            "component": require('@/pages/discover/artist-info').default,
            "title": "歌手详情",
            "exact": true
          }
        ]
      },
      {
        "path": "/friend",
        "component": require('@/pages/friend').default,
        "title": "发现音乐",
        "exact": true
      },
      {
        "path": "/mine",
        "component": require('@/pages/mine').default,
        "title": "我的音乐",
        "exact": true
      },
      {
        "path": "/download",
        "component": require('@/pages/download').default,
        "title": "下载客户端",
        "exact": true
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}

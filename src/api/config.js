// 本地测试API
const devBaseURL = 'http://localhost:3000';
// const devBaseURL = '/api';
// 已经部署到服务器上的API
const proBaseURL = 'https://vercel-cloudmusic.vercel.app';

export const BASE_URL =
  process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL;

export const TIMEOUT = 12000;

export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

export const getImageUrl = (path: string | null, size: string = 'w500') =>
  path ? `${IMAGE_BASE_URL}/${size}${path}` : null;

export const getBackdropUrl = (path: string | null) =>
  getImageUrl(path, 'original');

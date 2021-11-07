export const environment = {
  production: true,
  'api-key': 'c5138aa93c943ae6f12c39403fd3db66',
  api: 'https://api.themoviedb.org/3/',
  image: 'https://image.tmdb.org/t/p/original/',
  'firebase-api': 'AIzaSyDdk4-jqwc_gvXfOv0zx7Vddun6CqtNbps',
  auth(mode: string): string{
    return `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${this["firebase-api"]}`
  }
};

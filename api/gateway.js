export const config = {
  runtime: 'edge',
};

export default async function gateway(req) {
  const { searchParams } = new URL(req.url);
  const apiURL = searchParams.get('url');

  const hasQueries = apiURL.includes('?');
  const symbol = hasQueries ? '&' : '?';

  const urlWithApiKey = `${apiURL}${symbol}api_key=${process.env.API_KEY}`;

  const apiRes = await fetch(urlWithApiKey);
  const apiData = await apiRes.json();

  return new Response(JSON.stringify(apiData));
}

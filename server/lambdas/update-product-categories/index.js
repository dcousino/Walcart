const axios = require('axios');
const { URL } = require('url');
exports.handler = async event => {
  console.log(event);
  const proxyurl = new URL(
    `http://api.walmartlabs.com/${event.pathParameters.proxy}`
  );

  for (const kvp in event.queryStringParameters) {
    proxyurl.searchParams.append(kvp, event.queryStringParameters[kvp]);
  }
  proxyurl.searchParams.append('apiKey', process.env.apiKey);
  proxyurl.searchParams.append('format', 'json');
  try {
    const res = await axios.get(proxyurl.toString());
    const result = {
      statusCode: res.statusCode || 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(res.data)
    };
    return result;
  } catch (err) {
    const result = {
      statusCode: err.response.status || 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(err.response.statusText)
    };
    return result;
  }
};

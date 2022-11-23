// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import nodeHtmlToImage from 'node-html-to-image';

export default async function generateQuoteshot(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const title = 'Sum';
  const author = 'David Eagleman';
  const cover =
    'https://images-na.ssl-images-amazon.com/images/I/41e97FX3MAL.jpg';
  const excerpt =
    'There are three deaths. The first is when the body ceases to function. The second is when the body is consigned to the grave. The third is that moment, sometime in the future, when your name is spoken for the last time.';

  const image = await nodeHtmlToImage({
    html: `
    <html>
  <body>
    <article
      style="
        display: flex;
        align-items: center;
        background-color: lightblue;
      "
    >
      <div>
        <p>
          {{excerpt}}
        </p>
        <div>
          <p>{{title}}</p>
          <p>{{author}}</p>
        </div>
      </div>
      <div>
        <img src="{{cover}}" alt="{{title}} by {{author}}" />
      </div>
    </article>
  </body>
</html>
`,
    content: {
      title,
      author,
      cover,
      excerpt,
    },
  });
  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.end(image, 'binary');
}

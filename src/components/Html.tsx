import React from 'react';

const Html = ({ children, initialState, scripts }: any) => (
  <html>
    <head>
      <meta charSet='UTF-8' />
      <title>Server Side Rendered React App!!</title>
    </head>
    <body>
      <div id='app' dangerouslySetInnerHTML={{ __html: children }} />

      {initialState && (
        <script
          dangerouslySetInnerHTML={{
            __html: `window.APP_STATE=${JSON.stringify(initialState)}`,
          }}
        />
      )}

      {scripts.map((item: any, index: number) => (
        <script key={index} src={item} />
      ))}
    </body>
  </html>
);

export default Html;

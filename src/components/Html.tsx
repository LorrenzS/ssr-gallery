import React from 'react';

const Html = ({ children, initialState, scripts }: any) => {
  const bodyStyles = {
    margin: '0',
    overflow: 'none',
  };
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <title>Server Side Rendered Gallery App</title>
        <link rel="stylesheet" href="server.css" />
      </head>
      <body style={bodyStyles}>
        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />

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
};

export default Html;

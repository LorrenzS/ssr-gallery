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
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;1,300&display=swap"
          rel="stylesheet"
        ></link>
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

export default ({markup, css}) => {
    return `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          >
          <title>Socialize</title>
          <link rel="preconnect" href="https://fonts.gstatic.com">
          <link rel="preconnect" href="https://fonts.gstatic.com">
          <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap" rel="stylesheet">
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
          <style>
              a{
                text-decoration: none;
                color: #061d95
              }
          </style>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
        </head>
        <body style="margin:0">
          <div id="root">${markup}</div>
          <style id="jss-server-side">${css}</style>
          <script type="text/javascript" src="/dist/bundle.js"></script>
        </body>
      </html>`
}

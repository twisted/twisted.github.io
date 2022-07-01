# Twisted website

Most of the content is hosted in this repository.

The legacy documentation pages for the `/documets/` URL is hosted in a separate
repository at [twisted/documents](https://github.com/twisted/documents).


# Development of the website

You can run a local test server via `$ python3 test_server.py`.
It is designed to replicate the same 404 behaviour as GitHub Pages.


## Tools used

This project is using [Tailwind v3](https://tailwindcss.com/docs/) in the
*404.html* page.
Use the `tw-` prefix with Tailwind CSS classes.

Node/npm is required to update the */build/css/tailwind.css* file.

Use this command when developing for the CSS file to be updated automatically
with your Tailwind classes:

```
npm run dev
```

To minify the file run:
```
npm run build
```

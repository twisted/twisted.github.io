# Twisted website

Most of the content is hosted in this repository.

The legacy documentation pages for the `/documents/` URL is hosted in a separate
repository at [twisted/documents](https://github.com/twisted/documents).


# Development of the website

You can run a local test server via `$ python3 test_server.py`.
It is designed to replicate the same 404 behavior as GitHub Pages.


## Tools

This project is using [Tailwind v3](https://tailwindcss.com/docs/) in the
*404.html* page.
Use the `tw-` prefix with Tailwind CSS classes.

Node/npm is required to update the */build/css/tailwind.css* file.

You can get nodejs on your system via Python as:

```
virtualenv venv
. venv/bin/activate
pip install nodeenv
nodeenv node-env
. node-env/bin/activate
```
## JS development

`jest` is used for the test suite.

```
./node_modules/.bin/jest
```

## CSS development

Use this command when developing for the CSS file to be updated automatically
with your Tailwind classes:

```
npm run dev
```

To minify the file run:

```
npm run build
```

<p align="center">
  <img width="256" alt="vite plugin dart logo" src="./example/favicon.svg" />
</p>
<h1 align="center">vite-plugin-dart</h1>
<h4 align="center">Import .dart files effortlessly.</h4>
<p align="center">
  <br />
    <a href="https://github.com/GeopJr/vite-plugin-dart/blob/main/CODE_OF_CONDUCT.md"><img src="https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-00579c.svg?style=for-the-badge&labelColor=3fc5ff" alt="Code Of Conduct" /></a>
    <!-- <a href="https://github.com/GeopJr/vite-plugin-dart/blob/main/UNLICENSE"><img src="https://img.shields.io/badge/LICENSE-UNLICENSE-00579c.svg?style=for-the-badge&labelColor=3fc5ff" alt="UNLICENSE" /></a> -->
</p>

#

## Install

- Install the plugin:

```bash
pnpm i -D vite-plugin-md # npm, yarn
```

- Install [Dart](https://dart.dev/get-dart)

- Add `vite-plugin-dart` to your `vite.config.js`:

```js
// vite.config.js
import Dart from "vite-plugin-dart";

export default {
  plugins: [Dart()],
};
```

#

## Importing

It's as simple as:

```js
import "./index.dart";
```

All your Pub packages should work as expected! For an example take a look at the [example](./example) folder.

#

## Options

Here's the default options:
```js
const defaultConfig = {
  dart: "dart",
  minify: false,
  "enable-asserts": false,
  verbose: false,
  define: [],
  packages: "",
  "suppress-warnings": false,
  "fatal-warnings": false,
  "suppress-hints": false,
  "enable-diagnostic-colors": false,
  terse: false,
  "show-package-warnings": false,
  csp: false,
  "no-source-maps": false,
  "omit-late-names": false,
  O: 1,
  "omit-implicit-checks": false,
  "trust-primitives": false,
  "lax-runtime-type-to-string": false,
  verbosity: "warning",
  stdio: true,
};
```

For most, you can read their description by running `dart compile js -h -v`.

The ones that are not there are:
```
dart: Dart binary location
verbosity: Verbosity level (all, info, warning, error)
stdio: Whether or not to pass the dart stdio to parent
```

It uses JSDoc, so make sure to follow your IDE's annotations.

#

## Example

See the [example](./example) folder.

#

## How does it work?

Dart can compile to JS using `dart2js`. This plugin compiles your Dart files using that at your OS' tmp folder and then after cleaning the generated sourcemaps, returns it to Vite which imports it.

#

## Contributing

1. Read the [Code of Conduct](https://github.com/GeopJr/vite-plugin-dart/blob/main/CODE_OF_CONDUCT.md)
2. Fork it ( https://github.com/GeopJr/vite-plugin-dart/fork )
3. Create your feature branch (git checkout -b my-new-feature)
4. Commit your changes (git commit -am 'Add some feature')
5. Push to the branch (git push origin my-new-feature)
6. Create a new Pull Request

> Dart and the related logo are trademarks of Google LLC. We are not endorsed by or affiliated with Google LLC.

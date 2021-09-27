import { execSync } from "child_process";
import { readFileSync, mkdtempSync, rmSync } from "fs";
import { tmpdir } from "os";
import { join, parse } from "path";

const fileRegex = /\.(dart)$/;

/**
 * @typedef {Object} Config
 * @property {Number} [O] - Only numbers between <0,1,2,3,4> allowed.
 * @property {Boolean} [csp]
 * @property {String} [dart=dart] - Dart binary path.
 * @property {String[]} [define] - Array items in the "<name>=<value>" fromat each.
 * @property {Boolean} [enable-asserts]
 * @property {Boolean} [enable-diagnostic-colors]
 * @property {Boolean} [fatal-warnings]
 * @property {Boolean} [lax-runtime-type-to-string]
 * @property {Boolean} [minify]
 * @property {Boolean} [no-source-maps]
 * @property {Boolean} [omit-implicit-checks]
 * @property {Boolean} [omit-late-names]
 * @property {String} [packages]
 * @property {Boolean} [show-package-warnings]
 * @property {Boolean} [suppress-hints]
 * @property {Boolean} [suppress-warnings]
 * @property {Boolean} [terse]
 * @property {Boolean} [trust-primitives]
 * @property {Boolean} [verbose]
 * @property {String} [verbosity=warning] - Available: all, error, info, warning.
 * @property {Boolean} [stdio=true] - Whether or not to pass the dart stdio to parent.
 */
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

const nonFlagBool = ["stdio"];

/**
 * @param {Config} options
 */
export default function dartPlugin(options = defaultConfig) {
  options = {...defaultConfig, ...options}
  // Create the dart args
  const execArgs = [];

  if (options.dart.length === 0) options.dart = "dart";
  if (options.packages.length > 0)
    execArgs.push(`--packages=${options.packages}`);
  if (options.O >= 0 && options.O <= 4 && options.O % 1 === 0)
    execArgs.push(`-O${options.O}`);

  execArgs.push(
    `--verbosity=${
      ["info", "error", "warning", "all"].includes(
        options.verbosity.toLowerCase()
      )
        ? options.verbosity.toLowerCase()
        : "warning"
    }`
  );

  execArgs.push(
    ...Object.keys(options)
      .filter((x) => options[x] === true && !nonFlagBool.includes(x))
      .map((x) => `--${x}`)
  );

  if (options.define.length > 0)
    execArgs.push(
      ...options.define
        .filter((x) => x.includes("="))
        .map((x) => `--define=${x}`)
    );

  return {
    name: "vite-plugin-dart",

    transform(_, path) {
      if (!fileRegex.test(path)) return;
      // Create a tmp folder to hold the dart compile
      // output
      const tmpFolder = mkdtempSync(join(tmpdir(), "vite-plugin-dart-"));
      const parsedPath = parse(path);
      const compiledDartFilename = parsedPath.name + ".js";
      const compiledDartOutput = join(tmpFolder, compiledDartFilename);

      // Construct the dart command & execute
      const command = `"${options.dart}" compile js ${execArgs
        .map((x) => `"${x}"`)
        .join(" ")} -o "${compiledDartOutput}" "${path}"`;

      execSync(command, {
        stdio: `${options.stdio === true ? "inherit" : "ignore"}`,
      });

      let compiledDart = readFileSync(compiledDartOutput, "utf8");
      let compiledDartMap = null;

      if (options["no-source-maps"] === false) {
        // Remove the included sourcemap (Vite handles it)
        compiledDart = compiledDart.replace(
          `//# sourceMappingURL=${encodeURIComponent(
            compiledDartFilename
          )}.map`,
          ""
        );
        // Patch the sourcemap so it points to the correct files
        compiledDartMap = JSON.parse(
          readFileSync(compiledDartOutput + ".map", "utf8")
        );
        compiledDartMap.sources = compiledDartMap.sources.map((x) => {
          if (!x.startsWith(".")) return;
          x.replace(/^(?:\.\.(\/|\\))+/, "");
          x = "file://" + x;
        });
        compiledDartMap = JSON.stringify(compiledDartMap);
      }

      // Delete the tmp folder
      rmSync(tmpFolder, { recursive: true, force: true });

      return {
        code: compiledDart,
        map: compiledDartMap,
      };
    },
  };
}

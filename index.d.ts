declare module "vite-plugin-dart" {
  import { Plugin } from "vite";

  interface IConfig {
    dart: string;
    minify: boolean;
    "enable-asserts": boolean;
    verbose: boolean;
    define: Array<string>;
    packages: string;
    "suppress-warnings": boolean;
    "fatal-warnings": boolean;
    "suppress-hints": boolean;
    "enable-diagnostic-colors": boolean;
    terse: boolean;
    "show-package-warnings": boolean;
    csp: boolean;
    "no-source-maps": boolean;
    "omit-late-names": boolean;
    O: 0 | 1 | 2 | 3 | 4;
    "omit-implicit-checks": boolean;
    "trust-primitives": boolean;
    "lax-runtime-type-to-string": boolean;
    verbosity: "warning" | "all" | "error" | "info",
    stdio: boolean;
  }

  export default function Dart(config?: Partial<IConfig>): Plugin;
}
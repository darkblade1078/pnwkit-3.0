import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  outDir: "build",
  target: "es2022",
  dts: true,        // emit build/index.d.ts
  sourcemap: true,
  clean: true,      // wipe build/ before each run
  treeshake: true,
});

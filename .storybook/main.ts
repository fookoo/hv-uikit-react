import { mergeConfig } from "vite";
import { StorybookConfig } from "@storybook/react-vite";
import remarkGfm from "remark-gfm";

import viteConfig from "./vite.config";

export default {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: [
    "../docs/**/*.mdx",
    "../docs/**/*.stories.@(tsx|mdx)",
    "../packages/**/src/**/*.stories.@(ts|tsx|mdx)",
  ],
  core: {
    disableTelemetry: true,
  },
  docs: {
    autodocs: true,
  },
  addons: [
    // "@storybook/addon-actions",
    "@storybook/addon-controls",
    "@storybook/addon-toolbars",
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    __dirname + "/addons/version-selector",
    __dirname + "/addons/theme-selector",
    __dirname + "/addons/mode-selector",
  ],
  features: {
    storyStoreV7: true,
    buildStoriesJson: true,
  },
  staticDirs: [
    "./assets",
    {
      from: "../packages/icons/sprites/icons.svg",
      to: "assets/icons.svg",
    },
    {
      from: "../packages/icons/sprites/pictograms.svg",
      to: "assets/pictograms.svg",
    },
  ],
  async viteFinal(config) {
    return mergeConfig(config, viteConfig);
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      tsconfigPath: "../tsconfig.json",
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
    },
  },
} as StorybookConfig;

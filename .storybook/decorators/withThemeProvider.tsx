import { useState, useEffect, useRef } from "react";

import { addons } from "@storybook/addons";
import { Global } from "@storybook/theming";
import { Decorator } from "@storybook/react";

import { HvProvider } from "@hitachivantara/uikit-react-core";
import { HvVizProvider } from "@hitachivantara/uikit-react-viz";
import { ds3, ds5 } from "@hitachivantara/uikit-styles";

import { getStoryStyles } from "../theme/styles/story";
import { ADDON_EVENT } from "../addons/theme-selector/constants";
import { getLocalTheme } from "../addons/theme-selector/utils";

/** Return a `ref` that adds/removes `dark` class variant depending on `mode` */
const useDarkClass = <T extends HTMLElement = HTMLDivElement>(mode: string) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (mode === "wicked") {
      ref.current?.classList.add("dark");
    } else {
      ref.current?.classList.remove("dark");
    }
  }, [mode]);

  return ref;
};

const ThemeDecorator: Decorator = (story) => {
  const initialTheme = getLocalTheme();

  const [selectedTheme, setSelectedTheme] = useState(initialTheme);

  const [theme, mode] = selectedTheme?.split("-") || ["ds5", "dawn"];
  const base = theme === "ds3" ? ds3 : ds5;

  const containerRef = useDarkClass(mode);

  const storyStyles = getStoryStyles(base.colors.modes[mode].atmo2);

  const switchTheme = ({ name }: Theme) => {
    setSelectedTheme(name);
  };

  useEffect(() => {
    const channel = addons.getChannel();
    channel.on(ADDON_EVENT, switchTheme);

    return () => {
      channel.off(ADDON_EVENT, switchTheme);
    };
  }, []);

  return (
    <>
      <Global styles={storyStyles} />
      <HvProvider
        classNameKey="hv-story"
        cssTheme="scoped"
        themes={[ds5, ds3]}
        theme={theme}
        colorMode={mode}
      >
        <HvVizProvider>
          <div
            ref={containerRef}
            className="hv-story-sample"
            style={{ padding: 20 }}
          >
            {story()}
          </div>
        </HvVizProvider>
      </HvProvider>
    </>
  );
};

export default ThemeDecorator;

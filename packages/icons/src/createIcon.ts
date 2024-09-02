import { h, VNode, type FunctionalComponent } from "vue";
import type { VKIconProps } from "./types";

const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
  fill: "currentColor",
};

type IconContent = {
  name: string;
  attributes: Record<string, string>;
  children: IconContent[];
};

type CreateIconOptions = {
  name: string;
  content: IconContent[];
  width: number;
  height: number;
  viewBox: string;
};

const recursiveRender = (content: IconContent[]): VNode[] => {
  return content.map((el) =>
    h(el.name, el.attributes, recursiveRender(el.children))
  );
};

const createIcon = (
  options: CreateIconOptions
): FunctionalComponent<VKIconProps> => {
  return (props, { slots }) => {
    const width = props.size || props.width || options.width;
    const height = props.size || props.height || options.height;

    return h(
      "svg",
      {
        ...defaultAttributes,
        width,
        height,
        class: [
          "vkuiIcon",
          `vkuiIcon--${props.size}`,
          `vkuiIcon--w-${width}`,
          `vkuiIcon--h-${height}`,
          `vkuiIcon--${options.name}`,
        ],
        viewBox: options.viewBox,
      },
      [
        ...recursiveRender(options.content),
        ...(slots.default ? [slots.default()] : []),
      ]
    );
  };
};

export default createIcon;

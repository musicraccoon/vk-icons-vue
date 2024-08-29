import { h, type FunctionalComponent } from "vue";
import type { VKIconProps } from "./types";

const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
  fill: "currentColor",
};

type CreateIconOptions = {
  name: string;
  content: string;
  width: number;
  height: number;
  viewBox: string;
};

const createIcon = (
  options: CreateIconOptions
): FunctionalComponent<VKIconProps> => {
  return (props) => {
    const width = props.size || props.width || options.width;
    const height = props.size || props.height || options.height;

    return h("svg", {
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
      innerHTML: options.content,
    });
  };
};

export default createIcon;

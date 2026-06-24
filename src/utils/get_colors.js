import { colors } from "../constants/global";

const selectColor = (color) => {
  const findColor = colors.find((c) => c.value === color);

  return findColor?.hex || "red";
};

export const pickColor = (color) => {
  const colorArr = color.trim().split("/");

  if (Array.isArray(colorArr)) {
    const selectedColor = selectColor(colorArr[0]);

    return selectedColor;
  }

  return selectColor(color);
};

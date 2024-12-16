const colors = {
  blue: 'bg-blue-500',
  red: 'bg-red-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  pink: 'bg-pink-500',
  orange: 'bg-orange-500',
  gray: 'bg-gray-500',
  white: 'bg-white',
  black: 'bg-black',
  "fiester red": "bg-[#dd1923]",
  purple: "bg-purple-500",
  neutral: "bg-gray-500",
  "autumn glory": "bg-[#ff8813]",
  "navy-blue": "bg-[#000080]"



};
const selectColor = (color) => colors[color] || 'bg-purple-500';

export const pickColor = (color) => {
  const splitColor = (color) => {
    const colorArr = color.split('/');
    if (colorArr.length == 1) {
      return [selectColor(colorArr[0])];
    }

    const color1 = selectColor(colorArr[0]);
    const color2 = selectColor(colorArr[1]);

    return [color1, color2];
  };

  return splitColor(color);
};

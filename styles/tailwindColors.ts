const tailwindConfig = require("../tailwind.config");

const colors = {
  ...tailwindConfig.theme.colors,
  ...tailwindConfig.theme.extend.colors,
};

export default colors;

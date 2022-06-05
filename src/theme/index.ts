import { extendTheme } from "@chakra-ui/react";

// Component style overrides
import Button from "./components/button-config";
import IconButton from "./components/icon-button";
import ImageConfig from "./components/image-config";
import Input from "./components/input-config";
import colors from "./foundations/colors";
// Foundational style overrides
import config from "./foundations/config";
import fonts from "./foundations/fonts";
import shadows from "./foundations/shadows";
// Global style overrides
import styles from "./style";

const customTheme = {
  styles,
  fonts,
  config,
  colors,
  shadows,
  components: {
    Button,
    IconButton,
    Input,
    ImageConfig,
  },
};

export default extendTheme(customTheme);

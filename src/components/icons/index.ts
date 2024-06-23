import { ComponentProps } from "react";

import GoogleIcon from "./google";
import { BrandIcons } from "./brand-icons";
import { countryFlag } from "./country-flag";

export interface IconProps extends ComponentProps<"svg"> {
  size?: number;
  width?: number;
  height?: number;
}

export { GoogleIcon, BrandIcons, countryFlag };

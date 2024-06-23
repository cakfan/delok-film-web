import { countries } from "country-data-list";
import ReactCountryFlag from "react-country-flag";

export const countryFlag = (countryName: string) => {
  const country = countries.all.find(
    (c) => c.name.toLowerCase() === countryName.toLowerCase(),
  );
  return country ? (
    <ReactCountryFlag
      className="emojiFlag m-0 h-4"
      countryCode={country.alpha2}
      svg
      // style={{
      //   width: "2em",
      //   height: "1.5em",
      // }}
      title={country.alpha2}
    />
  ) : (
    <span>NA</span>
  );
};

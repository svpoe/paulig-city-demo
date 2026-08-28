import {Img, staticFile} from "remotion";
import type {City} from "../data/cities";

type CityCardProps = {
  city: City;
};

export const CityCard = ({city}: CityCardProps) => {
  return (
    <div
      style={{
        width: 620,
        height: 840,
        position: "relative",
        overflow: "hidden",
        borderRadius: 40,
        backgroundColor: city.color,
      }}
    >
      <Img
        src={staticFile(city.packageSrc)}
        style={{
          position: "absolute",
          height: "68%",
          left: "50%",
          top: "44%",
          transform: "translate(-50%, -50%)",
          objectFit: "contain",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 50,
          width: "100%",
          textAlign: "center",
          color: city.textColor,
        }}
      >
        <div
          style={{
            fontSize: 54,
            fontWeight: 800,
          }}
        >
          {city.city}
        </div>

        <div
          style={{
            fontSize: 24,
            marginTop: 8,
          }}
        >
          {city.roast}
        </div>
      </div>
    </div>
  );
};
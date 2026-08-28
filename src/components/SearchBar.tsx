import {Img, staticFile} from "remotion";

export const SearchBar = () => {
  return (
    <Img
      src={staticFile("icons/search_bar.png")}
      style={{
        position: "absolute",

        // Roughly top 15% of vertical frame
        top: "1%",

        // Center horizontally
        left: "50%",

        // Search bar width
        width: "115%",

        transform: "translateX(-50%)",

        objectFit: "contain",

        // Make sure it stays above background content
        zIndex: 20,
      }}
    />
  );
};
import {Img, staticFile} from "remotion";

export const SearchBar = () => {
  return (
    <>
      {/* Browser/header background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "15%",
          backgroundColor: "#E8E4DF",
          zIndex: 10,
        }}
      />

      {/* Search bar */}
      <Img
        src={staticFile("icons/searchbar.png")}
        style={{
          position: "absolute",
          top: "3%",
          left: "50%",
          width: "100%",
          transform: "translateX(-50%)",
          objectFit: "contain",
          zIndex: 20,
        }}
      />

      {/* K-Ruoka logo */}
      <Img
        src={staticFile("icons/k-ruoka-logo.png")}
        style={{
          position: "absolute",
          top: "2%",
          right: "4%",
          width: 160,
          objectFit: "contain",
          zIndex: 30,
        }}
      />
    </>
  );
};
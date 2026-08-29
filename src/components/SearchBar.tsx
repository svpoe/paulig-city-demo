import {Img, staticFile} from "remotion";

export const SearchBar = () => {
  return (
    <>
      {/* Gray browser/header area */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "15%",
        //   backgroundColor: "#d9d9d9",
        //   backgroundColor: "#E8E4DF",
          backgroundColor: "#e4ded5",
          zIndex: 10,
        }}
      />

      {/* Search bar */}
      <Img
        src={staticFile("icons/searchbar.png")}
        style={{
          position: "absolute",
          top: "4%",
          left: "50%",
          width: "115%",
          transform: "translateX(-50%)",
          objectFit: "contain",
          zIndex: 20,
        }}
      />
    </>
  );
};
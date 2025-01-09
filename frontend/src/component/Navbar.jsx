import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    // Redirect user to the login page
    navigate("/");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div
      style={{
        height: "80px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#333333", // Spotify's signature green
        padding: "0 20px",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          color: "white",
          fontWeight: "600",
          fontSize: "30px",
          margin: 0,
        }}
      >
        GeoLocator
      </h1>

      {isLoggedIn && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            borderRadius="30px"
            backgroundColor="white"
            color="#1A3D3B" // Matching button color to Spotify green
            onClick={handleLogout}
            size="sm"
            _hover={{
              backgroundColor: "#1DB954", // Hover effect
              color: "white",
            }}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;

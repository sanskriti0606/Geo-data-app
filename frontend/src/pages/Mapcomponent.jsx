import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MapContainer, TileLayer, FeatureGroup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { Button, Heading } from "@chakra-ui/react";
import { EditControl } from "react-leaflet-draw";
import axios from "axios";
import * as tj from "@tmcw/togeojson"; // Convert KML to GeoJSON
import GeoTIFF from "geotiff"; // For TIFF file parsing

const Mapcomponent = () => {
  const [geoData, setGeoData] = useState(null);
  const [drawnFIG, setDrawnFIG] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = async () => {
      const fileContent = reader.result;

      if (file.name.endsWith(".geojson")) {
        const parsedData = JSON.parse(fileContent);
        setGeoData(parsedData);
      } else if (file.name.endsWith(".kml")) {
        const kml = new DOMParser().parseFromString(fileContent, "text/xml");
        const convertedGeoJSON = tj.kml(kml);
        setGeoData(convertedGeoJSON);
      } else if (file.name.endsWith(".tiff") || file.name.endsWith(".tif")) {
        try {
          const tiff = await GeoTIFF.fromArrayBuffer(fileContent);
          const image = await tiff.getImage();
          const raster = await image.readRasters();
          console.log("TIFF raster data:", raster);
          alert("TIFF file uploaded successfully!");
        } catch (error) {
          console.error("Error processing TIFF file:", error);
        }
      } else {
        console.error("Unsupported file format");
      }
    };

    if (file.name.endsWith(".tiff") || file.name.endsWith(".tif")) {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleShape = (e) => {
    const layer = e.layer;
    setDrawnFIG(layer.toGeoJSON());
    setGeoData(layer.toGeoJSON());
  };

  const saveGeoJSON = async () => {
    const token = localStorage.getItem("token");
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.post(
        `http://localhost:5000/users/saveGeoJSON/${userId}`,
        { GeoJSONData: geoData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("GeoJSON data saved successfully!", response.data);
      setDrawnFIG(null);
      setGeoData(null);
    } catch (error) {
      console.error("Error saving GeoJSON data:", error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#191414", // Spotify-like background
      }}
    >
      <div
        style={{
          width: "100%",
          height: "700px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 40px 10px 10px",
        }}
      >
        <div
          style={{
            justifyContent: "center",
            width: "30%",
            height: "600px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            textAlign: "center",
            backgroundColor: "#121212", // Dark background for the file upload area
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <Heading color="white">Drop GeoJSON, KML, or TIFF file</Heading>
          <form>
            <div
              {...getRootProps()}
              style={{
                width: "100%",
                textAlign: "center",
                padding: "10px",
                border: "2px dashed #2e94b9", // Spotify-like border color
                borderRadius: "8px",
                color: "#2e94b9",
                cursor: "pointer",
              }}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p style={{ color: "#2e94b9" }}>Drop the file here ...</p>
              ) : (
                <p>Drag 'n' drop a GeoJSON, KML, or TIFF file here, or click to select files</p>
              )}
            </div>
          </form>
        </div>

        <div
          style={{
            boxShadow: "1px 7px 9px 1px",
            borderRadius: "10px",
            width: "70%",
            height: "600px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#121212", // Dark map background
          }}
        >
          <MapContainer
            center={[21.0, 78.0]}
            zoom={2.1}
            style={{ height: "100%", width: "100%", borderRadius: "10px" }}
          >
            <FeatureGroup>
              <EditControl position="topright" onCreated={handleShape} />
              {geoData && <GeoJSON data={geoData} />}
            </FeatureGroup>

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </MapContainer>
        </div>
      </div>

      {geoData && (
        <div
          style={{
            backgroundColor: "#333333", // Spotify-like blue
            borderRadius: "10px",
            width: "96%",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            padding: "20px",
            color: "white",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <h2 style={{ margin: "0" }}>Shape Coordinates:</h2>
            <p style={{ margin: "0", marginLeft: "10px" }}>
              {JSON.stringify(drawnFIG?.geometry?.coordinates, null, 2)}
            </p>
          </div>
          <div>
            <Button
              onClick={saveGeoJSON}
              w="100px"
              bg="white"
              color="#2e94b9"
              borderRadius="5px"
              _hover={{
                bg: "#2e94b9",
                color: "white",
              }}
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mapcomponent;

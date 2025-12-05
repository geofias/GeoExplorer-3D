import { useEffect, useRef, useState, useCallback } from "react";
import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

// Global variable to store the reference to the GeoJsonDataSource
let geoJsonDataSource = null;

function CesiumViewer() {
  const viewerRef = useRef(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("All"); // State for the selected country

  // --- Entity Filtering Logic (Memoized with useCallback) ---
  const filterEntities = useCallback((country) => {
    if (!geoJsonDataSource) return;

    const viewer = geoJsonDataSource._viewer;
    const entities = geoJsonDataSource.entities.values;
    const filteredPositions = [];

    for (let entity of entities) {
      // Get the value of the 'country' property
      const entityCountry = entity.properties.country?.getValue();
      
      // Logic to show sites matching the selected country, including multi-country entries (e.g., Nepal/China)
      const shouldShow = 
        country === "All" || 
        entityCountry === country || 
        (entityCountry && entityCountry.includes('/') && entityCountry.includes(country));
      
      entity.show = shouldShow;
      
      if (shouldShow && entity.position) {
          filteredPositions.push(entity.position.getValue());
      }
    }
    
    // --- Logic to "Fly" to the Filtered Extent ---
    if (country !== "All" && filteredPositions.length > 0 && viewer) {
        // Calculate the bounding sphere of the visible points and fly to it
        const boundingSphere = Cesium.BoundingSphere.fromPoints(filteredPositions);
        viewer.camera.flyToBoundingSphere(boundingSphere, {
            duration: 1.5
        });
    } else if (country === "All" && geoJsonDataSource) {
        // Fly back to the global extent of all data
        if (viewer) {
            viewer.flyTo(geoJsonDataSource);
        }
    }
  }, []);

  // --- Cesium Viewer Initialization and Data Loading ---
  useEffect(() => {
    Cesium.Ion.defaultAccessToken =
      import.meta.env.VITE_CESIUM_ION_TOKEN || "";

    const viewer = new Cesium.Viewer(viewerRef.current, {
      // Options to disable widgets and use default providers
      animation: false,
      timeline: false,
      baseLayerPicker: false,
      geocoder: false,
      sceneModePicker: false,
      homeButton: false,
      navigationHelpButton: false,
    });

    // Load GeoJSON
    Cesium.GeoJsonDataSource.load("/data/sites.geojson", {
      clampToGround: true
    }).then((dataSource) => {
      viewer.dataSources.add(dataSource);
      viewer.flyTo(dataSource);
      
      // Assign the reference to the GeoJsonDataSource
      geoJsonDataSource = dataSource;
      // Attach the viewer to the dataSource for use in filterEntities
      geoJsonDataSource._viewer = viewer; 

      const entities = dataSource.entities.values;
      const uniqueCountries = new Set(["All"]); // Start with the 'All' option
      
      for (let entity of entities) {
        const countryName = entity.properties.country?.getValue();
        
        if (countryName) {
            // Handle multi-country sites (e.g., Nepal/China)
            const parts = countryName.split('/');
            parts.forEach(part => uniqueCountries.add(part.trim()));
        }

        // Billboard and Label configuration
        entity.billboard = new Cesium.BillboardGraphics({
          image: "/data/marker.png",
          scale: 0.7
        });

        entity.label = new Cesium.LabelGraphics({
          text: entity.properties.name.getValue(),
          font: "14px sans-serif",
          pixelOffset: new Cesium.Cartesian2(0, -40)
        });
      }
      
      // Convert Set to Array, filter empty strings, and sort
      const sortedCountries = Array.from(uniqueCountries)
        .filter(c => c.length > 0)
        .sort((a, b) => {
            if (a === "All") return -1; // Ensure 'All' comes first
            if (b === "All") return 1;
            return a.localeCompare(b);
        });
        
      setCountries(sortedCountries);
    });
    
    // Cesium cleanup function
    return () => {
        viewer.destroy();
    }
  }, []);

  // --- Apply Filter when State Changes ---
  useEffect(() => {
    // This effect runs every time selectedCountry changes.
    filterEntities(selectedCountry);
  }, [selectedCountry, filterEntities]);


  // --- Select Change Handler ---
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };
  
  // --- UI Rendering (Sidebar) ---
  return (
    <>
      <div 
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 10,
          padding: "15px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "5px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)"
        }}
      >
        <h3>🌍 Filter Geological Sites</h3>
        <label htmlFor="country-select" style={{ display: "block", marginBottom: "5px" }}>
            Select Country:
        </label>
        <select 
          id="country-select" 
          value={selectedCountry} 
          onChange={handleCountryChange}
          style={{ padding: "8px", borderRadius: "3px", border: "1px solid #ccc", minWidth: "200px" }}
        >
          {countries.map(country => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div ref={viewerRef} style={{ width: "100%", height: "100vh" }} />
    </>
  );
}

export default CesiumViewer;
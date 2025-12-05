import { useEffect, useRef } from "react";
import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

function CesiumViewer() {
  const viewerRef = useRef(null);

  useEffect(() => {
    Cesium.Ion.defaultAccessToken =
      import.meta.env.VITE_CESIUM_ION_TOKEN || "";

    const viewer = new Cesium.Viewer(viewerRef.current, {

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

      const entities = dataSource.entities.values;

      for (let entity of entities) {
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
    });
  }, []);

  return <div ref={viewerRef} style={{ width: "100%", height: "100vh" }} />;
}

export default CesiumViewer;

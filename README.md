# GeoExplorer 3D: An Interactive Guide to the World's Geological Wonders

## 🌐 Project Overview
GeoExplorer 3D is a web-based interactive application built with **CesiumJS** and **React** that showcases some of the world’s most remarkable geological-natural sites. It serves as both an educational and inspirational platform for geoscientists, travelers, and enthusiasts interested in Earth's geological diversity.
![Alt Text](geoexplorer/images/thumbnails/geoexplorer_app.png)

## 🎯 Key Features
- **3D Globe Visualization** using CesiumJS
- **Sidebar with Filter by Country** to explore geological sites by region
- **Interactive Site List** that triggers camera flights to selected locations
- **Popups with Descriptive Information and Images** for each site
- **Fully Responsive UI** suitable for desktops and tablets

## 🧪 Technologies Used
- [React](https://reactjs.org/) (Frontend UI)
- [CesiumJS](https://cesium.com/platform/cesiumjs/) (3D geospatial rendering)
- GeoJSON (data format for geospatial features)
- GitHub Pages (deployment)

## 🌐 Live Demo
> 🔗 [View Live App](https://celadon-quokka-15feef.netlify.app/)

## 📦 Deployment
The app is deployed using **GitHub Pages**.

### 🔧 Build & Deploy
```bash
npm install
npm run deploy
```
Make sure `package.json` includes:
```json
"homepage": "https://your-username.github.io/geoexplorer-3d",
```
And the scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

## 📍 How It Works
- When the app loads, it fetches the GeoJSON file from `/data/geological_sites.geojson`.
- Sites are listed in the sidebar, with country filter support.
- Selecting a site animates the camera to fly to the location.
- A popup appears showing details and an image for each site.

## 🏕 Example Sites Included
- Grand Canyon (USA)
- Mount Everest (Nepal/China)
- Uluru (Australia)
- Mount Etna (Italy)
- Salar de Uyuni (Bolivia)
- And many more… (20 total; For now...)

## 👨‍💻 Author
**Tamir Chong**    
📫 [tamir-chong@hotmail.com](mailto:tamir-chong@hotmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/tamirchong/)  

---

> Made with 🌋 by a geologist who codes. GeoExplorer is designed as a showcase of geospatial visualization, geological knowledge, and web mapping skillset.

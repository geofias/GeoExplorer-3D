# GeoExplorer 3D: An Interactive Guide to the World's Geological Wonders

## 🌐 Project Overview
GeoExplorer 3D is an interactive geospatial visualization platform that displays major geological sites around the world using a fully 3D virtual globe powered by CesiumJS.
The project integrates structured GeoJSON data, rendering each site as an interactive point with geologic, geographic, and visiting information.

The purpose of this project is to provide an immersive scientific visualization tool that allows users to:
- Explore geological sites in a realistic 3D environment.
- View detailed geological descriptions and site metadata.
- Interact with a navigable globe and fly to specific locations.
- Present global geological information in an educational and intuitive way.

![Alt Text](./geoexplorer_app.png)

## 🛰️ Key Technologies
| Technology  | Role |
|-------------|------|
| **React**   | UI framework and component architecture |
| **CesiumJS** | 3D globe rendering and geospatial engine |
| **Resium**  | React bindings for CesiumJS |
| **Vite**    | Dev server and bundler |
| **GeoJSON** | Data format for site locations and attributes |
| **Netlify** | Deployment and continuous delivery |

## 🎯 Features
✔️ 3D Earth Visualization
Full CesiumJS globe with dynamic camera movement and smooth interaction.

✔️ GeoJSON Integration
Loads and visualizes geological site data stored in:
```bash
public/data/geological_sites.geojson
```

✔️ Interactive Site Information
Clicking on a point displays:
- Site name
- Country
- Geological type
- Rock type
- Geological age
- Detailed description
- Best time to visit
- Accessibility
- Suggested activities

✔️ Camera FlyTo
Automatically animates the globe to center on the selected site.

✔️ Works Offline (after build)
Because CesiumJS assets are stored locally in public/cesium/.

✔️ Deployed on Netlify
Automatic deployment from GitHub.

## 🛠️ Local Installation & Development
1. Clone the repository
```bash
git clone https://github.com/<username>/GeoExplorer-3D.git
cd GeoExplorer-3D
```
2. Install dependencies
```bash
npm install
```
3. Start development server
```bash
npm run dev
```

## 📦 Build for Production
```bash
npm run build
```
Output will be placed in:
```bash
/dist
```

## 🌍 Deploying to Netlify
1. Create a Netlify account
2. Connect your GitHub repo
3. Configure:

| Setting  | Value |
|----------|-------|
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |

Netlify automatically detects Vite + React projects.

Your current deployment:
> 🔗 [View Live App](https://celadon-quokka-15feef.netlify.app/)

## 👨‍💻 Author
**Tamir Chong**
**Geological Engineer • GIS Analyst**
📫 [tamir-chong@hotmail.com](mailto:tamir-chong@hotmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/tamirchong/)  

---

> Made with 🌋 by a geologist who codes. GeoExplorer is designed as a showcase of geospatial visualization, geological knowledge, and web mapping skillset.

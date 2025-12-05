const fs = require('fs')
const path = require('path')
const cesium = require('cesium')


const dest = path.join(__dirname, '..', 'public', 'cesium')
if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true })


// Copy only required assets (you may adjust paths based on installed cesium version)
const cesiumSource = path.dirname(require.resolve('cesium/package.json'))
const pathsToCopy = ['Build/Cesium', 'Build/CesiumUnminified']


pathsToCopy.forEach((p) => {
const src = path.join(cesiumSource, p)
// This is a simplified copy; in real use you might use a lib like ncp or fs-extra
console.log('Please copy Cesium Build folder to public/cesium manually if necessary:', src)
})


console.log('If Cesium assets are missing, run: npm run prepare-cesium and copy the build files to public/cesium')
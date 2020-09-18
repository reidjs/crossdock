import React, { useEffect, useState } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const MapContainer = (props) => {
  const [center, setCenter] = useState([0, 0])

  useEffect(() => {
    if (!props.center) return
    if (props.center[0] !== center[0] || props.center[1] !== center[1]) {
      console.log(props.center)
      setCenter([props.center[0], props.center[1]])
    }
  }, [center, props.center])
  // console.log('props.markers', props.markers)
  // TODO: makes more sense to use lat/long as key
  const markers = props.markers.map((m, idx) => {
    // console.log('m', m)
    return (
    <Marker key={idx} position={[m[0], m[1]]}>
      <Popup>
        Marker
      </Popup>
    </Marker>
    )
  })
  return (
    <div className="z-10">
      {typeof window !== 'undefined' &&
        <Map style={{ zIndex: '10' }} center={props.center} zoom={13}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers}
          {/* <Marker position={props.center}>
            <Popup>
              Marker <br /> <span onClick={() => console.log('hi')}></span>
            </Popup>
          </Marker> */}
        </Map>
      }
    </div>
  )
}

export default MapContainer
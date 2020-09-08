import React, { useEffect, useState } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import './map.css'
const MapContainer = (props) => {
  const [center, setCenter] = useState([0, 0])

  useEffect(() => {
    if (props.center[0] !== center[0] || props.center[1] !== center[1]) {
      console.log(props.center)
      setCenter([props.center[0], props.center[1]])
    }
  }, [center, props.center])


  return (
    <div>
      {typeof window !== 'undefined' &&
        <Map center={props.center} zoom={13}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={props.center}>
            <Popup>
              A warehouse <br /> Easily customizable.
          </Popup>
          </Marker>
        </Map>
      }
    </div>
  )
}

export default MapContainer
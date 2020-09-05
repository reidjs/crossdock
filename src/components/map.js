import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import './map.css'
const MapContainer = ({ options }) => {
  if (typeof window == 'undefined') {
    return (
      <div></div>
    )
  }

  return (
    <Map center={[51.505, -0.09]} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A warehouse <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
  )
}

export default MapContainer
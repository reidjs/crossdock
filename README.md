## Development

TODO:
header search
- should open drawer that has quick links to 
  - account page > /account
  - find warehouse > find warehouse
  - find dock > find warehouse
  - payment info > acct page
  - support > /resources


index page
- add signup form
- change blog post images

find-warehouse page
- Login information should show up on the first step
- locations should show up on map & link to directions through google/apple maps
- enable back/forward button functionality 
- websockets to handle switchboard functionality
  - push info 
  - backend UI to see all websocket connections and user info 
  - 

- 

Requires crossdock-server for payment stuff
```
users: {
  uid,
  email,
  name,
  truckIds: [tid1, tid2]
}
trucks: {
  tid,
  licensePlate,
  make,
  model,
}
warehouse: {
  wid,
  address,
  hours,
}
```

tailwind breakpoints
'sm': '640px',
// => @media (min-width: 640px) { ... }

'md': '768px',
// => @media (min-width: 768px) { ... }

'lg': '1024px',
// => @media (min-width: 1024px) { ... }

'xl': '1280px',
// => @media (min-width: 1280px) { ... }


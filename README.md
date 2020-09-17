# CrossDock
[Live Website (https://crossdock.me)](https://crossdock.me)

## About
Built over two weeks for the [GS-1 Flexible and Resilient: Future Proofing the Supply Chain Hackathon](https://gs1us-futureproofhack-platform.bemyapp.com/)

[Started September 5th, 2020](https://github.com/reidjs/crossdock/commit/6a3fa4a1b4d66fa3dd32a2a3086792e75e9fd3b3)

By [Reid Sherman](https://www.linkedin.com/in/reidsherman/) and [Stephen Schlecht](https://www.linkedin.com/in/stephenschlecht/)

## How to Use

## Development

`yarn install`  
`npm start`  
Requires crossdock-server running (separate repo) for payment processing.

## Deployment
Build site and rsync to server:  
`npm run deploy`

## Dependencies

React  
*Web Framework*

Gatsby  
*Server side renderer*  

TailwindCSS  
*Design Library*

Node.JS with Express  
*Server language*

NGINX  
*Web Server and Reverse Proxy*

Stripe  
*Payment Processor*

Leaflet and OpenStreetMaps  
*Mapping Library*


### TODO
- warehouse-dashboard
  - fix glitchy edit BOL table
  - back/forward button browser history

- header
- search
  - should open drawer that has quick links to 
    - account page > /account
    - find warehouse > find warehouse
    - find dock > find warehouse
    - payment info > acct page
    - support > /resources

- login page
  - add facebook/etc login

- index
  - blog links should actually link somehwere

find-warehouse page
- Login information should show up on the first step
- locations should show up on map & link to directions through google/apple maps
- enable back/forward button functionality 
- websockets to handle switchboard functionality
  - push info 
  - backend UI to see all websocket connections and user info 
  - 

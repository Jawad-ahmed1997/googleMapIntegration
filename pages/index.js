import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, useLoadScript,InfoWindow  } from "@react-google-maps/api";
import { fetchNearbyPlaces,fetchselectedAddress } from '../src/app/utils/api/index';
import {car,bike} from '../assets/index'



const AdminMap = () => {


  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  const [ridersCurrLoc, setRidersCurrLoc] = useState([]);
  // const [location, setLocation] = useState([]);

  
  const [selectedMarker, setSelectedMarker] = useState(null);

  const onMarkerMouseOver = (marker) => {
    setSelectedMarker(marker);
  };

  const onMarkerMouseOut = () => {
    setSelectedMarker(null);
  };
  const onInfoWindowMouseOut = () => {
    setSelectedMarker(null);
  };

  const iconBase =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
    const icons = {
      // car: <div style={{width:"50px",height:"50px"}}><Image style={{height:'50px',width:'50px'}} src={car}/></div>, 
      car: car,
      bike: bike, 
    };

  const riders = [
    {
      location: {lat: 24.90137193213271,lng: 66.9669267883359 + 0.00349},
      type: 'bike',
    },
    {
      location: {lat: 24.90237193213271,lng: 66.9669267883359 + 0.00549},
      type: 'car',
    },
    {
      location: {lat: 24.90337193213271,lng: 66.9669267883359 + 0.00349},
      type: 'car',
    },
    {
      location: {lat: 24.90437193213271,lng: 66.9669267883359 + 0.00549},
      type: 'bike',
    },
    {
      location: {lat: 24.90537193213271,lng: 66.9669267883359 + 0.00349},
      type: 'car',
    },
    {
      location: {lat: 24.90637193213271,lng: 66.9669267883359 + 0.00549},
      type: 'bike',
    },
    {
      location: {lat: 24.90756783324362,lng: 66.9669267883359},
      type: 'car',
    },
    {
      location: {lat: 24.90837193213271,lng: 66.9669267883359 + 0.00449},
      type: 'bike',
    },
    {
      location: {lat: 24.90937193213271,lng: 66.9669267883359 + 0.00749},
      type: 'car',
    },
    {
      location: {lat: 24.90937193213271,lng: 66.9669267883359 + 0.00949},
      type: 'bike',
    },
    {
      location: {lat: 24.90837193213271,lng: 66.9669267883359 + 0.00149},
      type: 'bike',
    },
  ];
  // function getLocation(cb) {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(cb);
  //   } else {
  //     x.innerHTML = "Geolocation is not supported by this browser.";
  //   }
  // }

  // const getAllRiders = async () => {
  //   try {
  //     const res = await fetchNearbyPlaces( 10000,'restaurant',apiKey);
  //     // setPlaces(res.data.results);
  //     console.log(res.data.results)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
        
  // useEffect(()=>{
  //   getAllRiders();
  //   // getLocation((position)=>{
  //   //   setLocation(`${position.coords.latitude}%${position.coords.longitude}`)
  //   // })

  // },[])
  // const infoWindow = new InfoWindow({
  //   content: (marker) => {
  //     return (
  //       <div>
  //         <h3>{marker.title}</h3>
  //         <p>This is the current location of the rider.</p>
  //       </div>
  //     );
  //   },
  // });

  const getReverseGeocode =async(riders)=>{
   
    const results = [];
    for(const ridertitle of riders){
      const {lat,lng}=ridertitle.location
     
    try{
      const res =await fetchselectedAddress(apiKey,lat,lng) 
     results.push({formatted_address:res.data.results[0].formatted_address});
     
    }
    catch(e){
      console.log(e)
    }
    
  }
  setRidersCurrLoc(results);
  }
useEffect(() => {
  // getAllRiders();
  getReverseGeocode(riders);
}, [])


const infoWindow = new InfoWindow();
  // const locations = riders.map((place) => (place));
  const locations = riders.map((place,index) => ({
    ...place,
    icon: icons[place.type],
    title: ridersCurrLoc[index]?.formatted_address,
    
}));
  
  const center = {lat: 24.90737193213271, lng: 66.9669267883356 };

  return (
    <div>
      <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        center={center}
        zoom={14}
        mapContainerStyle={{ width: '100%', height: '500px' }}
      >
        {locations.map((item, index) => (
          <Marker key={index} position={item.location} icon={item.icon.src} 
          onMouseOver={() => onMarkerMouseOver(item)}
          onMouseOut={()=>onMarkerMouseOut()}
          />
        ))}
        {selectedMarker && (
            <InfoWindow
              position={selectedMarker.location}
              onCloseClick={onInfoWindowMouseOut}
            >
              <div style={{height:"auto" ,width:"auto"}}>
                <h3>{selectedMarker.title}</h3>
                <p>This is the current location of the rider.</p>
              </div>
            </InfoWindow>
          )}
      </GoogleMap>
      </LoadScript>
     
    </div>
  );
};

export default AdminMap;

  

  
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, useLoadScript } from "@react-google-maps/api";
import { fetchNearbyPlaces } from '../src/app/utils/api/index';
import { process } from 'process';
import {car,bike} from '../assets/index'
import Image from 'next/image';
import { inherits } from 'util';

const AdminMap = () => {


  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  const [places, setPlaces] = useState([]);
  // const [location, setLocation] = useState([]);
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
      type: 'car',
    },
    {
      location: {lat: 24.90237193213271,lng: 66.9669267883359 + 0.00549},
      type: 'bike',
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
  //     setPlaces(res.data.results);
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

  // const locations = riders.map((place) => (place));
  const locations = riders.map((place) => ({
    ...place,
    icon: icons[place.type]
  }));
  const center = {lat: 24.90737193213271, lng: 66.9669267883356 };

  return (
    <div>
      <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        center={center}
        zoom={14}
        mapContainerStyle={{ width: '400px', height: '400px' }}
      >
        {locations.map((item, index) => (
          <Marker key={index} position={item.location} icon={item.icon.src}  />
        ))}
      </GoogleMap>
      </LoadScript>
     
    </div>
  );
};

export default AdminMap;

  

  
import { useState, useEffect } from "react";
import axios from "axios";
import {
  twoline2satrec,
  propagate,
  gstime,
  eciToGeodetic,
  degreesLat,
  degreesLong,
} from "satellite.js";

function Tracker() {
  const [data, setData] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://tle.ivanstanojevic.me/api/tle/25544"
        );
        const responseData = response.data;
        setData(responseData);

        if (responseData) {
          const now = new Date();
          const satrec = twoline2satrec(responseData.line1, responseData.line2);
          const positionAndVelocity = propagate(satrec, now);
          const positionEci = positionAndVelocity.position;
          const gmst = gstime(now);
          const geodeticCoords = eciToGeodetic(positionEci, gmst);
          const latitude = degreesLat(geodeticCoords.latitude);
          const longitude = degreesLong(geodeticCoords.longitude);
          // console.log(latitude);
          // console.log(longitude);
          setLat(latitude);
          setLong(longitude);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="font-star">
      {data ? (
        <>
          <p>{data.line1}</p>
          <p>{data.line2}</p>
          <p>
            Latitude: ${lat}, Longitude: ${long}
          </p>
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default Tracker;

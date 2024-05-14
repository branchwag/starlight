import { useState, useEffect } from "react";
import axios from "axios";

function Tracker() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://tle.ivanstanojevic.me/api/tle/25544"
        );
        const responseData = response.data;
        setData(responseData);
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
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default Tracker;

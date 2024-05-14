import axios from "axios";

function Tracker() {
  async function fetchData() {
    try {
      const response = await axios.get(
        "https://tle.ivanstanojevic.me/api/tle/25544"
      );
      const data = response.data;
      console.log(data);
      // Process data as needed
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  fetchData();

  return <div className="font-star">tracker</div>;
}

export default Tracker;

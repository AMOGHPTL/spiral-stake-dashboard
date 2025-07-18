import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import Dashboard from "./components/Dashboard";
import type { Metrics } from "./types";

function App() {
  const [leveragePositions, setLeveragePositions] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<Metrics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [leverageRes, metricsRes] = await Promise.all([
          axios.get("https://dapi.spiralstake.xyz/leveragePositions"),
          axios.get("https://dapi.spiralstake.xyz/metrics"),
        ]);
        setLeveragePositions(leverageRes.data);
        setMetrics(metricsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    // openLevergeposition();
    // newUser();
  }, []);

  // const openLevergeposition = async () => {
  //   await axios.post(
  //     "https://dapi.spiralstake.xyz/leverage/open",
  //     {
  //       user: "AMOGH",
  //       amountCollateralInUsd: 100,

  //     }
  //   );
  // };

  // const newUser = async () => {
  //   await axios.post("https://dapi.spiralstake.xyz/user", {
  //     address: "0x23232323",
  //   });
  // };

  return (
    <>
      {!loading && (
        <Dashboard leveragePositions={leveragePositions} metrics={metrics} />
      )}
    </>
  );
}

export default App;

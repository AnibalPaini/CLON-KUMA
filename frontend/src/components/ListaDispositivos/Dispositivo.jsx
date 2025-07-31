import React, { useEffect, useState } from "react";
import { getDeviceStats, getLastsPings } from "../../APIS/deviceStatsAPI.js";
import { useSocket } from "../../hooks/useSocket.js";
import { useSocketData } from "../../context/SocketDataContext";

const Dispositivo = ({ device, setActualizar, actualizar }) => {
  const [stats, setStats] = useState();
  const [isAlive, setIsAlive] = useState(device.isAlive);
  const [lastsPings, setLastsPings] = useState([]);
  const [loadingPings, setLoadingPings] = useState(true);

  const socket = useSocket();
  const { deviceStats, deviceStates, devicePings } = useSocketData();

  useEffect(() => {
    obtenerStats();
    console.log(device);
  }, [actualizar, device._id]);

  useEffect(() => {
    if (!socket) return;

    const newStats = deviceStats[device._id];
    if (newStats) {
      setStats((prevStats) => ({
        ...newStats,
        paused: prevStats?.paused ?? false,
      }));
    }

    setIsAlive(deviceStates[device._id] ?? device.isAlive);
    const nuevosPings = devicePings[device._id];

    if (nuevosPings && nuevosPings.length > 0) {
      setLastsPings(nuevosPings);
      setLoadingPings(false);
    }
  }, [socket, device._id, deviceStats, deviceStates, devicePings]);

  const obtenerStats = async () => {
    try {
      const res = await getDeviceStats(device._id);
      const lastPings = await getLastsPings(device._id);
      setLastsPings(lastPings.data.payload);
      setStats(res.data.payload);
      setLoadingPings(false);
    } catch (error) {
      console.error("Error al obtener stats:", error);
    } finally {
      if (setActualizar) setActualizar(false);
    }
  };

  return (
    <>
      <div>
        <div className="flex">
          <div className="flex items-center gap-x-2">
            <span
              className={`rounded-xl w-16 text-center px-2 py-1 font-medium ${
                stats?.paused
                  ? "bg-gray-400 text-black"
                  : isAlive
                  ? "bg-green-400 text-black"
                  : "bg-red-400 text-black"
              }`}
            >
              {stats?.promedio ?? "..."}%
            </span>

            <div className="flex items-center space-x-2">
              <p className="text-lg text-gray-200">{device.name}</p>
              <p className="text-lg text-gray-200">{device.ip}</p>
            </div>
          </div>
        </div>
        {device.tag && (
          <div className="flex items-center pl-[4.5rem] mt-1">
            {/* El 4.5rem es el width del span (w-16 = 4rem + padding), ajustable */}
            <p className="bg-orange-300 px-2 py-1 w-fit rounded-2xl text-center text-xs">
              {device.tag}
            </p>
          </div>
        )}
      </div>

      <div className="flex space-x-1 mt-1">
        {(stats?.paused
          ? Array.from({ length: 20 }, () => ({ status: "PAUSED" }))
          : loadingPings
          ? Array.from({ length: 20 }, () => ({ status: "LOADING" }))
          : lastsPings || []
        ).map((ping, index) => (
          <span
            key={index}
            title={"Status: " + ping.status + " - " + "ms: " + ping.ms}
            className={`h-4 w-2 rounded-2xl transform hover:scale-110 ${
              ping.status === "UP"
                ? "bg-green-500"
                : ping.status === "DOWN"
                ? "bg-red-500"
                : ping.status === "PAUSED"
                ? "bg-gray-400"
                : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </>
  );
};

export default Dispositivo;

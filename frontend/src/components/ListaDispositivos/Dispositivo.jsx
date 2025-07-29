import React, { useEffect, useState } from "react";
import { getDeviceStats } from "../../APIS/deviceStatsAPI.js";
import { useSocket } from "../../hooks/useSocket.js";
import { useSocketData } from "../../context/SocketDataContext";

const Dispositivo = ({ device, setActualizar, actualizar }) => {
  const [stats, setStats] = useState();
  const [isAlive, setIsAlive] = useState(device.isAlive);
  const [lastsPings, setLastsPings] = useState([]);

  const socket = useSocket();
  const { deviceStats, deviceStates, devicePings } = useSocketData();

  useEffect(() => {
    obtenerStats();
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

    setIsAlive(deviceStates[device._id]);
    setLastsPings(devicePings[device._id] ?? []);
  }, [socket, device._id, deviceStats, deviceStates, devicePings]);

  const obtenerStats = async () => {
    try {
      const res = await getDeviceStats(device._id);
      setStats(res.data.payload);
    } catch (error) {
      console.error("Error al obtener stats:", error);
    } finally {
      if (setActualizar) setActualizar(false);
    }
  };

  return (
    <>
      <div className="flex gap-x-2 items-center">
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
        <p className="text-lg text-gray-200">{device.name}</p>
        <p className="text-lg text-gray-200">{device.ip}</p>
      </div>
      <div className="flex space-x-1 mt-1">
        {(stats?.paused
          ? Array(20).fill({ status: "PAUSED" })
          : lastsPings ?? []
        ).map((ping, index) => (
          <span
            key={index}
            className={`h-4 w-2 rounded-2xl transform hover:scale-110 ${
              ping.status === "UP"
                ? "bg-green-500"
                : ping.status === "DOWN"
                ? "bg-red-500"
                : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </>
  );
};

export default Dispositivo;

import React, { useEffect, useState } from "react";
import { getDeviceStats } from "../../APIS/deviceStatsAPI.js";
import { useSocket } from "../../hooks/useSocket.js";

const Dispositivo = ({ device, setActualizar, actualizar }) => {
  const [stats, setStats] = useState();
  const [isAlive, setIsAlive] = useState(device.isAlive);
  const [lastsPings, setLastsPings] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    obtenerStats();

    if (!socket) return;

    const handleStats = (data) => {
      if (data.deviceId === device._id) {
        setStats((prev) => ({ ...prev, promedio: data.promedio }));
      }
    };

    const handleDevice = (data) => {
      if (data.deviceId === device._id) {
        setIsAlive(data.isAlive);
      }
    };

    const handlePings = (data) => {
      if (data.deviceId === device._id) {
        setLastsPings(data.lastsPings);
      }
    };

    socket.on("stats:update", handleStats);
    socket.on("device:update", handleDevice);
    socket.on("pings:update", handlePings);

    return () => {
      socket.off("stats:update", handleStats);
      socket.off("device:update", handleDevice);
      socket.off("pings:update", handlePings);
    };
  }, [device, socket, actualizar]);

  const obtenerStats = async () => {
    try {
      const res = await getDeviceStats(device._id);
      setStats(res.data.payload);
    } catch (error) {
      console.log(error);
    } finally {
      setActualizar(false);
    }
  };

  return (
    <>
      <div className="flex gap-x-2 items-center">
        <span
          className={`rounded-xl p-1 ${
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
      <div className="flex space-x-1">
        {(stats?.paused
          ? Array(20).fill({ status: "PAUSED" })
          : lastsPings
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
          ></span>
        ))}
      </div>
    </>
  );
};

export default Dispositivo;

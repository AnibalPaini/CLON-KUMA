import React, { useEffect, useState } from "react";
import { getDeviceStats } from "../../APIS/deviceStatsAPI.js";
import {useSocket} from "../../hooks/useSocket.js"

const Dispositivo = ({ device }) => {
  const [stats, setStats] = useState();
  const [isAlive, setIsAlive] = useState(device.isAlive);
  const [lastsPings, setLastsPings]=useState([])
  const socket = useSocket();

  useEffect(() => {
    obtenerStats();
    if(!socket)return

    // Suscripción a eventos
    socket.on("stats:update", (data) => {
      if (data.deviceId === device._id) {
        setStats((prev) => ({ ...prev, promedio: data.promedio }));
      }
    });

    socket.on("device:update", (data) => {
      if (data.deviceId === device._id) {
        setIsAlive(data.isAlive);
      }
    });

    socket.on("pings:update", (data) => {
      if (data.deviceId === device._id) {
        setLastsPings(data.lastsPings);
      }
    });

    return () => {
      socket.off("stats:update");
      socket.off("device:update");
    };
  }, [device._id,socket]);

  const obtenerStats = async () => {
    try {
      const res = await getDeviceStats(device._id);
      setStats(res.data.payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex gap-x-2 items-center">
        <span className={`rounded-xl p-1 bg-green-500 ${isAlive? "bg-green-400 text-black" : "bg-red-400 text-black"}`}>
          {stats?.promedio ?? "..."}%
        </span>
        <p className="text-lg text-gray-200">{device.name}</p>
        <p className="text-lg text-gray-200">{device.ip}</p>
      </div>
      <div className="flex space-x-1">
        {lastsPings.map((ping)=>(
          <span className={`h-4 w-2 rounded-2xl transform hover:scale-110 ${ping.status === "UP"? "bg-green-500" : "bg-red-500" }`}></span>
        ))}
      </div>
    </>
  );
};

export default Dispositivo;

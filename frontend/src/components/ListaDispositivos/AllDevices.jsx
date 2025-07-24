import React, { useEffect, useState } from "react";
import { getDevices } from "../../APIS/deviceAPI.js";
import { useSocket } from "../../hooks/useSocket.js";

const AllDevices = () => {
  const [connected, setConnected] = useState(0);
  const [disconnected, setDisconnected] = useState(0);
  const [paused, setPaused] = useState(0);
  const socket = useSocket();

  useEffect(() => {
    obtenerDevices();

    if (!socket) {
      return;
    }

    socket.on("pings:connected", (data) => {
      setConnected(data.connected);
      setDisconnected(data.disconnected);
    });

    return () => {
      socket.off("pings:connected");
    };
  }, [socket]);

  const obtenerDevices = async () => {
    try {
      const res = await getDevices();
      let devices = res.data.payload;
      let devicesConnected = devices.filter(
        (device) => device.isConnected === true && device.paused === false
      ).length;
      let devicesPaused = devices.filter(
        (device) => device.paused === true
      ).length;
      let devicesDisconnected = devices.filter(
        (device) => device.isConnected === false
      ).length;
      setConnected(devicesConnected);
      setDisconnected(devicesDisconnected);
      setPaused(devicesPaused);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="p-4 rounded-xl bg-gray-800 shadow-lg text-white w-full">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-100">
        Estado de dispositivos
      </h2>
      <div className="flex justify-between items-center gap-4">
        <div className="flex-1 bg-green-600 p-4 rounded-xl shadow-md flex flex-col items-center">
          <span className="text-3xl font-bold">{connected}</span>
          <p className="text-md mt-1">Conectados</p>
        </div>
        <div className="flex-1 bg-gray-600 p-4 rounded-xl shadow-md flex flex-col items-center">
          <span className="text-3xl font-bold">{paused}</span>
          <p className="text-md mt-1">Pausados</p>
        </div>
        <div className="flex-1 bg-red-600 p-4 rounded-xl shadow-md flex flex-col items-center">
          <span className="text-3xl font-bold">{disconnected}</span>
          <p className="text-md mt-1">Desconectados</p>
        </div>
      </div>
    </section>
  );
};

export default AllDevices;

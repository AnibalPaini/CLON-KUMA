import React, { useState, useEffect } from "react";
import { getDeviceStats } from "../../APIS/deviceStatsAPI";
import { getHistorial } from "../../APIS/deviceHistoryAPI.js";
import { pauseDevice } from "../../APIS/deviceAPI.js";
import { useSocket } from "../../hooks/useSocket.js";

const DeviceInfo = ({ device, setActualizar }) => {
  const [stats, setStats] = useState();
  const [historial, setHistorial] = useState();
  const [ms, setMs] = useState(0);
  const [isAlive, setIsAlive] = useState(device.isAlive);
  const [lastsPings, setLastsPings] = useState([]);
  const socket = useSocket();
  useEffect(() => {
    obtenerStats();
    obtenerHistorial();

    if (!socket) return;
    console.log("Conectado");

    // Suscripción a eventos
    socket.on("stats:update", (data) => {
      if (data.deviceId === device._id) {
        setStats((prev) => ({ ...prev, promedio: data.promedio }));
        setMs(data.ms);
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
      console.log("Deconectado");

      socket.off("stats:update");
      socket.off("device:update");
      socket.off("pings:update");
    };
  }, [device._id, socket]);

  const obtenerStats = async () => {
    try {
      const res = await getDeviceStats(device._id);

      setStats(res.data.payload);
      setMs(res.data.payload.ms);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerHistorial = async () => {
    try {
      const res = await getHistorial(device._id);
      setHistorial(res.data.payload);
      console.log(res.data.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const handlerPauseDevice = async () => {
    try {
      await pauseDevice(device._id);
      setActualizar(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-gray-400 font-semibold text-3xl mb-2">
        {device.name}
      </h2>
      <p className="text-green-500 font-bold text-md ml-1">{device.ip}</p>

      <div className="flex w-fit text-gray-300 mt-3">
        <button
          className="flex items-center gap-x-1 cursor-pointer py-2 px-4 bg-gray-800 hover:bg-gray-900 rounded-l-2xl"
          onClick={() => handlerPauseDevice()}
        >
          <svg
            width="16px"
            height="16px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z"
                fill="#99A1AF"
              ></path>{" "}
              <path
                d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z"
                fill="#99A1AF"
              ></path>{" "}
            </g>
          </svg>
          Pausar
        </button>
        <button className="flex items-center gap-x-1 cursor-pointer py-2 px-4 bg-gray-800 hover:bg-gray-900">
          <svg
            width="16px"
            height="16px"
            viewBox="0 0 24.00 24.00"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                stroke="#99a1af"
                stroke-width="3.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
              <path
                d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                stroke="#99a1af"
                stroke-width="3.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>
          </svg>
          Editar
        </button>
        <button className="flex items-center gap-x-1 bg-red-600 cursor-pointer py-2 px-4 rounded-r-2xl text-gray-50 hover:bg-red-700">
          <svg
            width="16px"
            height="16px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
            stroke-width="2.4"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M2.75 6.16667C2.75 5.70644 3.09538 5.33335 3.52143 5.33335L6.18567 5.3329C6.71502 5.31841 7.18202 4.95482 7.36214 4.41691C7.36688 4.40277 7.37232 4.38532 7.39185 4.32203L7.50665 3.94993C7.5769 3.72179 7.6381 3.52303 7.72375 3.34536C8.06209 2.64349 8.68808 2.1561 9.41147 2.03132C9.59457 1.99973 9.78848 1.99987 10.0111 2.00002H13.4891C13.7117 1.99987 13.9056 1.99973 14.0887 2.03132C14.8121 2.1561 15.4381 2.64349 15.7764 3.34536C15.8621 3.52303 15.9233 3.72179 15.9935 3.94993L16.1083 4.32203C16.1279 4.38532 16.1333 4.40277 16.138 4.41691C16.3182 4.95482 16.8778 5.31886 17.4071 5.33335H19.9786C20.4046 5.33335 20.75 5.70644 20.75 6.16667C20.75 6.62691 20.4046 7 19.9786 7H3.52143C3.09538 7 2.75 6.62691 2.75 6.16667Z"
                fill="#ffffff"
              ></path>{" "}
              <path
                d="M11.6068 21.9998H12.3937C15.1012 21.9998 16.4549 21.9998 17.3351 21.1366C18.2153 20.2734 18.3054 18.8575 18.4855 16.0256L18.745 11.945C18.8427 10.4085 18.8916 9.6402 18.45 9.15335C18.0084 8.6665 17.2628 8.6665 15.7714 8.6665H8.22905C6.73771 8.6665 5.99204 8.6665 5.55047 9.15335C5.10891 9.6402 5.15777 10.4085 5.25549 11.945L5.515 16.0256C5.6951 18.8575 5.78515 20.2734 6.66534 21.1366C7.54553 21.9998 8.89927 21.9998 11.6068 21.9998Z"
                fill="#ffffff"
              ></path>{" "}
            </g>
          </svg>
          Eliminar
        </button>
      </div>
      <div className="bg-gray-800 mt-5 rounded-2xl p-10 flex justify-evenly">
        <div>
          <p className="text-gray-100 text-xl text-center font-semibold">
            Ultima Respuesta
          </p>
          <p className="text-center mt-2 text-lg text-gray-300">{ms}</p>
        </div>
        <div>
          <p className="text-gray-100 text-xl text-center font-semibold">
            Ultima Respuesta
          </p>
          <p className="text-center mt-2 text-lg text-gray-300">{ms}</p>
        </div>
        <div>
          <p className="text-gray-100 text-xl text-center font-semibold">
            Ultima Respuesta
          </p>
          <p className="text-center mt-2 text-lg text-gray-300">{ms}</p>
        </div>
        <div>
          <p className="text-gray-100 text-xl text-center font-semibold">
            Ultima Respuesta
          </p>
          <p className="text-center mt-2 text-lg text-gray-300">{ms}</p>
        </div>
      </div>
      <div className="bg-gray-800 mt-5 rounded-2xl p-10 flex">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="">
              <th className="text-gray-100 px-4 py-2 text-left">Estado</th>
              <th className="text-gray-100 px-4 py-2 text-left">
                Fecha y hora
              </th>
              <th className="text-gray-100 px-4 py-2 text-left">Mensaje</th>
            </tr>
          </thead>
          <tbody>
            {historial?.flatMap((his) =>
              his.history.map((entry, index) => (
                <tr key={`${his._id}-${index}`}>
                  <td className="text-white px-4 py-2 font-semibold">
                    <span
                      className={`inline-block px-2 py-1 rounded text-sm ${
                        entry.status === "UP"
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {entry.status}
                    </span>
                  </td>
                  <td className="text-white px-4 py-2">
                    {new Date(entry.time).toLocaleString()}
                  </td>
                  <td className="text-white px-4 py-2" title={entry.message}>
                    {entry.message?.slice(0, 100) || "Sin mensaje"}
                    {"..."}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeviceInfo;

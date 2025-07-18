import React, { useEffect, useState } from "react";
import Dispositivo from "./Dispositivo";
import { getDevices } from "../../APIS/deviceAPI.js";

const ListaDispositivos = () => {
  const [listaDevices, setListaDevices] = useState([]);
  useEffect(() => {
    obtenerDevices();
  }, []);

  const obtenerDevices = async () => {
    try {
      const res = await getDevices();
      setListaDevices(res.data.payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="p-5">
      <div className="flex w-full justify-between bg-gray-600 px-2 py-4 rounded-t-xl">
        <div className="flex items-center">
          <button className="px-4 py-1 bg-green-400 rounded-2xl text-gray-900 font-semibold flex items-center">
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </span>{" "}
            Crear nuevo
          </button>
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <input
            type="text"
            placeholder="Buscar..."
            className="py-1 px-2 border rounded-2xl border-gray-800"
          />
        </div>
      </div>
      <div className="flex justify-between items-center bg-gray-800 w-full px-2 py-4">
        {listaDevices.map((device) => (
          <Dispositivo device={device} key={device._id}></Dispositivo>
        ))}
      </div>
    </section>
  );
};

export default ListaDispositivos;

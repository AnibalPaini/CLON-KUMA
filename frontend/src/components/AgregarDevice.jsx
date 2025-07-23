import React from "react";

const AgregarDevice = () => {
  return (
    <div>
      <h2 className="text-gray-400 font-semibold text-3xl mb-6">
        Agregar nuevo dispositivo
      </h2>
      <form className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-5 text-white">
        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="tipo">
            Tipo de monitor
          </label>
          <select
            id="tipo"
            className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ping">Ping</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="nombre">
            Nombre del dispositivo
          </label>
          <input
            type="text"
            id="nombre"
            className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="ip">
            IP del dispositivo
          </label>
          <input
            type="text"
            id="ip"
            className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="descripcion">
            Descripción
          </label>
          <input
            type="text"
            id="descripcion"
            className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-x-10">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="conectado"
              className="accent-blue-500 w-5 h-5"
            />
            <label htmlFor="conectado" className="font-medium">
              Conectado?
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="notificaciones"
              className="accent-blue-500 w-5 h-5"
            />
            <label htmlFor="notificaciones" className="font-medium">
              Notificaciones
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AgregarDevice;

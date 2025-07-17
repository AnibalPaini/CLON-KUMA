import React from "react";
import Dispositivo from "./Dispositivo";

const ListaDispositivos = () => {
  return (
    <section className="p-5 rounded-xl">
      <div className="flex w-full justify-between bg-gray-600 px-2 py-4">
        <div className="flex items-center">
            <button className="px-4 py-1 bg-green-400 rounded-2xl text-gray-900 font-semibold"><span className="font-bold text-xl text-gray-950">+</span> Crear nuevo</button>
        </div>
        <div className="flex items-center">
          🔍
          <input
            type="text"
            placeholder="Buscar..."
            className="py-1 px-2 border rounded-2xl border-gray-800"
          />
        </div>
      </div>
      <div className="flex justify-between items-center bg-gray-800 w-full px-2 py-4">
        <Dispositivo></Dispositivo>
      </div>
    </section>
  );
};

export default ListaDispositivos;

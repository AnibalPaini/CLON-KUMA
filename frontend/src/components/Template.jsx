import React, { useEffect, useState } from "react";
import ListaDispositivos from "./ListaDispositivos/ListaDispositivos";
import DeviceInfo from "./ListaDispositivos/DeviceInfo";
import AllDevices from "./ListaDispositivos/AllDevices";
import AgregarDevice from "./AgregarDevice";
import Header from "./Header";

const Template = () => {
  const [selectedDevice, setSelectedDevice] = useState();
  const [newDevice, setNewDevice] = useState(false);
  const [actualizar, setActualizar] = useState(false);
  return (
    <div className="h-screen bg-gray-700">
      <Header setSelectedDevice={setSelectedDevice} setNewDevice={setNewDevice}></Header>
      <main className="bg-gray-700 grid grid-cols-3">
        <ListaDispositivos
          onSelectDevice={setSelectedDevice}
          newDevice={setNewDevice}
          actualizar={actualizar}
          setActualizar={setActualizar}
        ></ListaDispositivos>
        <div className="col-span-2 p-4">
          {selectedDevice ? (
            <DeviceInfo device={selectedDevice} setActualizar={setActualizar} />
          ) : newDevice ? (
            <AgregarDevice setActualizar={setActualizar}></AgregarDevice>
          ) : (
            <AllDevices></AllDevices>
          )}
        </div>
      </main>
    </div>
  );
};

export default Template;

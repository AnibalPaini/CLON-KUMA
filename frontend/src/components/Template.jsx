import React, { useEffect, useState } from "react";
import ListaDispositivos from "./ListaDispositivos/ListaDispositivos";
import DeviceInfo from "./ListaDispositivos/DeviceInfo";
import AllDevices from "./ListaDispositivos/AllDevices";
import AgregarDevice from "./AgregarDevice";
import Header from "./Header";
import UpdateDevice from "./ListaDispositivos/UpdateDevice";

const Template = () => {
  const [selectedDevice, setSelectedDevice] = useState();
  const [newDevice, setNewDevice] = useState(false);
  const [actualizar, setActualizar] = useState(false);
  const [updateDevice, setUpdateDevice] = useState(null);
  return (
    <div className="h-screen bg-gray-700">
      <Header
        setSelectedDevice={setSelectedDevice}
        setNewDevice={setNewDevice}
        setUpdateDevice={setUpdateDevice}
      ></Header>
      <main className="bg-gray-700 grid grid-cols-3">
        <ListaDispositivos
          onSelectDevice={setSelectedDevice}
          newDevice={setNewDevice}
          actualizar={actualizar}
          setActualizar={setActualizar}
          setUpdateDevice={setUpdateDevice}
        ></ListaDispositivos>
        <div className="col-span-2 p-4">
          {updateDevice ? (
            <UpdateDevice setActualizar={setActualizar} updateDevice={updateDevice} setUpdateDevice={setUpdateDevice} />
          ) : selectedDevice ? (
            <DeviceInfo
              device={selectedDevice}
              setActualizar={setActualizar}
              setUpdateDevice={setUpdateDevice}
            />
          ) : newDevice ? (
            <AgregarDevice setActualizar={setActualizar} setUpdateDevice={setUpdateDevice}/>
            
          ) : (
            <AllDevices />
          )}
        </div>
      </main>
    </div>
  );
};

export default Template;

import React, { useEffect, useState } from "react";
import ListaDispositivos from "./ListaDispositivos/ListaDispositivos";
import DeviceInfo from "./ListaDispositivos/DeviceInfo"
import AllDevices from "./ListaDispositivos/AllDevices";
import AgregarDevice from "./AgregarDevice";

const Template = () => {
  const [selectedDevice, setSelectedDevice] = useState();
  const [newDevice, setNewDevice] = useState(false);
  useEffect(()=>{
    console.log(selectedDevice);
    
  },[selectedDevice])
  return (
    <main className="bg-gray-700 grid grid-cols-3 h-screen">
      <ListaDispositivos onSelectDevice={setSelectedDevice} newDevice={setNewDevice}></ListaDispositivos>
      <div className="col-span-2 p-4">
        {selectedDevice ? (
          <DeviceInfo device={selectedDevice} />
        ) : newDevice? 
        (<AgregarDevice></AgregarDevice>):(
          <AllDevices></AllDevices>
        )}
      </div>
    </main>
  );
};

export default Template;

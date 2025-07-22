import React, { useEffect, useState } from "react";
import ListaDispositivos from "./ListaDispositivos/ListaDispositivos";
import DeviceInfo from "./ListaDispositivos/DeviceInfo"
import AllDevices from "./ListaDispositivos/AllDevices";

const Template = () => {
  const [selectedDevice, setSelectedDevice] = useState();
  useEffect(()=>{
    console.log(selectedDevice);
    
  },[selectedDevice])
  return (
    <main className="bg-gray-700 grid grid-cols-3 h-screen">
      <ListaDispositivos onSelectDevice={setSelectedDevice}></ListaDispositivos>
      <div className="col-span-2 p-4">
        {selectedDevice ? (
          <DeviceInfo device={selectedDevice} />
        ) : (
          <AllDevices></AllDevices>
        )}
      </div>
    </main>
  );
};

export default Template;

import React from "react";

const Header = ({setSelectedDevice, setNewDevice}) => {
  return (
    <header className="w-full flex bg-gray-900 py-4 px-6">
      <h1 className="text-3xl text-gray-200 font-bold cursor-pointer" onClick={()=>{setNewDevice(false), setSelectedDevice(false)}}>CLON KUMA</h1>
    </header>
  );
};

export default Header;

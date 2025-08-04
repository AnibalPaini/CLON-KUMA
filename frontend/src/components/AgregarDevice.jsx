import React, { useEffect } from "react";
import { postDevices } from "../APIS/deviceAPI";
import { getTags } from "../APIS/tagsAPI";
import { useState } from "react";
import Select from "react-select";

const AgregarDevice = ({ setActualizar }) => {
  const [formCreateDevice, setFormCreateDevice] = useState({
    ip: "",
    name: "",
    isConnected: "",
    notifications: "",
    description: "",
    tag: "",
  });

  const [listadoTags, setListadoTags] = useState([]);
  const [modalTags, setModalTags] = useState(false);

  useEffect(() => {
    obtenerTags();
  }, []);

  const toggleModalTag = () => {
    setModalTags(!modalTags);
  };

  const obtenerTags = async () => {
    try {
      const res = await getTags();
      setListadoTags(res.data.payload);
      console.log(res.data.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const crearDevice = async () => {
    try {
      await postDevices(formCreateDevice);
      setActualizar(true);
      setFormCreateDevice({
        ip: "",
        name: "",
        isConnected: "",
        notifications: "",
        description: "",
        tag: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlerCreateDeviceForm = (e) => {
    const { name, type, value, checked } = e.target;

    setFormCreateDevice((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const opcionesTags = [
    ...listadoTags.map((tag) => ({
      value: tag._id,
      label: tag.name,
      color: tag.color,
    })),
  ];

  const opcionesColor = [
    { value: "red", label: "Rojo" },
    { value: "blue", label: "Azul" },
    { value: "green", label: "Verde" },
    { value: "purple", label: "Violeta" },
    { value: "yellow", label: "Amarillo" },
    { value: "gray", label: "Gris" },
    { value: "pink", label: "Rosa" },
  ];
  const tailwindColors = {
    red: "#ef4444",
    blue: "#3b82f6",
    green: "#22c55e",
    purple: "#8b5cf6",
    yellow: "#eab308",
    gray: "#6b7280",
    pink: "#ec4899",
  };

  const formatColorOption = ({ label, value }) => (
    <div
      style={{
        backgroundColor: tailwindColors[value],
        padding: "4px 10px",
        borderRadius: "9999px",
        color: "white",
        fontWeight: 500,
        fontSize: "0.85rem",
        display: "inline-block",
        width: "fit-content",
      }}
    >
      {label}
    </div>
  );

  const formatOptionLabel = ({ label, color }) => (
    <div
      className="rounded-full px-3 py-1 text-white text-sm font-semibold inline-block"
      style={{ backgroundColor: color }}
    >
      {label}
    </div>
  );

  return (
    <div>
      <h2 className="text-gray-400 font-semibold text-3xl mb-6">
        Agregar nuevo dispositivo
      </h2>
      <form
        className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-5 text-white"
        onSubmit={(e) => {
          e.preventDefault();
          crearDevice();
        }}
      >
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
          <label className="mb-1 font-medium" htmlFor="name">
            Nombre del dispositivo
          </label>
          <input
            type="text"
            id="name"
            value={formCreateDevice.name}
            name="name"
            className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handlerCreateDeviceForm}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="ip">
            IP del dispositivo
          </label>
          <input
            type="text"
            id="ip"
            name="ip"
            value={formCreateDevice.ip}
            className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handlerCreateDeviceForm}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="description">
            Descripción
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formCreateDevice.description}
            className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handlerCreateDeviceForm}
          />
        </div>

        <div className="">
          <div className="mb-1">
            <label className="font-medium" htmlFor="tag">
              Etiqueta
            </label>
          </div>
          <button
            className="px-8 py-0.5 rounded-2xl border border-gray-400 cursor-pointer"
            type="button"
            onClick={toggleModalTag}
          >
            Agregar etiqueta
          </button>
        </div>

        <div className="flex gap-x-10">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isConnected"
              name="isConnected"
              value={formCreateDevice.isConnected}
              className="accent-blue-500 w-5 h-5"
              onChange={handlerCreateDeviceForm}
            />
            <label htmlFor="isConnected" className="font-medium">
              Conectado?
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="notifications"
              value={formCreateDevice.notifications}
              className="accent-blue-500 w-5 h-5"
              name="notifications"
              onChange={handlerCreateDeviceForm}
            />
            <label htmlFor="notifications" className="font-medium">
              Notificaciones
            </label>
          </div>
        </div>
        <div className="flex ">
          <button
            type="submit"
            className="font-semibold px-4 py-2 text-gray-900 bg-green-400 cursor-pointer"
          >
            Crear dispositivo
          </button>
        </div>
      </form>
      {modalTags && (
        <div className="z-50 fixed inset-0 flex items-center justify-center bg-gray-800/60 bg-opacity-50">
          <div className="bg-gray-800 rounded-xl p-6 shadow-xl flex flex-col gap-4 w-full max-w-md text-white">
            <h2 className="text-xl font-semibold text-gray-100">Agregar Tag</h2>
            {/*             <select name="" id="" className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Selecciona</option>
              {listadoTags.map((tag) => (
                <option value={tag._id} key={tag._id} className={`bg-${tag.color}-500 w-fit`}>{tag.name}</option>
              ))}
            </select> */}
            <Select
              options={opcionesTags}
              placeholder="Selecciona una etiqueta..."
              isClearable
              formatOptionLabel={formatOptionLabel}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "#374151",
                  borderColor: "#4b5563",
                  color: "white",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#1f2937",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "white",
                }),
                option: (base, { isFocused }) => ({
                  ...base,
                  backgroundColor: isFocused ? "#4b5563" : "transparent",
                  cursor: "pointer",
                }),
              }}
            />

            <div className="flex space-x-2">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="px-2 py-1.5 rounded-sm bg-gray-700 border border-gray-600 text-white font-light"
                />
              </div>
              <div className="w-full">
                <Select
                  options={opcionesColor}
                  formatOptionLabel={formatColorOption}
                  placeholder="Color"
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: "#374151",
                      borderColor: "#4b5563",
                      color: "white",
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: "#1f2937", // bg-gray-800
                    }),
                    singleValue: (base, { data }) => ({
                      ...base,
                      backgroundColor: tailwindColors[data.value],
                      borderRadius: "9999px",
                      padding: "2px 10px",
                      color: "white",
                      fontWeight: 500,
                      fontSize: "0.85rem",
                    }),
                  }}
                />
              </div>
            </div>

            <button
              onClick={() => setModalTags(false)}
              className="self-end text-sm text-blue-600 hover:underline"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgregarDevice;

import React from "react";

function Footer() {
  return (
    <div
      className=" fixed bottom-0 bg-white z-50 flex justify-between"
      style={{ width: "calc(100vw - 2 * 8px)" }}
    >
      <div className="flex w-full  text-xs justify-between">
        <p>&copy; 2024 Hecho por Benjamin Toro. Todos los derechos reservados.</p>
        <p className="">Informacion actualizada 25/05/2024 </p>
      </div>
    </div>
  );    
}

export default Footer;

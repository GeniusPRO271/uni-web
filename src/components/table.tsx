"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CourseData } from "../app/page";

function ContentTable({ courses }: { courses: CourseData[] }) {
  const [selection, setSelection] = useState<CourseData>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  function selectCourse(carrera: CourseData) {
    if (selection?.id == carrera.id && isOpen) {
      setIsOpen(false);
      setSelection(undefined);
      return;
    }

    setSelection(carrera);
    setIsOpen(true);
    return;
  }

  const container = {
    hidden: { height: 0 },
    visible: {
      height: 480,
      marginBottom: 20,
      transition: {
        duration: 0.4,
      },
    },
  };

  const item = {
    hidden: { height: 0 },
    visible: {
        height: 480
    },
  };

  return (
    <div
      className=" absolute mt-10 bg-white cursor-default"
      style={{ top: "0", width: "calc(100vw - 16px)" }}
    >
      <div className="pt-10 pb-5">
        {courses.map((carrera: CourseData) => {
          return (
            <div
              className="border-0 border-t-[1.5px] border-black flex "
              key={carrera.id}
              id={carrera.id}
            >
              <div>
                <div className="w-fit max-w-[90vw] md:max-w-[40vw] ">
                  <div className="flex justify-between items-center sticky top-[75.5px] right-0 truncate overflow-hidden text-ellipsis text-base font-normal">
                    <h1
                      className=" h-8 flex justify-center items-center p-1  hover:bg-black hover:text-white "
                      style={{
                        ...(carrera.id === selection?.id && {
                          backgroundColor: "black",
                          color: "white",
                        }),
                      }}
                      onClick={() => selectCourse(carrera)}
                    >
                      {carrera.university ? carrera.university : "U.Catolica"} {carrera.nombre}
                    </h1>
                  </div>
                  <motion.div
                    className="invisible-scroll overflow-scroll"
                    layout
                    variants={container}
                    initial="hidden"
                    animate={carrera.id == selection?.id ? "visible" : "hidden"}
                  >
                    <motion.div variants={item} className="py-5 px-2">
                      <div>
                        <p className="border-0 border-b-[1.5px] border-black">
                          Grado Academico: {carrera.gradoAcademico}
                        </p>
                        <p className="border-b-[1.5px] border-black">
                          Titulo:{" "}
                          {carrera.tituloProfesional
                            ? carrera.tituloProfesional
                            : "No Aplica"}
                        </p>
                        <p className="border-b-[1.5px] border-black">
                          Ubicacion: {carrera.location}
                        </p>
                      </div>

                      <p className="py-3">{carrera.description}</p>

                      <p className="font-light">
                        {carrera.phoneContact ? carrera.phoneContact : ""}
                      </p>
                      <p className="font-light">
                        {carrera.email ? carrera.email : ""}
                      </p>
                      <div className="pt-3">
                        {carrera.reqNem && (
                          <p className="py-1">NEM: {carrera.reqNem}</p>
                        )}
                        {carrera.reqRank && (
                          <p className="py-1">Rank: {carrera.reqRank}</p>
                        )}
                        {carrera.reqCompLec && (
                          <p className="py-1">
                            Compresion Lectora: {carrera.reqCompLec}
                          </p>
                        )}
                        {carrera.reqMat && (
                          <p className="py-1">Matematicas: {carrera.reqMat}</p>
                        )}
                        {carrera.reqHist && (
                          <p className="py-1">
                            Prueba Electiva: {carrera.reqHist}
                          </p>
                        )}
                        {carrera.reqEspecial && (
                          <p className="py-1">
                            Especial: {carrera.reqEspecial}
                          </p>
                        )}
                      </div>

                      <div className="w-full flex justify-end">
                        <a
                          href={carrera.carreraLinkHref}
                          target="_blank"
                          onMouseOver={() => setIsHover(true)}
                          onMouseLeave={() => setIsHover(false)}
                        >
                          more...
                          <motion.div
                            layout
                            transition={{ duration: 0.4 }}
                            initial={{ width: 0}}
                            animate={{ width: isHover ? "100%" : 0 }}
                            className="border-0 border-b-2 border-black"
                          />
                        </a>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              <div
                className="absolute right-0 hidden md:block"
                style={{ width: "clamp(600px, 20vw, 20vw)" }}
              >
                <div className=" pt-1 pb-1 pr-1 pl-0 flex sticky top-10 r-0 justify-end">
                  <h1 className="w-[40%] md:w-[20%] lg:w-[40%] ">
                    {carrera.arancelAnual2024}
                  </h1>
                  <h1 className="w-[50%] md:w-[30%] lg:w-[50%] ">
                    {carrera.puntajeUltimoMatriculado
                      ? carrera.puntajeUltimoMatriculado
                      : "-"}
                  </h1>
                  <h1 className="w-[40%] md:hidden lg:block">
                    {carrera.duracion}
                  </h1>
                  <h1 className="w-[20%]">
                    {carrera.codigoDEMRE ? carrera.codigoDEMRE : "-"}
                  </h1>
                  <h1 className="w-[10%] text-right">
                    {carrera.vacantes ? carrera.vacantes : "-"}
                  </h1>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ContentTable;

"use client";

import { motion } from "framer-motion";
import { Triangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface HeaderItem {
  name: string;
  href: string;
}
export function Header(props: { value?: string }) {
  const router = useRouter();
  const [selection, setSelection] = useState<number>();
  const [sortParam, setSortParam] = useState(props.value);
  const [sortType, setSortType] = useState<number>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    console.log("value", sortParam);
    if (sortParam === undefined) {
      return;
    } else if (sortParam) {
      params.set("sort", sortParam);
    } else {
      params.delete("sort");
    }

    router.replace(`/?${params.toString()}`);
  }, [sortParam]);

  const handleArancelSort = () => {
    setSortType(0);
    console.log(sortParam);
    if (sortParam === "arancelanualAsc") {
      setSortParam("arancelanualDsc");
      return;
    } else {
      setSortParam("arancelanualAsc");
      return;
    }
  };

  const handleMatriculadoSort = () => {
    setSortType(1);
    console.log(sortParam);
    if (sortParam === "ultimomatriculadoAsc") {
      setSortParam("ultimomatriculadoDsc");
      return;
    } else {
      setSortParam("ultimomatriculadoAsc");
      return;
    }
  };

  const handleVacantesSort = () => {
    setSortType(2);
    if (sortParam === "vacantesAsc") {
      setSortParam("vacantesDsc");
      return;
    } else {
      setSortParam("vacantesAsc");
      return;
    }
  };

  const menu: HeaderItem[] = [
    { name: "Menu", href: "/" },
    { name: "About", href: "/" },
    { name: "Donar", href: "/" },
    { name: "Contacto", href: "/" },
  ];
  return (
    <div
      className=" fixed top-0 pt-2 bg-white z-50 flex justify-between"
      style={{ width: "calc(100vw - 2 * 8px)" }}
    >
      <div className="h-[27px] w-[280px] pt-0 pr-1 pb-1 pl-1 flex justify-between">
        {menu.map((item: HeaderItem, index: number) => {
          return (
            <div key={index}>
              <a
                href={item.href}
                onMouseOver={() => {
                  setSelection(index);
                }}
                onMouseLeave={() => {
                  setSelection(undefined);
                }}
                className=" cursor-pointer"
              >
                {item.name}
                <motion.div
                  layout
                  initial={{ width: 0 }}
                  transition={{ duration: 0.4 }}
                  animate={{ width: selection == index ? "100%" : 0 }}
                  className="border-0 border-b-2 border-black"
                />
              </a>
            </div>
          );
        })}
      </div>
      <div
        className="hidden md:flex md:justify-end pt-2 h-[31px] text-xs"
        style={{ width: "clamp(600px, 20vw, 20vw)" }}
      >
        <div
          className="flex w-[40%] md:w-[20%]  lg:w-[40%] cursor-pointer"
          style={{
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
          }}
          onClick={handleArancelSort}
        >
          Arancel anual
          {sortType === 0 && (
            <Triangle
              className="mt-1 ml-1 h-1.5 w-1.5"
              fill="black"
              style={{
                transform:
                  sortParam === "arancelanualAsc"
                    ? "rotate(0deg)"
                    : "rotate(180deg)",
                transition: "transform 0.4s ease",
              }}
            />
          )}
        </div>
        <div
          className="flex w-[50%] md:w-[30%] lg:w-[50%] cursor-pointer"
          onClick={handleMatriculadoSort}
          style={{
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
          }}
        >
          Puntaje ultimo matriculado
          {sortType === 1 && (
            <Triangle
              className="mt-1 ml-1 h-1.5 w-1.5"
              fill="black"
              style={{
                transform:
                  sortParam === "ultimomatriculadoAsc"
                    ? "rotate(0deg)"
                    : "rotate(180deg)",
                transition: "transform 0.4s ease",
              }}
            />
          )}
        </div>
        <h2 className="flex w-[40%] md:hidden lg:block ">Duracion</h2>
        <h2 className="flex w-[12%] ">DMRE</h2>
        <div
          className="flex w-[10%] md:w-[20%] ml-0 justify-end text-right cursor-pointer"
          onClick={handleVacantesSort}
          style={{
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
          }}
        >
          Vacantes
          {sortType === 2 && (
            <Triangle
              className="mt-1 ml-1 h-1.5 w-1.5"
              fill="black"
              style={{
                transform:
                  sortParam === "vacantesAsc"
                    ? "rotate(0deg)"
                    : "rotate(180deg)",
                transition: "transform 0.4s ease",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

"use client";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition, useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";

function Search(props: { value?: string; placeholder?: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(props.value);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    console.log("value", value);
    if (value === undefined) {
      return;
    } else if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      // All navigations are transitions automatically
      // But wrapping this allow us to observe the pending state
      router.replace(`/?${params.toString()}`);
    });
  }, [router, value]);
  
  return (
    <div className="pl-2 mt-7 fixed z-50 w-full items-center h-[40px] bg-white">
      <div className="flex w-full h-full items-center">
        {isPending ? (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="black"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="black"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <SearchIcon className="h-4 w-4" />
        )}
        <Input
          ref={inputRef}
          value={value ?? ""}
          onInput={(e) => {
            setValue(e.currentTarget.value);
          }}
          spellCheck={false}
          className="w-full outline-0 pl-2"
          placeholder={props.placeholder || "Search..."}
        />
      </div>
    </div>
  );
}

export default Search;

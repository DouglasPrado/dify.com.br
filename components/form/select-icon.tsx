"use client";

import { fetcher } from "@/lib/utils";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
import Icon from "../global/icon";
export default function SelectIcon(props: any) {
  const promiseOptions = async (inputValue: string) => {
    return await fetcher(`/api/icons?filter=${inputValue}`);
  };

  const CustomOption = ({ children, ...props }: any) => {
    return (
      <components.Option {...props}>
        <div className="flex items-center gap-2 text-sm text-stone-600">
          <Icon icon={children} />
          {children}
        </div>
      </components.Option>
    );
  };
  return (
    <AsyncSelect
      {...props}
      cacheOptions
      styles={customStyles}
      loadOptions={promiseOptions}
      components={{ Option: CustomOption }}
      defaultOptions
    />
  );
}

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    width: "100%",
    borderRadius: "0.375rem", // rounded-md
    borderColor: state.isFocused ? "black" : "#e5e7eb", // border-stone-200
    backgroundColor: "#f8fafc", // bg-stone-50
    fontSize: "0.875rem", // text-sm
    color: state.isFocused ? "black" : "#4b5563", // text-stone-600
    "&:hover": {
      borderColor: state.isFocused ? "black" : "#e5e7eb", // hover border color
    },
    boxShadow: state.isFocused ? "0 0 0 1px black" : "none", // focus:ring-black
    outline: state.isFocused ? "1px solid black" : "none", // focus:outline-none
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#9ca3af", // placeholder:text-stone-400
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#4b5563", // text-stone-600
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: "0.375rem", // rounded-md
    marginTop: "0.5rem",
    backgroundColor: "#f8fafc", // bg-stone-50
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#3182ce"
      : state.isFocused
      ? "#ebf8ff"
      : "white",
    color: state.isSelected ? "white" : state.isFocused ? "#2d3748" : "#4b5563",
    padding: "0.5rem 1rem",
    "&:hover": {
      backgroundColor: "#ebf8ff",
      color: "#2d3748",
    },
  }),
};

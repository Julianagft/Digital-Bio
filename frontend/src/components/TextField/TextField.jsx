import { Eye, EyeSlash, Info } from "phosphor-react";
import { useState } from "react";
import { Tooltips } from "../CustomTooltip/CustomTooltip";

export default function TextField({
   text,
   type = "text",
   name = "",
   required = true,
   minLength = "",
   maxLength,
   defaultValue = "",
   disabled = false,
   customFontWeight = "font-semibold",
   value = "",
   placeholder = "",
   onChange = () => {},
   pattern = null,
   max,
   hidden = false,
   min,
   variant = "primary",
   autoComplete = "",
   subtitle = "",
   error = false,
   errorMessage = "",
   isPassword = false,
   id = name,
   legend = "",
   errorId = "",
   tooltipInfo = "",
}) {
   const [isPasswordView, setIsPasswordView] = useState(false);

  function handleChangePasswordView() {
    setIsPasswordView(!isPasswordView);
    const input = document.getElementById(id);

    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  }

   function getVariant() {
      switch (variant) {
         case "allowance":
            return "w-full border border-gray-400 rounded-md p-2 mt-2";
         case "primary":
            return "px-0 border-0 border-b-[1px] focus:ring-0 placeholder:text-gray-300";
         case "secondary":
            return "px-4 py-2 border border-gray-300 focus:ring-0 placeholder:text-gray-400 rounded-md";
         case "tertiary":
            return "px-4 py-2 border border-gray-800 focus:ring-0 placeholder:text-gray-400 placeholder:font-normal rounded-md h-full";
         case "quaternary":
            return "px-4 py-2.5 border border-gray-800 focus:ring-0 placeholder:text-gray-400 placeholder:font-normal rounded-md h-full";
         case "quinary":
            return (
               "px-3 py-2 border border-gray-400 focus:ring-0 placeholder:text-gray-400 placeholder:font-normal" +
               " placeholder:text-sm rounded h-full transition-all duration-300 focus-within:border-mainColor focus-within:ring-2"
            );
          case "sextenary":
              return "px-4 py-2.5 border border-gray-800 focus:ring-0 placeholder:text-gray-400 placeholder:font-normal rounded-md h-full";
         default:
            return "px-0 border-0 border-b-[1px] focus:ring-0 placeholder:text-gray-300";
      }
   }

   function getVariantToLabel() {
      switch (variant) {
         case "primary":
            return "text-gray-600 text-sm";
         case "secondary":
            return `text-gray-600 text-base ${customFontWeight} mb-2`;
         case "tertiary":
            return "text-gray-600 text-base mb-2";
         case "quaternary":
            return "text-gray-600 text-base mb-2";
         case "quinary":
            return "text-black text-base mb-2";
          case "sextenary":
              return "text-gray-700 text-base font-thin mb-2";
         default:
            return "text-gray-600 text-sm";
      }
   }

  return (
    <div className={`flex flex-col w-full ${hidden ? "hidden md:block md:invisible" : ""}`}>
      <label className={`${Boolean(tooltipInfo) ? "flex justify-between" : "flex gap-1"} ${getVariantToLabel()}`} htmlFor={name}>
        {text}
        <p className="text-[11px] italic">{subtitle}</p>
        {Boolean(tooltipInfo) && (
          <Tooltips title={tooltipInfo}>
            <Info size={20} weight="fill" />
          </Tooltips>
        )}
      </label>
      <section
        className={`flex justify-between items-center focus-within:ring-2 focus-within:ring-mainColorDarker
            ${getVariant()} transition-all duration-300 ${
          Boolean(disabled) ? "border-none  black" : ""
        }
            ${Boolean(error) ? "border-red-500 text-red-500 focus:border-red-500" : ""}
            `}
      >
        <input
          className="w-full bg-transparent focus:outline-none"
          {...(max ? { max: max } : {})}
          {...(maxLength ? { maxLength: maxLength } : {})}
          {...(minLength ? { minLength: minLength } : {})}
          {...(min ? { min: min } : {})}
          pattern={pattern}
          type={type}
          name={name}
          id={id}
          disabled={disabled}
          autoComplete={autoComplete}
          placeholder={placeholder}
          {...(value ? { value } : {})}
          required={required}
          onChange={onChange}
          {...(defaultValue ? { defaultValue } : {})}
        />
        {isPassword && (
          <button type="button" className="focus:outline-none" onClick={handleChangePasswordView}>
            {!isPasswordView ? <Eye size={20} /> : <EyeSlash size={20} />}
          </button>
        )}
      </section>
      {Boolean(error) && (
        <p
          id={errorId}
          className={`text-red-500 mt-1 text-xs
            ${Boolean(error) ? "opacity-100" : "opacity-0"} transition-all duration-700`}
        >
          {Boolean(error) && errorMessage}
        </p>
      )}
      {Boolean(legend) && <p className="text-gray-600 text-sm mt-1">{legend}</p>}
    </div>
  );
}

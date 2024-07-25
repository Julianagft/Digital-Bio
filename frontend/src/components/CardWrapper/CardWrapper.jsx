export default function CardWrapper({
    children,
    transparent = false,
    customPadding = "px-5 py-6",
    customRounded = "rounded-2xl",
    classNames = "",
    mb = true,
    onClick = () => {},
    minWidth = false,
    borderColor = "border-gray-200",
    shadowClass = "shadow-lg shadow-slate-400/20",
 }) {
    return (
       <div
          onClick={onClick}
          className={`${shadowClass} ${
             transparent
                ? `bg-transparent ${customPadding} flex flex-row ${mb ? "mb-6" : ""} ${classNames} `
                : `bg-white border ${borderColor} ${customPadding} ${customRounded} drop-shadow-3xl flex flex-col flex-1 ${classNames} ${
                     mb ? "mb-6" : ""
                  }`
          } ${minWidth ? "min-w-[170px] max-w-[200px]" : ""}`}
       >
          {children}
       </div>
    );
 }
 
import { CircleNotch } from "phosphor-react";

export default function LoadingSpinCircle({ size = 50, bgColor = "bg-white" }) {
   return (
      <div className={`fixed z-50 inset-0 overflow-y-auto flex items-center justify-center ${bgColor} opacity-80`}>
         <CircleNotch size={size} className="animate-spin mr-2 text-[#1e3a8a]" />
      </div>
   );
}

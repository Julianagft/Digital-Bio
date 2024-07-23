import { toast } from "react-toastify";
import { CheckCircle } from "phosphor-react";
import React from "react";

export default function toastNotification({
  icon = <CheckCircle className="text-green-500" size={24} />,
  message = "Operação realizada com sucesso"
}) {
  return (
    toast(
      <div id="toast-message" className="flex gap-4">
        {icon}
        <span>{message}</span>
      </div>,
      {
        style: {
          background: "#11181C",
          borderRadius: 6,
          fontSize: 14,
          display: "flex",
          right: 0,
        },
      })
   );
}

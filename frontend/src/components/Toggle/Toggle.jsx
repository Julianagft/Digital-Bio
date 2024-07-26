import { Switch } from "@headlessui/react";
import { Fragment } from "react";
import { classNames } from "../../utils/styles/classNames";

export default function Toggle({ checked, name, disabled, onChange }) {

  return (
    <Switch
      name={name}
      onChange={onChange}
      id={name}
      disabled={disabled}
      defaultChecked={checked}
      as={Fragment}
    >
      {({ checked }) => (
          <div className={`${
            checked ? "bg-green-500" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full`}>
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={classNames(
                checked ? "translate-x-5" : "translate-x-1",
                "pointer-events-none inline-block h-5 w-5 transform rounded-full",
                "bg-white shadow ring-0 transition duration-200 ease-in-out"
              )}
            />
          </div>
        )}
    </Switch>
  );
}

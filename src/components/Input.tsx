import { Ref, forwardRef, useId } from "react";

const Input = (
  { label = "", type = "text", className = "", ...props },
  ref: Ref<HTMLInputElement>
) => {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500 ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
};

export default forwardRef(Input);

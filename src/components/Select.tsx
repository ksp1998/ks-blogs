import { Ref, forwardRef, useId } from "react";

function Select(
  { options = [], label = "", className = "", ...props },
  ref: Ref<HTMLSelectElement>
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className=""></label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`w-full px-3 py-2 rounded-md capitalize outline-none duration-200 border ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option} className="capitalize">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);

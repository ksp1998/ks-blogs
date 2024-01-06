const Button = ({
  children = "",
  type = "button",
  bgColor = "bg-teal-700 hover:bg-teal-800 focus:ring-teal-100",
  textColor = "text-white",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`group text-[1rem] inline-flex justify-center items-center py-2 px-5 font-medium text-center rounded-lg shadow-sm focus:ring-4 duration-300 ${bgColor} focus:outline-none ${textColor} ${className} disabled:opacity-80`}
      {...props}
    >
      <div className="hidden mr-2 group-disabled:block h-6 w-6 animate-spin rounded-full border-4 border-t-black border-white" />
      <span className="">{children}</span>
      <svg
        className="group-disabled:hidden ml-2 -mr-1 w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
};

export default Button;

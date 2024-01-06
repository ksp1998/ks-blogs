import toast from "react-hot-toast";

const defaultToastConf = {
  duration: 5000,
  position: "top-center",
};

const success = (text: string, options: Record<string, any> = {}) => {
  options = {
    ...defaultToastConf,
    ...options,
    className: "min-w-[250px] text-start border border-teal-400 bg-teal-50",
  };
  toast.success(text, options);
};

const error = (text: string, options: Record<string, any> = {}) => {
  options = {
    ...defaultToastConf,
    ...options,
    className: "min-w-[250px] text-start border border-teal-400 bg-teal-50",
  };
  toast.success(text, options);
};

export { success, error };

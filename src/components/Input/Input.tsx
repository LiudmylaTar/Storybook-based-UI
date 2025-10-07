import { useFormContext } from "react-hook-form";
import { useState } from "react";
import "./Input.css";

type InputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "number";
  clearable?: boolean;
};
const Input = ({
  name,
  label,
  type = "text",
  placeholder,
  clearable = false,
}: InputProps) => {
  const [show, setShow] = useState(false);
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const value = watch(name);
  const handleClear = () => {
    setValue(name, "");
  };

  return (
    <div className="inputWrapper">
      {label && (
        <label htmlFor={name} className="inputLabel">
          {label}
        </label>
      )}
      <input
        {...register(name)}
        type={type === "password" && show ? "text" : type}
        placeholder={placeholder}
        className="inputField"
      />
      {/* Password toggle */}
      {type === "password" && (
        <button
          type="button"
          className="icon-btn eye-btn"
          onClick={() => setShow((prev) => !prev)}
        >
          <svg width="20" height="20">
            <use
              href={`${"/icons/sprite.svg"}#${
                show ? "icon-eye" : "icon-eye-off"
              }`}
              className="eyeIcon"
            />
          </svg>
        </button>
      )}
      {/* Clearable button */}
      {clearable && value && (
        <button
          type="button"
          className="icon-btn clear-btn"
          onClick={handleClear}
        >
          <svg width="12" height="12">
            <use href={`/icons/sprite.svg#icon-close`} />
          </svg>
        </button>
      )}
      {errors[name] && (
        <span style={{ color: "red" }}>{String(errors[name]?.message)}</span>
      )}
    </div>
  );
};

export default Input;

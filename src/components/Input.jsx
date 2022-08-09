const Input = (props) => (
  <div>
    {props.label && (
      <label className="text-sm text-[#5a5a5a] font-roboto font-bold">
        {props.label}
      </label>
    )}
    {props.error && (
      <span className="text-[0.75rem] text-red-500 font-roboto font-bold block">
        {props.error}
      </span>
    )}
    <input
      type={props.type || "text"}
      className="h-8 px-1 border border-gray-800 rounded-md w-full outline-none text-sm"
      name={props.name}
      onChange={(e) => props.getValue(e.target.value)}
    />
  </div>
);

export default Input;

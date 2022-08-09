const Alert = (props) => (
  <div
    style={{ backgroundColor: props.color || "red" }}
    className="absolute top-0 left-0 right-0 p-2 bg-amber-60 rounded-md z-10"
  >
    <p className="text-lg text-white font-medium font-roboto">{props.text}</p>
  </div>
);

export default Alert;

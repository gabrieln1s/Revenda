const Form = (props) => {
  const style = {

  }

  return( <div
    style={{  gridTemplateColumns: (props.cols || '1fr') }}
    className="grid gap-3 my-3 md:!grid-cols-1"
  >
    {props.children}
  </div>
  )
};

export default Form;

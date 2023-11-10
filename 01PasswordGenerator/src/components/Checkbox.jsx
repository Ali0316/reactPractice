const Checkbox = ({ title, id, customClass, state, onChange }) => {
  return (
    <div className={customClass}>
      <label htmlFor={id}>{title}</label>
      <input type="checkbox" id={id} onChange={onChange} checked={state} />
    </div>
  );
};

export default Checkbox;

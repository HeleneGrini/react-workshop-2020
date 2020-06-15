interface Props {
  type: string;
  label: string;
  name: string;
  value?: string;
  labelAfter?: boolean;
}
export const Input = (props: Props) => {
  return (
    <label className="d-flex flex-column w-50">
      {!props.labelAfter ? <span className="mr-2">{props.label}</span> : null}
      <input type={props.type} name={props.name} value={props.value} />
      {props.labelAfter ? <span className="mr-2">{props.label}</span> : null}
    </label>
  );
};

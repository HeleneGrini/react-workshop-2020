interface Props {
  name: string;
  type: string;
  value: string;
  label: string;
  labelAfter: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Input = (props: Props) => {
  <label className="d-flex flex-column w-50">
    {!props.labelAfter ? <span className="mr-2">{props.label}</span> : null}
    <input
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
    />
    {props.labelAfter ? <span className="mr-2">{props.label}</span> : null}
  </label>;
};

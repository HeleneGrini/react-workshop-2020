interface Props {
  type: string;
  name: string;
  label: string;
  value?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Input = (props: Props) => {
  return (
    <label>
      <div>{props.label}</div>
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
      />
    </label>
  );
};

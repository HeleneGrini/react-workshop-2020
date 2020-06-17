import { useState } from "react";

interface Props {
  form: any;
}

export const FormItem = (props: Props) => {
  const { createdAt, ...rest } = props.form;
  const [show, setShow] = useState(false);
  const entries = Object.entries(rest);
  return (
    <div className="p-4 border">
      <button onClick={() => setShow(!show)}>Show more</button>
      {show &&
        entries.map((entry) => (
          <div>
            {entry[0]}: {entry[1]}
          </div>
        ))}
    </div>
  );
};

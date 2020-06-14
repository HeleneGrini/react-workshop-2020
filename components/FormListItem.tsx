import { useState } from "react";
import firebase from "../firebase/config";

export function FormListItem<
  T extends { createdAt: firebase.firestore.Timestamp } & {
    [key: string]: string;
  }
>(props: { form: T }) {
  const [open, setoOpen] = useState(false);
  const { createdAt, picture, ...rest } = props.form;
  const entries = Object.entries(rest);
  const date = new firebase.firestore.Timestamp(
    props.form.createdAt.seconds,
    props.form.createdAt.nanoseconds
  )
    .toDate()
    .toString();
  const dateString = date.slice(0, date.indexOf("GMT"));

  return (
    <div className="border p-3">
      <div className="d-flex align-items-center">
        Sendt inn: {dateString}
        <div className="ml-auto">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => setoOpen(!open)}
          >
            {open ? "Vis mindre" : "Vis mer"}
          </button>
        </div>
      </div>

      {open ? (
        <div className="d-flex mt-3">
          <div>
            {entries.map((entry, i) => (
              <div key={i}>
                {entry[0]}: {entry[1]}
              </div>
            ))}
          </div>
          {picture.length ? (
            <div className="ml-auto">
              <img src={picture} width="100" height="150" />{" "}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

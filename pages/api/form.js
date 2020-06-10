import firebase from "../../firebase/config";

export default async (req, res) => {
  const forms = firebase.firestore().collection("forms");
  if (req.method === "POST") {
    const data = await forms
      .add(JSON.parse(req.body))
      .then((docRef) => docRef.get().then((doc) => doc.data()));
    res.json(data);
  }
  if (req.method === "GET") {
    const data = await forms
      .get()
      .then((docRef) => docRef.get().then((doc) => doc.data()));
    res.json(data);
  }
};

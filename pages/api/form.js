import firebase from "../../firebase/config";

export default async (req, res) => {
  const forms = firebase.firestore().collection("forms");
  if (req.method === "POST") {
    const data = await forms
      .add({
        ...JSON.parse(req.body),
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      })
      .then((docRef) => docRef.get().then((doc) => doc.data()));
    res.json(data);
  } else {
    const data = await forms
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => snapshot.docs.map((doc) => doc.data()));

    res.json(data);
  }
};

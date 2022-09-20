import { db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import {
  startOfToday,
  startOfWeek,
  startOfMonth,
  startOfYear,
  endOfDay,
  endOfWeek,
  endOfMonth,
  endOfYear,
} from "date-fns";

export const compoundSearchDB = async (parameter, collectionID) => {
  try {
    const collectionRef = collection(db, collectionID);

    const queryArray = ["firstName", "lastName", "id"];

    const queries = queryArray.map((queryParam) => {
      if (collectionID === "guests") {
        return getDocs(
          query(
            collectionRef,
            where(queryParam, "==", parameter.toUpperCase()),
            orderBy("dateOfEntry", "desc")
          )
        );
      }
      return getDocs(
        query(collectionRef, where(queryParam, "==", parameter.toUpperCase()))
      );
    });

    const queryResult = await Promise.all(queries);
    const queryResultArray = queryResult.map((query) => {
      return query.docs;
    });

    const [isFirstNameArray, isLastNameArray, isIDArray] = queryResultArray;

    const queryResultsArray = isFirstNameArray.concat(
      isLastNameArray,
      isIDArray
    );

    return queryResultsArray;
  } catch (error) {
    return console.error(error.message);
  }
};

export const reportsSearch = async (parameter, collectionID) => {
  try {
    const collectionRef = collection(db, collectionID);
    let start;
    let end;
    switch (parameter) {
      case "Daily":
        start = startOfToday();
        end = endOfDay(start);

        break;

      case "Weekly":
        start = startOfWeek(new Date(), { weekStartsOn: 1 });
        end = endOfWeek(start, { weekStartsOn: 1 });

        break;

      case "Monthly":
        start = startOfMonth(new Date());
        end = endOfMonth(start);

        break;

      case "Yearly":
        start = startOfYear(new Date());
        end = endOfYear(start);
        break;

      default:
        break;
    }

    const q = query(
      collectionRef,
      where("dateOfEntry", ">=", start),
      where("dateOfEntry", "<=", end)
    );
    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      const dateOfBirth = doc
        .data()
        .dateOfBirth.toDate()
        .toLocaleString("en-US", { dateStyle: "long" });
      const dateOfEntry = doc
        .data()
        .dateOfEntry.toDate()
        .toLocaleString("en-US", {
          dateStyle: "long",
          timeStyle: "short",
        });
      results.push({ ...doc.data(), dateOfBirth, dateOfEntry });
    });
    return results;
  } catch (error) {
    return console.error(error.message);
  }
};

export const profileSearch = async (param) => {
  try {
    const docRef = doc(db, "users", param);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return "No such document!";
    }
  } catch (error) {
    return console.error(error.message);
  }
};

export const usersSearch = async () => {
  try {
    const collectionRef = collection(db, "users");

    const querySnapshot = await getDocs(collectionRef);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ ...doc.data() });
    });
    return results;
  } catch (error) {
    return console.error(error.message);
  }
};

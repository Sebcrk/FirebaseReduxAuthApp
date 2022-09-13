import { useCallback } from "react";
import { db } from "./../firebase";
import {
  collection,
  getDocs,
  where,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

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
    console.log(error.message);
  }
};

// export const searchDB = async () => {
//   try {
//     const guestsRef = collection(db, "guests");

//     const q = query(guestsRef, orderBy("dateOfEntry", "desc"), limit(8));

//     const results = [];
//     const queryResult = await onSnapshot(q, (querySnapshot) => {
//       querySnapshot.forEach((doc) => {  
//         results.push(doc.data());
//       });
//     });
//     console.log(results);
//     return results;
//   } catch (error) {
//     console.log(error.message);
//     return error.message;
//   }
// };

import {
    doc,
    updateDoc,
    query,
    where,
    collection,
    getDocs
} from 'firebase/firestore';
import { db } from './loginAPI';

const changePayments = async (user, amount, isPayer) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", user));

    const snapshot = await getDocs(q);
    snapshot.forEach(async document => {
        const docRef = doc(usersRef, document.id);

        if (isPayer) {
            await updateDoc(docRef, {
                peopleToPay: document.data().peopleToPay - 1,
                total: {
                    ...document.data().total,
                    paying: document.data().total.paying - amount
                }
            })
        } else {
            await updateDoc(docRef, {
                peopleToReceive: document.data().peopleToReceive - 1,
                total: {
                    ...document.data().total,
                    receiving: document.data().total.receiving - amount
                }
            });
        }
    })
}

export {
    changePayments
};
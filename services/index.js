import { fetchRequest } from "./utils";
import { URLS } from "./endPoints";
import { db } from "../firebase/config";
import { doc, getDocs, collection, addDoc, where, deleteDoc, query, orderBy } from "firebase/firestore";

const fetchCryptoList = async (page = 0, limit = 15) => {
    const url = URLS.CRYPTO_LIST + `/?start=${page * limit}&limit=${limit}`;
    try {
        const response = await fetchRequest(url);
        return response?.data;
    } catch (error) {
        console.log("Error fetching crypto list:", error);
        return null;
    }
};

const fetchCrypto = async (id = "") => {
    const url = URLS.CRYPTO + id;
    try {
        const response = await fetchRequest(url);
        if (response?.length > 0) {
            return response[0];
        }
        return null;
    } catch (error) {
        console.log("Error fetching crypto:", error);
        return null;
    }
};

const addToFavourites = async (crypto) => {
    try {
        const insertedDoc = await addDoc(collection(db, "favouriteCryptos"), crypto);
        console.log(`Document created, id is: ${insertedDoc.id}`);
        return true;
    } catch (err) {
        console.log(`${err.message}`);
        return false;
    }
};

const fetchMyFavourites = async () => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "favouriteCryptos"), orderBy("rank", "asc")));
        const documents = querySnapshot.docs;
        return documents?.map((item) => item?.data()) ?? [];
    } catch (err) {
        console.log(err.message);
        return null;
    }
};

const removeFromFavourites = async (cryptoId) => {
    try {
        const q = query(collection(db, "favouriteCryptos"), where("id", "==", cryptoId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const docToDelete = querySnapshot.docs[0];
            await deleteDoc(doc(db, "favouriteCryptos", docToDelete.id));
            console.log(`Crypto with id=${cryptoId} deleted from favourites`);
            return true;
        }
        console.log(`No favourite found with id=${cryptoId}`);
        return true;
    } catch (err) {
        console.error("Error deleting favourite crypto:", err.message);
        return false;
    }
};

const removeFavourites = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "favouriteCryptos"));
        const deletions = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
        await Promise.all(deletions);
        console.log(`Deleted ${querySnapshot.size} documents from ${"favouriteCryptos"}`);
        return true;
    } catch (error) {
        console.error("Error deleting collection:", error);
        return false;
    }
};

export const SERVICES = {
    fetchCryptoList,
    fetchCrypto,
    addToFavourites,
    fetchMyFavourites,
    removeFromFavourites,
    removeFavourites,
};

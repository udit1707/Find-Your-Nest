export const getData = async () => {
    return fetch('https://mocki.io/v1/c1b8d087-971c-472f-870c-47185f710c17').then(res=>res.json());
};

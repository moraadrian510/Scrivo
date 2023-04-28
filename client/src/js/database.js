import { openDB as idbOpenDB } from 'idb';

const initDb = async () => {
  try {
    const jateDb = await idbOpenDB('jate', 1);
    if (jateDb.objectStoreNames.contains('jate')) {
      console.log('jate database already exists');
      return;
    }
    jateDb.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
    console.log('jate database created');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export const putDb = async (content) => {
  try {
    console.log('PUT to the database');
    const jateDb = await idbOpenDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ id: 1, value: content });
    const result = await request;
    console.log(':rocket: - data saved', result.value);
  } catch (error) {
    console.error('Error putting data into database:', error);
  }
};

export const getDb = async () => {
  try {
    console.log('GET from the database');
    const jateDb = await idbOpenDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.get(1);
    const result = await request;
    result
      ? console.log(':rocket: - data retrieved', result.value)
      : console.log(':rocket: - data not found');
    return result?.value;
  } catch (error) {
    console.error('Error getting data from database:', error);
  }
};

initDb();

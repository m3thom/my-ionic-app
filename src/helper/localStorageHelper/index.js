import { Storage } from '@capacitor/storage';

export const setLocalData = async (key, value) => {
    const stringified = JSON.stringify(value)
    await Storage.set({
        key,
        value: stringified,
    });
}

export const getLocalData = async (key) => {
    const { value } = await Storage.get({ key });
    const parsed = JSON.parse(value);
    return parsed
}

export const resetLocalData = async () => {
    await Storage.clear();
}

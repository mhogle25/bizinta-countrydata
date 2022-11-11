import useLocalStorageState from "use-local-storage-state";

export function useCountryUrl(countryCode) {
  return useLocalStorageState(`countries/${ countryCode }/url`, { defaultValue: "" });
}

export function useCountryComment(countryCode) {
  return useLocalStorageState(`countries/${ countryCode }/comment`, { defaultValue: "" });
}

export function useCountryContacts(countryCode) {
  return useLocalStorageState(`countries/${ countryCode }/contacts`, { defaultValue: [] });
}

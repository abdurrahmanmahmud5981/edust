import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState, store } from "../store"
import { signOut } from "../features"

/**
 * Creates a base query function for interacting with API version v0.
 *
 * The function generates a base query with an optional `basePath`. If provided, the `basePath` is appended to the base API URL.
 * The function includes authentication headers if a access_token is found in localStorage, adding it as a `Bearer` access_token in the `Authorization` header.
 * It also includes credentials for cross-origin requests.
 *
 * @param {string} [basePath] - An optional path to append to the base API URL. If not provided, no additional path is appended.
 * @returns {ReturnType<typeof fetchBaseQuery>} A base query function ready for use with RTK Query endpoints.
 *
 * @example
 * // Example of usage with a specific endpoint
 * const apiQuery = apiV0BaseQuery('users');
 * // Sends requests to: `${VITE_BACKEND_URL}/api/v0/users`
 *
 * @example
 * // Example of usage without a basePath
 * const apiQuery = apiV0BaseQuery();
 * // Sends requests to: `${VITE_BACKEND_URL}/api/v0`
 */
export const apiV0BaseQuery = (
  basePath?: string,
): ReturnType<typeof fetchBaseQuery> => {
  return fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v0${basePath || ""}`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authentication.auth?.token

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      } else {
        store.dispatch(signOut())
      }

      return headers
    },
  })
}

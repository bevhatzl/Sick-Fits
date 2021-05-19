import { ListAccessArgs } from "./types";

// The access control returns a yes or a no value depending if the user is signed in. 

export function isSignedIn({ session }: ListAccessArgs) {
  // The "!!" means that.. If undefined, it will return false (meaning they are not signed in). If they are signed in it will return true. The !! coerces the truthy and falsy values to booleans of true or false.
  return !!session;
}
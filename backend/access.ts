import { permissionsList } from "./schemas/fields";
import { ListAccessArgs } from "./types";

// The access control returns a yes or a no value depending if the user is signed in. 

export function isSignedIn({ session }: ListAccessArgs) {
  // The "!!" means that.. If undefined, it will return false (meaning they are not signed in). If they are signed in it will return true. The !! coerces the truthy and falsy values to booleans of true or false.
  return !!session;
}

const generatedPermissions = Object.fromEntries(permissionsList.map
  (permission => [
    permission, 
    function({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission]
    }
  ])    
);

// Permissions check if someone meets a criteria - yes or no.
export const permissions = {
  ...generatedPermissions,
  isAwesome({ session }: ListAccessArgs): boolean {
    return session?.data.name.includes('bev');
  }
};

// Rule based functions
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD.
export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
        return false;
      }
    // 1. Do they have the permission of canManageProducts?
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // 2. If not, do they own this item?
    return { user: { id: session.itemId }};
  },
  canOrder({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // 1. Do they have the permission of canManageProducts?
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // 2. If not, do they own this item?
    return { user: { id: session.itemId }};
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
        return false;
      }
    // 1. Do they have the permission of canManageProducts?
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // 2. If not, do they own this item?
    return { order: { user: { id: session.itemId }}};
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
        return false;
      }
    if (permissions.canManageProducts({ session })) {
      return true; // They can read everything!
    }
    // They should only see available products based on the status field
    return { status: 'AVAILABLE' }
  }
};
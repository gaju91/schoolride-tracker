import type { Role } from "@/domain/boarding/boarding.types";
export const ROLE_KEY="schoolride-demo-role";
export function setRole(role:Role){localStorage.setItem(ROLE_KEY,role);document.cookie=`demo_role=${role};path=/;max-age=86400;samesite=lax`}
export function clearRole(){localStorage.removeItem(ROLE_KEY);document.cookie="demo_role=;path=/;max-age=0"}

import { NextRequest, NextResponse } from "next/server";
import { getUserRole } from "./lib/auth/roleServer";

const PATIENT_DASHBOARD = "/patient/dashboard";
const DOCTOR_DASHBOARD = "/doctor/dashboard";
const PENDING_PAGE = "/doctor/verification-pending";
const LOGIN_PAGE = "/login";

const isPatientRoute = (path: string) => path.startsWith("/patient");
const isDoctorRoute = (path: string) => path.startsWith("/doctor");

export async function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  console.info("[Middleware] Incoming request:", {
    path: pathname,
    search: url.search,
    method: req.method,
  });

  const roleResult = await getUserRole();
  console.info("[Middleware] Role result:", roleResult);

  // Unauthenticated or unknown role
  if (roleResult.role === null) {
    if (isPatientRoute(pathname) || isDoctorRoute(pathname)) {
      console.warn("[Middleware] Unauthenticated user accessing protected route. Redirecting to login.", {
        path: pathname,
        target: LOGIN_PAGE,
      });
      url.pathname = LOGIN_PAGE;
      return NextResponse.redirect(url);
    }
    console.debug("[Middleware] Public route or unauthenticated user. Passing through.", { path: pathname });
    return NextResponse.next();
  }

  // Patient logic
  if (roleResult.role === "patient") {
    if (isDoctorRoute(pathname)) {
      if (pathname !== PATIENT_DASHBOARD) {
        console.warn("[Middleware] Patient attempted to access doctor route. Redirecting to patient dashboard.", {
          path: pathname,
          target: PATIENT_DASHBOARD,
        });
        url.pathname = PATIENT_DASHBOARD;
        return NextResponse.redirect(url);
      }
    }
    console.debug("[Middleware] Patient access permitted.", { path: pathname });
    return NextResponse.next();
  }

  // Doctor logic
  if (roleResult.role === "doctor") {
    // Pending doctor
    if (roleResult.status === "pending") {
      if (pathname !== PENDING_PAGE) {
        console.info("[Middleware] Pending doctor redirected to verification page.", {
          path: pathname,
          target: PENDING_PAGE,
        });
        url.pathname = PENDING_PAGE;
        return NextResponse.redirect(url);
      }
      console.debug("[Middleware] Pending doctor on verification page. Passing through.");
      return NextResponse.next();
    }

    // Approved doctor
    if (roleResult.status === "approved") {
      if (isPatientRoute(pathname)) {
        if (pathname !== DOCTOR_DASHBOARD) {
          console.warn("[Middleware] Approved doctor attempted to access patient route. Redirecting to doctor dashboard.", {
            path: pathname,
            target: DOCTOR_DASHBOARD,
          });
          url.pathname = DOCTOR_DASHBOARD;
          return NextResponse.redirect(url);
        }
      }
      console.debug("[Middleware] Approved doctor access permitted.", { path: pathname });
      return NextResponse.next();
    }
  }

  // Fallback
  console.error("[Middleware] Fallback redirect to login. Unexpected state.", {
    path: pathname,
    roleResult,
  });
  url.pathname = LOGIN_PAGE;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/patient/:path*", "/doctor/:path*"],
};
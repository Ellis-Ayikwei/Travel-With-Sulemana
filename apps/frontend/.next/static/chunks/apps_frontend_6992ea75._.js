(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/frontend/contexts/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
// Dynamic import to handle react-auth-kit's export structure
let ReactAuthKit;
try {
    ReactAuthKit = __turbopack_context__.r("[project]/node_modules/react-auth-kit/dist/index.js [app-client] (ecmascript)");
} catch (e) {
    ReactAuthKit = {};
}
function useAuth() {
    _s();
    // Call hooks unconditionally - React requirement
    // Wrap in try-catch to handle cases where react-auth-kit isn't loaded
    let signIn = null;
    let signOut = null;
    let authUser = null;
    let isAuthenticated = null;
    try {
        if (ReactAuthKit.useSignIn) {
            signIn = ReactAuthKit.useSignIn();
        }
        if (ReactAuthKit.useSignOut) {
            signOut = ReactAuthKit.useSignOut();
        }
        if (ReactAuthKit.useAuthUser) {
            authUser = ReactAuthKit.useAuthUser();
        }
        if (ReactAuthKit.useIsAuthenticated) {
            isAuthenticated = ReactAuthKit.useIsAuthenticated();
        }
    } catch (error) {
        console.error("Error initializing react-auth-kit hooks", error);
    }
    // Make state reactive with useState
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAuth, setIsAuth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Get user data - authUser is a function that returns the user
    const getUser = ()=>{
        try {
            if (authUser && typeof authUser === 'function') {
                const user = authUser();
                return user;
            }
            // Fallback: check localStorage token and decode
            if ("TURBOPACK compile-time truthy", 1) {
                const token = localStorage.getItem("campusride_access_token");
                if (token) {
                    try {
                        const base64Url = token.split('.')[1];
                        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c)=>'%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
                        const decoded = JSON.parse(jsonPayload);
                        return {
                            id: decoded.id,
                            email: decoded.email,
                            first_name: "",
                            last_name: "",
                            user_type: decoded.user_type
                        };
                    } catch (e) {
                    // Token decode failed
                    }
                }
            }
        } catch (error) {
            console.error("Error getting user", error);
        }
        return null;
    };
    // Check if authenticated
    const getIsAuthenticated = ()=>{
        try {
            if (isAuthenticated && typeof isAuthenticated === 'function') {
                return isAuthenticated();
            }
            // Fallback: check if token exists
            if ("TURBOPACK compile-time truthy", 1) {
                const token = localStorage.getItem("campusride_access_token");
                return !!token;
            }
        } catch (error) {
            console.error("Error checking authentication", error);
        }
        return false;
    };
    // Sync state with react-auth-kit on mount and when it changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAuth.useEffect": ()=>{
            const updateAuthState = {
                "useAuth.useEffect.updateAuthState": ()=>{
                    const user = getUser();
                    const authenticated = getIsAuthenticated();
                    setCurrentUser(user);
                    setIsAuth(authenticated);
                }
            }["useAuth.useEffect.updateAuthState"];
            // Initial load
            updateAuthState();
            // Poll for changes every 2 seconds (react-auth-kit should trigger re-renders, but this ensures sync)
            const interval = setInterval(updateAuthState, 2000);
            // Also listen for storage changes (when logout clears localStorage)
            const handleStorageChange = {
                "useAuth.useEffect.handleStorageChange": ()=>{
                    updateAuthState();
                }
            }["useAuth.useEffect.handleStorageChange"];
            window.addEventListener('storage', handleStorageChange);
            return ({
                "useAuth.useEffect": ()=>{
                    clearInterval(interval);
                    window.removeEventListener('storage', handleStorageChange);
                }
            })["useAuth.useEffect"];
        }
    }["useAuth.useEffect"], [
        authUser,
        isAuthenticated
    ]);
    return {
        user: currentUser,
        isAuthenticated: isAuth,
        isLoading: false,
        login: (access, refresh, userData)=>{
            // Store tokens in localStorage (for backward compatibility with api.ts)
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem("campusride_access_token", access);
                if (refresh) localStorage.setItem("campusride_refresh_token", refresh);
            }
            // Try to get user data from parameter, token, or fetch from API
            let authState = userData || null;
            if (!authState) {
                // Decode token to get user info as fallback
                try {
                    const base64Url = access.split('.')[1];
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c)=>'%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
                    const decoded = JSON.parse(jsonPayload);
                    authState = {
                        id: decoded.id,
                        email: decoded.email,
                        first_name: "",
                        last_name: "",
                        user_type: decoded.user_type
                    };
                } catch (error) {
                    console.error("Failed to decode token", error);
                    return;
                }
            }
            // Use react-auth-kit's signIn
            if (signIn && typeof signIn === 'function') {
                try {
                    const success = signIn({
                        token: access,
                        expiresIn: 604800,
                        tokenType: "Bearer",
                        authState: authState
                    });
                    // Immediately update state if signIn succeeded
                    if (success) {
                        setCurrentUser(authState);
                        setIsAuth(true);
                    }
                } catch (error) {
                    console.error("Failed to sign in with react-auth-kit", error);
                }
            } else {
                // Fallback: update state directly if react-auth-kit isn't available
                setCurrentUser(authState);
                setIsAuth(true);
            }
        },
        logout: ()=>{
            // Clear tokens from localStorage
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.removeItem("campusride_access_token");
                localStorage.removeItem("campusride_refresh_token");
            }
            if (signOut && typeof signOut === 'function') {
                try {
                    signOut();
                } catch (error) {
                    console.error("Failed to sign out with react-auth-kit", error);
                }
            }
            // Immediately update state
            setCurrentUser(null);
            setIsAuth(false);
        },
        refreshUser: async ()=>{
            // For now, just return - react-auth-kit handles state automatically
            return Promise.resolve();
        }
    };
}
_s(useAuth, "z8vmKhz9dhLqeVf0Dw9PjVrfvJQ=");
const AuthProvider = ReactAuthKit.AuthProvider || ((props)=>props.children);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/frontend/components/providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/contexts/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function Providers(param) {
    let { children } = param;
    _s();
    const [queryClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "Providers.useState": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClient"]({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                        refetchOnWindowFocus: false
                    }
                }
            })
    }["Providers.useState"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
        client: queryClient,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
            attribute: "class",
            defaultTheme: "dark",
            enableSystem: false,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProvider"], {
                authType: "localstorage",
                authName: "_auth",
                cookieDomain: ("TURBOPACK compile-time truthy", 1) ? window.location.hostname : "TURBOPACK unreachable",
                cookieSecure: false,
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/frontend/components/providers.tsx",
                lineNumber: 24,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/frontend/components/providers.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/frontend/components/providers.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(Providers, "f/7BZILF/fNND3CteZQSTywI90c=");
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_frontend_6992ea75._.js.map
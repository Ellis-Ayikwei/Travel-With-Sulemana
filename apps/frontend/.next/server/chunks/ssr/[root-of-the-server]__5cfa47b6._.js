module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/apps/frontend/contexts/AuthContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
// Dynamic import to handle react-auth-kit's export structure
let ReactAuthKit;
try {
    ReactAuthKit = __turbopack_context__.r("[project]/node_modules/react-auth-kit/dist/index.js [app-ssr] (ecmascript)");
} catch (e) {
    ReactAuthKit = {};
}
function useAuth() {
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
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAuth, setIsAuth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Get user data - authUser is a function that returns the user
    const getUser = ()=>{
        try {
            if (authUser && typeof authUser === 'function') {
                const user = authUser();
                return user;
            }
            // Fallback: check localStorage token and decode
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
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
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        } catch (error) {
            console.error("Error checking authentication", error);
        }
        return false;
    };
    // Sync state with react-auth-kit on mount and when it changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const updateAuthState = ()=>{
            const user = getUser();
            const authenticated = getIsAuthenticated();
            setCurrentUser(user);
            setIsAuth(authenticated);
        };
        // Initial load
        updateAuthState();
        // Poll for changes every 2 seconds (react-auth-kit should trigger re-renders, but this ensures sync)
        const interval = setInterval(updateAuthState, 2000);
        // Also listen for storage changes (when logout clears localStorage)
        const handleStorageChange = ()=>{
            updateAuthState();
        };
        window.addEventListener('storage', handleStorageChange);
        return ()=>{
            clearInterval(interval);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [
        authUser,
        isAuthenticated
    ]);
    return {
        user: currentUser,
        isAuthenticated: isAuth,
        isLoading: false,
        login: (access, refresh, userData)=>{
            // Store tokens in localStorage (for backward compatibility with api.ts)
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
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
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
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
const AuthProvider = ReactAuthKit.AuthProvider || ((props)=>props.children);
}),
"[project]/apps/frontend/components/providers.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/contexts/AuthContext.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function Providers({ children }) {
    const [queryClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QueryClient"]({
            defaultOptions: {
                queries: {
                    staleTime: 60 * 1000,
                    refetchOnWindowFocus: false
                }
            }
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
        client: queryClient,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
            attribute: "class",
            defaultTheme: "dark",
            enableSystem: false,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthProvider"], {
                authType: "localstorage",
                authName: "_auth",
                cookieDomain: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : undefined,
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
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5cfa47b6._.js.map
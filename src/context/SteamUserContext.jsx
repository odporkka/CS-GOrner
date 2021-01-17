import React, { createContext } from 'react'

// Values that context should have
const initialValues = {
    steamUser: null,
    setSteamUser: () => {}
}
export const SteamUserContext = createContext(initialValues)



/**
 * Context for Steam user
 * Actual state and setter are hosted in App.js root component.
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const SteamUserContextAPIProvider = (props) => {
    const value = {
        steamUser: props.steamUser,
        setSteamUser: props.setSteamUser
    }

    return (
        <SteamUserContext.Provider value={value}>
            {props.children}
        </SteamUserContext.Provider>
    )
}

export default SteamUserContextAPIProvider


// class AuthService {
//     UserManager;
//
//     constructor() {
//         this.UserManager = new UserManager({
//             ...IDENTITY_CONFIG,
//             userStore: new WebStorageStateStore({ store: window.sessionStorage }),
//             metadata: {
//                 ...METADATA_OIDC
//             }
//         });
//         // Logger
//         Log.logger = console;
//         Log.level = Log.DEBUG;
//         this.UserManager.events.addUserLoaded((user) => {
//             if (window.location.href.indexOf("signin-oidc") !== -1) {
//                 this.navigateToScreen();
//             }
//         });
//         this.UserManager.events.addSilentRenewError((e) => {
//             console.log("silent renew error", e.message);
//         });
//
//         this.UserManager.events.addAccessTokenExpired(() => {
//             console.log("token expired");
//             this.signinSilent();
//         });
//     }
//
//     signinRedirectCallback = () => {
//         this.UserManager.signinRedirectCallback().then(() => {
//             "";
//         });
//     };
//
//
//     getUser = async () => {
//         const user = await this.UserManager.getUser();
//         if (!user) {
//             return await this.UserManager.signinRedirectCallback();
//         }
//         return user;
//     };
//
//     parseJwt = (token) => {
//         const base64Url = token.split(".")[1];
//         const base64 = base64Url.replace("-", "+").replace("_", "/");
//         return JSON.parse(window.atob(base64));
//     };
//
//
//     signinRedirect = () => {
//         localStorage.setItem("redirectUri", window.location.pathname);
//         this.UserManager.signinRedirect({});
//     };
//
//
//     navigateToScreen = () => {
//         window.location.replace("/en/dashboard");
//     };
//
//
//     isAuthenticated = () => {
//         const oidcStorage = JSON.parse(sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_AUTH_URL}:${process.env.REACT_APP_IDENTITY_CLIENT_ID}`))
//
//         return (!!oidcStorage && !!oidcStorage.access_token)
//     };
//
//     signinSilent = () => {
//         this.UserManager.signinSilent()
//             .then((user) => {
//                 console.log("signed in", user);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     };
//     signinSilentCallback = () => {
//         this.UserManager.signinSilentCallback();
//     };
//
//     createSigninRequest = () => {
//         return this.UserManager.createSigninRequest();
//     };
//
//     logout = () => {
//         this.UserManager.signoutRedirect({
//             id_token_hint: localStorage.getItem("id_token")
//         });
//         this.UserManager.clearStaleState();
//     };
//
//     signoutRedirectCallback = () => {
//         this.UserManager.signoutRedirectCallback().then(() => {
//             localStorage.clear();
//             window.location.replace(process.env.REACT_APP_PUBLIC_URL);
//         });
//         this.UserManager.clearStaleState();
//     };
// }

// const AuthService = () => {
//     const manager = new UserManager({
//         ...IDENTITY_CONFIG,
//         userStore: new WebStorageStateStore({ store: window.sessionStorage }),
//         metadata: {
//             ...METADATA_OIDC
//         }
//     })
//     // Logger
//     Log.logger = console
//     Log.level = Log.DEBUG
//     manager.events.addUserLoaded((user) => {
//         if (window.location.href.indexOf("signin-oidc") !== -1) {
//             navigateToScreen()
//         }
//     })
//     manager.events.addSilentRenewError((e) => {
//         console.log("silent renew error", e.message)
//     })
//
//     manager.events.addAccessTokenExpired(() => {
//         console.log("token expired")
//         signinSilent()
//     })
//
//     const signinRedirectCallback = () => {
//         manager.signinRedirectCallback().then(() => {
//             ""
//         })
//     }
//
//     const getUser = async () => {
//         const user = await manager.getUser()
//         if (!user) {
//             return await manager.signinRedirectCallback()
//         }
//         return user
//     }
//
//     const parseJwt = (token) => {
//         const base64Url = token.split(".")[1]
//         const base64 = base64Url.replace("-", "+").replace("_", "/")
//         return JSON.parse(window.atob(base64))
//     }
//
//     const signinRedirect = () => {
//         localStorage.setItem("redirectUri", window.location.pathname)
//         manager.signinRedirect({})
//     }
//
//     const navigateToScreen = () => {
//         window.location.replace("/en/dashboard")
//     }
//
//     const isAuthenticated = () => {
//         const oidcStorage = JSON.parse(sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_AUTH_URL}:${process.env.REACT_APP_IDENTITY_CLIENT_ID}`))
//
//         return (!!oidcStorage && !!oidcStorage.access_token)
//     }
//
//     const signinSilent = () => {
//         manager.signinSilent()
//             .then((user) => {
//                 console.log("signed in", user)
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//     }
//
//     const signinSilentCallback = () => {
//         manager.signinSilentCallback()
//     }
//
//     const createSigninRequest = () => {
//         return manager.createSigninRequest()
//     }
//
//     const logout = () => {
//         manager.signoutRedirect({
//             id_token_hint: localStorage.getItem("id_token")
//         })
//         manager.clearStaleState()
//     }
//
//     const signoutRedirectCallback = () => {
//         manager.signoutRedirectCallback().then(() => {
//             localStorage.clear()
//             window.location.replace(process.env.REACT_APP_PUBLIC_URL)
//         })
//         manager.clearStaleState()
//     }
// }
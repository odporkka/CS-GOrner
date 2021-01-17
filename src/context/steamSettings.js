export const IDENTITY_CONFIG = {
    // authority: process.env.REACT_APP_AUTH_URL, //(string): The URL of the OIDC provider.
    authority: 'https://steamcommunity.com/openid/',
    client_id: 'csgorner', //(string): Your client application's identifier as registered with the OIDC provider.
    redirect_uri: 'https://google.com/login', //The URI of your client application to receive a response from the OIDC provider.
    login: 'https://localhost:3000/login',
    automaticSilentRenew: false, //(boolean, default: false): Flag to indicate if there should be an automatic attempt to renew the access token prior to its expiration.
    loadUserInfo: false, //(boolean, default: true): Flag to control if additional identity data is loaded from the user info endpoint in order to populate the user's profile.
    silent_redirect_uri: 'https://localhost:3000/login', //(string): The URL for the page containing the code handling the silent renew.
    post_logout_redirect_uri: 'https://localhost:3000/login', // (string): The OIDC post-logout redirect URI.
    audience: "https://csgorner.com", //is there a way to specific the audience when making the jwt
    responseType: "id_token token", //(string, default: 'id_token'): The type of response desired from the OIDC provider.
    grantType: "password",
    scope: "openid example.api", //(string, default: 'openid'): The scope being requested from the OIDC provider.
    webAuthResponseType: "id_token token"
};

export const METADATA_OIDC = {
    issuer: "https://steamcommunity.com/openid",
    jwks_uri: "https://steamcommunity.com/openid/.well-known/openid-configuration/jwks",
    authorization_endpoint: "https://steamcommunity.com/openid/connect/authorize",
    token_endpoint: "https://steamcommunity.com/openid/connect/token",
    userinfo_endpoint: "https://steamcommunity.com/openid/connect/userinfo",
    end_session_endpoint: "https://steamcommunity.com/openid/connect/endsession",
    check_session_iframe: "https://steamcommunity.com/openid/connect/checksession",
    revocation_endpoint: "https://steamcommunity.com/openid/connect/revocation",
    introspection_endpoint: "https://steamcommunity.com/openid/connect/introspect"
};
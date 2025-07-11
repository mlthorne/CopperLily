export const authConfig = {
    authority: 'https://yardidev.yardione.com', // Replace with your OIDC provider URL
    clientId: 'yardidev_mltspa', // Replace with your OIDC client ID
    redirectUrl: window.location.origin, // Redirect URI after login
    postLogoutRedirectUri: window.location.origin, // Redirect URI after logout
    responseType: 'code', // Use Authorization Code Flow
    scope: 'openid profile email', // Scopes you want to request
    silentRenew: true, // Enable silent token renewal
    useRefreshToken: true, // Use refresh tokens if supported
};

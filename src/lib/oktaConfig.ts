export const oktaConfig = {

    clientId: '0oamh4zkq7IRIxrFp5d7',
    issuer: 'https://dev-53173284.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

export default async function urlOpener(url, redirectUrl) {
    const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
        url,
        redirectUrl
    );
  
    if (type === 'success') {
        WebBrowser.dismissBrowser();
        return Linking.openURL(newUrl);
    }
  } 
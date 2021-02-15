import "@babel/polyfill"; // hacky fix that makes the web verison work
import React, { useEffect, useState } from "react";
import { Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';


// screens
import HomeScreen from "./screens/HomeScreen";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ConfirmCodeScreen from "./screens/ConfirmCodeScreen";
import UserScreen from "./screens/UserScreen";
import NewTaskScreen from "./screens/NewTaskScreen";

// aws
import Amplify, { Auth, Hub } from "aws-amplify";
import awsmobile from "./aws-exports";

// another hacky amplify fix :/ (https://github.com/aws-amplify/amplify-js/issues/5127)
async function urlOpener(url, redirectUrl) {
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
      url,
      redirectUrl
  );

  if (type === 'success') {
      WebBrowser.dismissBrowser();
      return Linking.openURL(newUrl);
  }
}
let configUpdate = awsmobile;
configUpdate.oauth.redirectSignIn = `${ Linking.makeUrl() }/`;
configUpdate.oauth.redirectSignOut = `${ Linking.makeUrl() }/`;
configUpdate.oauth = Platform.OS != "web" ? { ...configUpdate.oauth, urlOpener } : configUpdate.oauth;
Amplify.configure({ ...configUpdate, Analytics: { disabled: true } }); // Note: Disabling analytics was a hacky way of getting warning to disappear

// fonts
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";

// contexts
import AuthContext from "./contexts/AuthContext";

// Theming
const theme = {
  dark: true,
  colors: {
    primary: "#1f253d",
    background: "#323d63",
    card: "#e0e1dd",
    text: "#cfcfcf",
    hintText: "#8a8a8a",
    border: "#adadad",
    notification: "#000000",
  },
};

// Setup Layout
const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSignout, setIsSignout] = useState(false);

  // on app start
  const getUser = async () =>  {
    try {
      setUser(await Auth.currentAuthenticatedUser());
    } catch(error) {
      console.log('Not signed in: ' + error)
    }
    setLoading(false);
  }

  useEffect(() => {
    Hub.listen("auth", async ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          await getUser();
          break;
        case "signOut":
          setUser(null);
          break;
      }
    });
    getUser();
  }, []);

  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  const authContext = React.useMemo(
    () => ({
      login: async (email: string, password: string) => {
        try {
          await Auth.signIn(email, password);
          setIsSignout(false);
        } catch (error) {
          alert("Error signing in: " + error.message);
        }
      },
      loginWithGoogle: async () => {
        await Auth.federatedSignIn({ provider: "Google" });
        setIsSignout(false);
      },
      logout: async () => {
        try {
          await Auth.signOut();
          setIsSignout(true);
        } catch (error) {
          alert("Error signing out: " + error.message);
        }
      },
      register: async (email: string, password: string) => {
        let username = email;
        try {
          await Auth.signUp({
              username,
              password,
          });
          } catch (error) {
            alert("Error signing up:" + error.message);
          }
      },
      confirmRegister: async (email: string, code: string) => {
        try {
          await Auth.confirmSignUp(email, code);
        } catch (error) {
            console.log('error confirming sign up', error);
        }
      }
    }),
    []
  );

  const basicScreenOptions = {
    animationTypeForReplace: isSignout ? "pop" : "push",
    headerShown: false,
  };
  const regularScreenOptions = {
    animationTypeForReplace: isSignout ? "pop" : "push",
    title: "",
    headerShown: true,
    headerTintColor: theme.colors.text,
    headerStyle: {
      backgroundColor: theme.colors.background,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    }
  };
  
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={theme}>
        <StatusBar backgroundColor={theme.colors.background} />
        <Stack.Navigator>
          {loading || !fontsLoaded ? (
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          ) : !user ? (
            <>
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={basicScreenOptions}
              />
              <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={regularScreenOptions}
              />
              <Stack.Screen
                name="ConfirmCodeScreen"
                component={ConfirmCodeScreen}
                options={regularScreenOptions}
              />
            </>
          ) : (
            <>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={basicScreenOptions}
            />
            <Stack.Screen
              name="UserScreen"
              component={UserScreen}
              options={regularScreenOptions}
            />
            <Stack.Screen
              name="NewTaskScreen"
              component={NewTaskScreen}
              options={regularScreenOptions}
            />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

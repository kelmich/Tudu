import "@babel/polyfill"; // hacky fix that makes the web verison work
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// screens
import HomeScreen from "./screens/HomeScreen";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ConfirmCodeScreen from "./screens/ConfirmCodeScreen";

// aws
import Amplify, { Auth } from "aws-amplify";
import awsmobile from "./aws-exports";
Amplify.configure({ ...awsmobile, Analytics: { disabled: true } }); // Note: Disabling analytics was a hacky way of getting warning to disappear

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
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            isLoading: false,
            isLoggedIn: true,
          };
        case "LOGIN":
          return {
            ...prevState,
            isSignout: false,
            isLoggedIn: true,
          };
        case "LOGOUT":
          return {
            ...prevState,
            isLoading: false,
            isSignout: true,
            isLoggedIn: false,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      isLoggedIn: false,
    }
  );

  // on app start
  useEffect(() => {
    const restoreToken = async () => {
      let user;
      try {
        user = await Auth.currentAuthenticatedUser();
        dispatch({ type: "RESTORE_TOKEN" });
      } catch (e) {
        // Restoring token failed
        console.log("Error retrieving token: "+ e);
        dispatch({ type: "LOGOUT" });
      }
    };
    restoreToken();
  }, []);

  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  const authContext = React.useMemo(
    () => ({
      login: async (email: string, password: string) => {
        try {
          await Auth.signIn(email, password);
          dispatch({ type: "LOGIN" });
        } catch (error) {
          alert("Error signing in: " + error.message);
        }
      },
      loginWithGoogle: async () => {
        await Auth.federatedSignIn();
        dispatch({ type: "LOGIN" });
      },
      logout: async () => {
        try {
          await Auth.signOut();
          dispatch({ type: "LOGOUT" });
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
          dispatch({ type: "LOGIN" });
        } catch (error) {
            console.log('error confirming sign up', error);
        }
      }
    }),
    []
  );
  
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={theme}>
        <StatusBar backgroundColor={theme.colors.background} />
        <Stack.Navigator>
          {state.isLoading || !fontsLoaded ? (
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          ) : state.isLoggedIn == false ? (
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  animationTypeForReplace: state.isSignout ? "pop" : "push",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{
                  animationTypeForReplace: state.isSignout ? "pop" : "push",
                  title: "",
                  headerShown: true,
                  headerTintColor: theme.colors.text,
                  headerStyle: {
                    backgroundColor: theme.colors.background,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                  }
                }}
              />
              <Stack.Screen
                name="ConfirmCodeScreen"
                component={ConfirmCodeScreen}
                options={{
                  animationTypeForReplace: state.isSignout ? "pop" : "push",
                  title: "",
                  headerShown: true,
                  headerTintColor: theme.colors.text,
                  headerStyle: {
                    backgroundColor: theme.colors.background,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                  }
                }}
              />
            </>
          ) : (
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                animationTypeForReplace: state.isSignout ? "pop" : "push",
                headerShown: false,
              }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

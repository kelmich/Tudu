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

// aws
import Amplify from "aws-amplify";
import { Auth } from "aws-amplify";
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
            userToken: action.token,
            isLoading: false,
          };
        case "LOGIN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "LOGOUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  // on app start
  useEffect(() => {
    const restoreToken = async () => {
      let userToken;
      try {
        userToken = null; //await AsyncStorage.getItem('auth-token');
      } catch (e) {
        // Restoring token failed
        alert(e);
      }
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };
    restoreToken();
  }, []);

  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  const authContext = React.useMemo(
    () => ({
      login: async (username: string, password: string) => {
        try {
          const user = await Auth.signIn(username, password);
          dispatch({ type: "LOGIN", token: "dummy-auth-token" });
        } catch (error) {
          console.log("error signing in", error);
        }
      },
      logout: async () => {
        try {
          await Auth.signOut();
          dispatch({ type: "LOGOUT" });
        } catch (error) {
          console.log("error signing out: ", error);
        }
      },
      signUp: async (data) => {
        dispatch({ type: "LOGIN", token: "dummy-auth-token" });
      },
    }),
    []
  );
  
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={theme}>
        <StatusBar backgroundColor={theme.colors.background} />
        <Stack.Navigator>
          {state.isLoading || !fontsLoaded ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
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

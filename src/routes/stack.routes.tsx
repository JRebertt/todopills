import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import { Welcome } from "../pages/Welcome";
import { Confirmation } from "../pages/Confirmation";
import { UserIdentification } from "../pages/UserIdentification";
import { MedSelect } from "../pages/MedSelect";
import { MedSave } from "../pages/MedSave";
import { RegistroUser } from "../pages/RegistroUser";
import { LoginUser } from "../pages/LoginUser";

import colors from "../styles/colors";

const {Navigator, Screen} = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <>
        <Navigator
          screenOptions={{ 
            headerShown: false, 
            contentStyle: {backgroundColor: colors.white}
          }}
        >
          <Screen 
          name="Welcome" 
          component={Welcome}
          />
          <Screen 
          name="UserIdentification" 
          component={UserIdentification}
          />
          <Screen 
          name="Confirmation" 
          component={Confirmation}
          />
          <Screen 
          name="Select" 
          component={MedSelect}
          />
          <Screen 
          name="MedSave" 
          component={MedSave}
          />

          <Screen 
          name="LoginUser" 
          component={LoginUser}
          />

           <Screen 
          name="RegistroUser" 
          component={RegistroUser}
          />
        </Navigator>
        
    </>
  );
}

export default AppRoutes;

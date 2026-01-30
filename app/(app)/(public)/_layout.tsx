import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: "#fff" },
        }}
      />
      <Stack.Screen
        name="other-options"
        options={{
          title: "",
          headerShown: false,
          presentation: "formSheet",
          sheetCornerRadius: 16,
          sheetAllowedDetents: [0.6],
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
};

export default Layout;

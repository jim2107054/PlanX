import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import React from "react";
import { Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

const AppleAuthButton = () => {
  return (
    <TouchableOpacity style={styles.appleButton}>
      <Ionicons name="logo-apple" size={24} color="#fff" />
      <Text style={styles.appleButtonText}>Continue with Apple</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appleButton: {
    width: "100%",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    paddingVertical: 12,
    gap: 4,
  },
  appleButtonText: {
    fontSize: 16,
    fontFamily: Fonts.brandBold,
    color: "#fff",
  },
});

export default AppleAuthButton;

import { Text, View } from "react-native";

/**
 * Renders a full-screen centered view with a single instructional text.
 *
 * @returns A JSX element containing a centered `View` with a `Text` node that prompts editing `app/index.tsx`.
 */
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
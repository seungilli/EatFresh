import { FlatList } from "react-native";
import HistoryItem from "./HistoryItem";
import { useHistoryContext } from "@/hooks/useHistoryProvider";

export default function HistoryList() {
  const { history } = useHistoryContext();

  return (
    <FlatList
      data={history}
      renderItem={({ item }) => <HistoryItem item={item} />}
      keyExtractor={(item) => item.time}
    />
  );
}

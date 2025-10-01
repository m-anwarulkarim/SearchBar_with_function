import { useState } from "react";
import { TextInput, Text, Loader } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";

// লোকাল ডাটা
const products = [
  { id: 1, title: "আম", category: "fruit" },
  { id: 2, title: "কলা", category: "fruit" },
  { id: 3, title: "লিচু", category: "fruit" },
  { id: 4, title: "গাজর", category: "vegetable" },
  { id: 5, title: "টমেটো", category: "vegetable" },
];

export default function Demo() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useDebouncedCallback((query: string) => {
    if (query.trim() === "") {
      setSearchResults([]); // খালি হলে রেজাল্টও খালি
      setLoading(false);
      return;
    }

    setLoading(true);
    const results = products.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
    setLoading(false);
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearch(value);
    handleSearch(value);
  };

  return (
    <div style={{ maxWidth: 400, margin: "20px auto" }}>
      <TextInput
        value={search}
        onChange={handleChange}
        placeholder="ফল বা সবজির নাম লিখুন..."
        rightSection={loading ? <Loader size={20} /> : null}
      />

      {/* কোন রেজাল্ট না থাকলে এবং সার্চ টাইপ করা থাকলে */}
      {searchResults.length === 0 && search.trim() !== "" && !loading && (
        <Text size="sm" color="red" mt="xs">
          কিছুই পাওয়া যায়নি ❌
        </Text>
      )}

      {/* সার্চ রেজাল্ট */}
      {searchResults.length > 0 && (
        <div style={{ marginTop: 10 }}>
          {searchResults.map((item) => (
            <Text key={item.id} size="sm">
              {item.title} ({item.category})
            </Text>
          ))}
        </div>
      )}
    </div>
  );
}

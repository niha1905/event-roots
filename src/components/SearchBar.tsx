import { useState } from "react";
import { Search, Clock, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search historical events..." }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const suggestions = [
    { icon: Clock, text: "World War II", period: "1939-1945" },
    { icon: Globe, text: "Renaissance", period: "14th-17th century" },
    { icon: Clock, text: "Industrial Revolution", period: "1760-1840" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="pl-12 pr-20 h-14 text-lg bg-card border-border shadow-lg rounded-xl focus:ring-2 focus:ring-historical-primary transition-all duration-300"
          />
          <Button
            type="submit"
            variant="default"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-6 bg-gradient-to-r from-historical-primary to-historical-secondary hover:shadow-lg transition-all duration-300"
          >
            Search
          </Button>
        </div>
      </form>
      
      <div className="flex flex-wrap gap-2 justify-center">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => {
              setQuery(suggestion.text);
              onSearch(suggestion.text);
            }}
            className="group flex items-center gap-2 bg-card/50 hover:bg-historical-muted border-border hover:border-historical-accent transition-all duration-300"
          >
            <suggestion.icon className="h-4 w-4 text-historical-primary group-hover:text-historical-secondary" />
            <span className="font-medium">{suggestion.text}</span>
            <span className="text-xs text-muted-foreground">({suggestion.period})</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
import { useState } from "react";
import { BookOpen, Clock, Users, Map } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import UploadArea from "@/components/UploadArea";
import TimelineFlow from "@/components/TimelineFlow";
import FilterSidebar from "@/components/FilterSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-timeline.jpg";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeView, setActiveView] = useState<"search" | "upload">("search");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveView("search");
  };

  const handleUpload = (content: any) => {
    console.log("Uploaded content:", content);
    // Here you would process the uploaded content and add it to the timeline
  };

  const handleFilterChange = (filters: any) => {
    console.log("Filters changed:", filters);
    // Here you would apply the filters to the timeline
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-historical-muted/20 to-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="h-8 w-8 text-historical-primary" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-historical-primary to-historical-secondary bg-clip-text text-transparent">
                Timeless.historian
              </h1>
            </div>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover the interconnected web of historical events through interactive timelines and visual learning experiences
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Badge variant="outline" className="flex items-center gap-2 px-4 py-2 bg-card/50">
                <Clock className="h-4 w-4" />
                Interactive Timelines
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2 px-4 py-2 bg-card/50">
                <Users className="h-4 w-4" />
                Collaborative Learning
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2 px-4 py-2 bg-card/50">
                <Map className="h-4 w-4" />
                Visual Connections
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex justify-center space-x-4">
          <Button
            variant={activeView === "search" ? "default" : "outline"}
            onClick={() => setActiveView("search")}
            className={activeView === "search" ? "bg-gradient-to-r from-historical-primary to-historical-secondary" : ""}
          >
            <Clock className="h-4 w-4 mr-2" />
            Explore Timeline
          </Button>
          <Button
            variant={activeView === "upload" ? "default" : "outline"}
            onClick={() => setActiveView("upload")}
            className={activeView === "upload" ? "bg-gradient-to-r from-historical-primary to-historical-secondary" : ""}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Contribute Knowledge
          </Button>
        </div>

        {/* Search/Upload Section */}
        <div className="space-y-8">
          {activeView === "search" && (
            <>
              <SearchBar onSearch={handleSearch} />
              
              <div className="flex gap-6">
                {/* Filters Sidebar */}
                {showFilters && (
                  <div className="flex-shrink-0">
                    <FilterSidebar onFilterChange={handleFilterChange} />
                  </div>
                )}
                
                {/* Main Timeline View */}
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-foreground">
                      {searchQuery ? `Results for "${searchQuery}"` : "Historical Timeline"}
                    </h2>
                    <Button
                      variant="outline"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      {showFilters ? "Hide Filters" : "Show Filters"}
                    </Button>
                  </div>
                  
                  <TimelineFlow searchQuery={searchQuery} />
                </div>
              </div>
            </>
          )}

          {activeView === "upload" && (
            <div className="max-w-4xl mx-auto">
              <UploadArea onUpload={handleUpload} />
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 pt-12">
          <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-historical-muted/20 border-historical-accent/30">
            <CardContent className="p-6 text-center space-y-4">
              <div className="p-3 rounded-full bg-historical-primary/10 w-fit mx-auto group-hover:bg-historical-primary/20 transition-colors">
                <Clock className="h-8 w-8 text-historical-primary" />
              </div>
              <h3 className="text-xl font-semibold">Interactive Timelines</h3>
              <p className="text-muted-foreground">
                Navigate through history with connected events, causes, and effects in an intuitive visual format
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-historical-muted/20 border-historical-accent/30">
            <CardContent className="p-6 text-center space-y-4">
              <div className="p-3 rounded-full bg-historical-secondary/10 w-fit mx-auto group-hover:bg-historical-secondary/20 transition-colors">
                <Users className="h-8 w-8 text-historical-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Collaborative Knowledge</h3>
              <p className="text-muted-foreground">
                Contribute and discover historical insights from educators and historians worldwide
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-historical-muted/20 border-historical-accent/30">
            <CardContent className="p-6 text-center space-y-4">
              <div className="p-3 rounded-full bg-historical-accent/10 w-fit mx-auto group-hover:bg-historical-accent/20 transition-colors">
                <Map className="h-8 w-8 text-historical-accent" />
              </div>
              <h3 className="text-xl font-semibold">Visual Connections</h3>
              <p className="text-muted-foreground">
                Understand how historical events connect across time, geography, and themes
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;

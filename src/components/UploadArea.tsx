import { useState } from "react";
import { Upload, FileText, Plus, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UploadAreaProps {
  onUpload: (content: HistoricalContent) => void;
}

interface HistoricalContent {
  title: string;
  content: string;
  date?: string;
  people?: string;
  location?: string;
}

const UploadArea = ({ onUpload }: UploadAreaProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState<HistoricalContent>({
    title: "",
    content: "",
    date: "",
    people: "",
    location: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.title && content.content) {
      onUpload(content);
      setContent({ title: "", content: "", date: "", people: "", location: "" });
      setIsExpanded(false);
    }
  };

  if (!isExpanded) {
    return (
      <Card 
        className="w-full max-w-4xl mx-auto cursor-pointer group hover:shadow-xl transition-all duration-300 border-2 border-dashed border-historical-accent/30 hover:border-historical-accent bg-gradient-to-br from-card to-historical-muted/20"
        onClick={() => setIsExpanded(true)}
      >
        <CardContent className="p-12 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 rounded-full bg-historical-primary/10 group-hover:bg-historical-primary/20 transition-colors duration-300">
              <Upload className="h-8 w-8 text-historical-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                Upload Context & Material
              </h3>
              <p className="text-muted-foreground max-w-md">
                Share historical documents, events, or insights to contribute to our collective knowledge timeline
              </p>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>Text & Documents</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>Historical Analysis</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl bg-card">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Plus className="h-5 w-5 text-historical-primary" />
              Add Historical Content
            </h3>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsExpanded(false)}
              size="sm"
            >
              Cancel
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-sm font-medium">
                Event Title *
              </Label>
              <Input
                id="title"
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                placeholder="e.g., The Battle of Hastings"
                className="mt-1"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="date" className="text-sm font-medium">
                  Date/Period
                </Label>
                <Input
                  id="date"
                  value={content.date}
                  onChange={(e) => setContent({ ...content, date: e.target.value })}
                  placeholder="e.g., 1066 AD"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="people" className="text-sm font-medium">
                  Key People
                </Label>
                <Input
                  id="people"
                  value={content.people}
                  onChange={(e) => setContent({ ...content, people: e.target.value })}
                  placeholder="e.g., William the Conqueror"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="location" className="text-sm font-medium">
                  Location
                </Label>
                <Input
                  id="location"
                  value={content.location}
                  onChange={(e) => setContent({ ...content, location: e.target.value })}
                  placeholder="e.g., Hastings, England"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="content" className="text-sm font-medium">
                Description & Context *
              </Label>
              <Textarea
                id="content"
                value={content.content}
                onChange={(e) => setContent({ ...content, content: e.target.value })}
                placeholder="Describe the historical event, its causes, consequences, and significance..."
                className="mt-1 min-h-32"
                required
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-historical-primary to-historical-secondary hover:shadow-lg transition-all duration-300"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload & Process
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UploadArea;
import { useState } from "react";
import { Calendar, MapPin, User, Tag, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FilterSidebarProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  timeRanges: string[];
  locations: string[];
  themes: string[];
  eventTypes: string[];
}

const FilterSidebar = ({ onFilterChange }: FilterSidebarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    timeRanges: [],
    locations: [],
    themes: [],
    eventTypes: [],
  });

  const [openSections, setOpenSections] = useState({
    time: true,
    geography: true,
    themes: true,
    types: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (category: keyof FilterState, value: string, checked: boolean) => {
    const newFilters = {
      ...filters,
      [category]: checked 
        ? [...filters[category], value]
        : filters[category].filter(item => item !== value)
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const filterOptions = {
    timeRanges: [
      { label: "Ancient Era (Before 500 CE)", value: "ancient" },
      { label: "Medieval Period (500-1500)", value: "medieval" },
      { label: "Renaissance (1300-1600)", value: "renaissance" },
      { label: "Early Modern (1500-1800)", value: "early-modern" },
      { label: "Industrial Age (1750-1900)", value: "industrial" },
      { label: "Modern Era (1900-present)", value: "modern" },
    ],
    locations: [
      { label: "Europe", value: "europe" },
      { label: "Asia", value: "asia" },
      { label: "Africa", value: "africa" },
      { label: "Americas", value: "americas" },
      { label: "Middle East", value: "middle-east" },
      { label: "Oceania", value: "oceania" },
    ],
    themes: [
      { label: "Wars & Conflicts", value: "wars" },
      { label: "Political Changes", value: "politics" },
      { label: "Cultural Movements", value: "culture" },
      { label: "Scientific Discoveries", value: "science" },
      { label: "Economic Events", value: "economics" },
      { label: "Social Reforms", value: "social" },
    ],
    eventTypes: [
      { label: "Major Events", value: "major" },
      { label: "Causes", value: "cause" },
      { label: "Effects", value: "effect" },
      { label: "Minor Events", value: "minor" },
    ],
  };

  return (
    <Card className="w-80 h-fit shadow-lg bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Tag className="h-5 w-5 text-historical-primary" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Time Period Filter */}
        <Collapsible open={openSections.time} onOpenChange={() => toggleSection('time')}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex items-center justify-between w-full p-0 h-auto">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-historical-primary" />
                <span className="font-medium">Time Period</span>
              </div>
              {openSections.time ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-3">
            {filterOptions.timeRanges.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`time-${option.value}`}
                  checked={filters.timeRanges.includes(option.value)}
                  onCheckedChange={(checked) => 
                    handleFilterChange('timeRanges', option.value, checked as boolean)
                  }
                />
                <label 
                  htmlFor={`time-${option.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Geography Filter */}
        <Collapsible open={openSections.geography} onOpenChange={() => toggleSection('geography')}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex items-center justify-between w-full p-0 h-auto">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-historical-primary" />
                <span className="font-medium">Geography</span>
              </div>
              {openSections.geography ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-3">
            {filterOptions.locations.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`location-${option.value}`}
                  checked={filters.locations.includes(option.value)}
                  onCheckedChange={(checked) => 
                    handleFilterChange('locations', option.value, checked as boolean)
                  }
                />
                <label 
                  htmlFor={`location-${option.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Themes Filter */}
        <Collapsible open={openSections.themes} onOpenChange={() => toggleSection('themes')}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex items-center justify-between w-full p-0 h-auto">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-historical-primary" />
                <span className="font-medium">Themes</span>
              </div>
              {openSections.themes ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-3">
            {filterOptions.themes.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`theme-${option.value}`}
                  checked={filters.themes.includes(option.value)}
                  onCheckedChange={(checked) => 
                    handleFilterChange('themes', option.value, checked as boolean)
                  }
                />
                <label 
                  htmlFor={`theme-${option.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Event Types Filter */}
        <Collapsible open={openSections.types} onOpenChange={() => toggleSection('types')}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex items-center justify-between w-full p-0 h-auto">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-historical-primary" />
                <span className="font-medium">Event Types</span>
              </div>
              {openSections.types ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-3">
            {filterOptions.eventTypes.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${option.value}`}
                  checked={filters.eventTypes.includes(option.value)}
                  onCheckedChange={(checked) => 
                    handleFilterChange('eventTypes', option.value, checked as boolean)
                  }
                />
                <label 
                  htmlFor={`type-${option.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        <Button 
          variant="outline" 
          onClick={() => {
            const emptyFilters = { timeRanges: [], locations: [], themes: [], eventTypes: [] };
            setFilters(emptyFilters);
            onFilterChange(emptyFilters);
          }}
          className="w-full"
        >
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
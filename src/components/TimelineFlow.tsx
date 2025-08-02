import { useState, useMemo, useRef, useEffect } from 'react';
import { Clock, MapPin, Users, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface EventData {
  id: string;
  title: string;
  date: string;
  year: number;
  description: string;
  people?: string;
  location?: string;
  category: 'major' | 'minor' | 'cause' | 'effect';
}

interface TimelineFlowProps {
  searchQuery?: string;
}

const TimelineFlow = ({ searchQuery }: TimelineFlowProps) => {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, panX: 0 });

  // Sample historical data with years for sorting
  const events: EventData[] = useMemo(() => [
    {
      id: '1',
      title: 'Economic Crisis',
      date: '1780s',
      year: 1780,
      description: 'Financial crisis in France due to debt from wars and poor harvests.',
      location: 'France',
      category: 'cause',
    },
    {
      id: '2',
      title: 'French Revolution',
      date: '1789-1799',
      year: 1789,
      description: 'Political and social upheaval in France that overthrew the monarchy and established a republic.',
      location: 'France',
      people: 'Robespierre, Louis XVI',
      category: 'cause',
    },
    {
      id: '3',
      title: 'Rise of Napoleon',
      date: '1799',
      year: 1799,
      description: 'Napoleon Bonaparte seizes power in France through a coup d\'état, beginning his rise to emperor.',
      location: 'France',
      people: 'Napoleon Bonaparte',
      category: 'major',
    },
    {
      id: '4',
      title: 'Napoleonic Wars',
      date: '1803-1815',
      year: 1803,
      description: 'Series of major conflicts pitting the French Empire against various European coalitions.',
      location: 'Europe',
      people: 'Napoleon, Wellington',
      category: 'effect',
    },
    {
      id: '5',
      title: 'Battle of Waterloo',
      date: '1815',
      year: 1815,
      description: 'Final defeat of Napoleon Bonaparte, marking the end of the Napoleonic era.',
      location: 'Belgium',
      people: 'Napoleon, Wellington',
      category: 'major',
    },
  ], []);

  // Sort events by year
  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => a.year - b.year);
  }, [events]);

  const minYear = Math.min(...sortedEvents.map(e => e.year));
  const maxYear = Math.max(...sortedEvents.map(e => e.year));
  const timelineWidth = (maxYear - minYear + 10) * 20 * zoom; // 20px per year * zoom

  const getEventPosition = (year: number) => {
    return ((year - minYear) * 20 * zoom) + 100; // 100px offset from start
  };

  const categoryStyles = {
    major: 'bg-gradient-to-br from-historical-primary to-historical-secondary text-white border-historical-primary',
    minor: 'bg-gradient-to-br from-historical-accent to-accent text-foreground border-historical-accent',
    cause: 'bg-gradient-to-br from-orange-500 to-red-500 text-white border-orange-500',
    effect: 'bg-gradient-to-br from-green-500 to-emerald-500 text-white border-green-500',
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, panX });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      setPanX(dragStart.panX + deltaX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.5, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.5, 0.5));
  };

  const handleReset = () => {
    setZoom(1);
    setPanX(0);
    setSelectedEvent(null);
  };

  return (
    <div className="w-full h-[600px] bg-gradient-to-br from-background to-historical-muted/30 rounded-xl border border-border shadow-lg overflow-hidden relative">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button variant="outline" size="sm" onClick={handleZoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleZoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Timeline Container */}
      <div
        ref={timelineRef}
        className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="relative h-full"
          style={{
            width: `${timelineWidth + 200}px`,
            transform: `translateX(${panX}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease',
          }}
        >
          {/* Timeline Line */}
          <div 
            className="absolute top-1/2 h-1 bg-gradient-to-r from-historical-primary/60 to-historical-secondary/60 rounded-full"
            style={{ 
              left: '50px',
              right: '50px',
              transform: 'translateY(-50%)'
            }}
          />

          {/* Year Markers */}
          {Array.from({ length: Math.ceil((maxYear - minYear) / 5) + 1 }, (_, i) => {
            const year = minYear + (i * 5);
            const position = getEventPosition(year);
            return (
              <div
                key={year}
                className="absolute top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground"
                style={{ left: `${position}px` }}
              >
                <div className="w-px h-8 bg-border mx-auto mb-2" />
                <div className="text-center font-medium">{year}</div>
              </div>
            );
          })}

          {/* Events */}
          {sortedEvents.map((event, index) => {
            const position = getEventPosition(event.year);
            const isAbove = index % 2 === 0;
            
            return (
              <div
                key={event.id}
                className="absolute"
                style={{
                  left: `${position}px`,
                  top: isAbove ? '20%' : '60%',
                  transform: 'translateX(-50%)',
                }}
              >
                {/* Connection Line */}
                <div 
                  className={`w-px bg-historical-accent/60 ${isAbove ? 'h-24 mb-2' : 'h-24 mt-2 order-1'} mx-auto`}
                />
                
                {/* Event Card */}
                <Card 
                  className={`w-64 shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${categoryStyles[event.category]} border-2 ${
                    selectedEvent?.id === event.id ? 'ring-2 ring-historical-primary ring-offset-2' : ''
                  }`}
                  onClick={() => setSelectedEvent(selectedEvent?.id === event.id ? null : event)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm font-bold leading-tight">
                        {event.title}
                      </CardTitle>
                      <Badge variant="outline" className="ml-2 text-xs bg-white/20 shrink-0">
                        {event.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-xs opacity-80">
                      <Clock className="h-3 w-3" />
                      <span>{event.date}</span>
                    </div>
                    
                    {selectedEvent?.id === event.id && (
                      <div className="space-y-2 pt-2 border-t border-white/20">
                        <p className="text-xs opacity-90">
                          {event.description}
                        </p>
                        
                        {event.location && (
                          <div className="flex items-center gap-2 text-xs opacity-80">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                        )}
                        
                        {event.people && (
                          <div className="flex items-center gap-2 text-xs opacity-80">
                            <Users className="h-3 w-3" />
                            <span>{event.people}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-historical-primary to-historical-secondary" />
          <span>Major Events</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500" />
          <span>Causes</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
          <span>Effects</span>
        </div>
      </div>
    </div>
  );
};

export default TimelineFlow;
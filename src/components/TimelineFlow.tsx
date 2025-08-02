import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  Handle,
  Position,
} from '@xyflow/react';
import { Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import '@xyflow/react/dist/style.css';

interface EventNodeData {
  title: string;
  date: string;
  description: string;
  people?: string;
  location?: string;
  category: 'major' | 'minor' | 'cause' | 'effect';
}

const EventNode = ({ data }: { data: EventNodeData }) => {
  const categoryStyles = {
    major: 'bg-gradient-to-br from-historical-primary to-historical-secondary text-white border-historical-primary',
    minor: 'bg-gradient-to-br from-historical-accent to-accent text-foreground border-historical-accent',
    cause: 'bg-gradient-to-br from-orange-500 to-red-500 text-white border-orange-500',
    effect: 'bg-gradient-to-br from-green-500 to-emerald-500 text-white border-green-500',
  };

  return (
    <Card className={`w-80 shadow-lg transition-all duration-300 hover:shadow-xl ${categoryStyles[data.category]} border-2`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-white border-2 border-gray-400" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-white border-2 border-gray-400" />
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-bold leading-tight">
            {data.title}
          </CardTitle>
          <Badge variant="outline" className="ml-2 text-xs bg-white/20">
            {data.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <p className="text-sm opacity-90 line-clamp-3">
          {data.description}
        </p>
        
        <div className="space-y-2">
          {data.date && (
            <div className="flex items-center gap-2 text-xs opacity-80">
              <Clock className="h-3 w-3" />
              <span>{data.date}</span>
            </div>
          )}
          {data.location && (
            <div className="flex items-center gap-2 text-xs opacity-80">
              <MapPin className="h-3 w-3" />
              <span>{data.location}</span>
            </div>
          )}
          {data.people && (
            <div className="flex items-center gap-2 text-xs opacity-80">
              <Users className="h-3 w-3" />
              <span>{data.people}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const nodeTypes = {
  event: EventNode,
};

interface TimelineFlowProps {
  searchQuery?: string;
}

const TimelineFlow = ({ searchQuery }: TimelineFlowProps) => {
  // Sample historical data
  const initialNodes: Node[] = useMemo(() => [
    {
      id: '1',
      type: 'event',
      position: { x: 100, y: 200 },
      data: {
        title: 'Rise of Napoleon',
        date: '1799',
        description: 'Napoleon Bonaparte seizes power in France through a coup d\'état, beginning his rise to emperor.',
        location: 'France',
        people: 'Napoleon Bonaparte',
        category: 'major',
      },
    },
    {
      id: '2',
      type: 'event',
      position: { x: 500, y: 100 },
      data: {
        title: 'French Revolution',
        date: '1789-1799',
        description: 'Political and social upheaval in France that overthrew the monarchy and established a republic.',
        location: 'France',
        people: 'Robespierre, Louis XVI',
        category: 'cause',
      },
    },
    {
      id: '3',
      type: 'event',
      position: { x: 500, y: 300 },
      data: {
        title: 'Napoleonic Wars',
        date: '1803-1815',
        description: 'Series of major conflicts pitting the French Empire against various European coalitions.',
        location: 'Europe',
        people: 'Napoleon, Wellington',
        category: 'effect',
      },
    },
    {
      id: '4',
      type: 'event',
      position: { x: 900, y: 200 },
      data: {
        title: 'Battle of Waterloo',
        date: '1815',
        description: 'Final defeat of Napoleon Bonaparte, marking the end of the Napoleonic era.',
        location: 'Belgium',
        people: 'Napoleon, Wellington',
        category: 'major',
      },
    },
    {
      id: '5',
      type: 'event',
      position: { x: 100, y: 50 },
      data: {
        title: 'Economic Crisis',
        date: '1780s',
        description: 'Financial crisis in France due to debt from wars and poor harvests.',
        location: 'France',
        category: 'cause',
      },
    },
  ], []);

  const initialEdges: Edge[] = useMemo(() => [
    {
      id: 'e1-2',
      source: '2',
      target: '1',
      type: 'smoothstep',
      animated: true,
      style: { stroke: 'hsl(var(--historical-primary))', strokeWidth: 2 },
    },
    {
      id: 'e1-3',
      source: '1',
      target: '3',
      type: 'smoothstep',
      animated: true,
      style: { stroke: 'hsl(var(--historical-secondary))', strokeWidth: 2 },
    },
    {
      id: 'e3-4',
      source: '3',
      target: '4',
      type: 'smoothstep',
      animated: true,
      style: { stroke: 'hsl(var(--historical-accent))', strokeWidth: 2 },
    },
    {
      id: 'e5-2',
      source: '5',
      target: '2',
      type: 'smoothstep',
      style: { stroke: 'hsl(var(--muted-foreground))', strokeWidth: 1, strokeDasharray: '5,5' },
    },
  ], []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="w-full h-[600px] bg-gradient-to-br from-background to-historical-muted/30 rounded-xl border border-border shadow-lg overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        style={{ backgroundColor: 'transparent' }}
      >
        <Controls 
          className="bg-card border border-border rounded-lg shadow-lg"
          showZoom={true}
          showFitView={true}
          showInteractive={true}
        />
        <MiniMap 
          className="bg-card border border-border rounded-lg shadow-lg"
          nodeColor={(node) => {
            const data = node.data as unknown as EventNodeData;
            const category = data?.category;
            switch (category) {
              case 'major': return 'hsl(var(--historical-primary))';
              case 'cause': return 'orange';
              case 'effect': return 'green';
              default: return 'hsl(var(--historical-accent))';
            }
          }}
        />
        <Background 
          variant={'lines' as any}
          gap={20}
          size={1}
          color="hsl(var(--border))"
        />
      </ReactFlow>
    </div>
  );
};

export default TimelineFlow;
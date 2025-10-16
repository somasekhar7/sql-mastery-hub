import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TicketDetail } from "./TicketDetail";
import { Clock, AlertCircle, CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Ticket {
  id: string;
  subject: string;
  description: string;
  category: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
  responses: TicketResponse[];
}

interface TicketResponse {
  id: string;
  message: string;
  is_admin_response: boolean;
  responder_name: string;
  created_at: string;
}

interface TicketListProps {
  onTicketCountChange?: (count: number) => void;
}

export function TicketList({ onTicketCountChange }: TicketListProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);

  // Mock data - Replace with Firebase/GCP calls
  useEffect(() => {
    const mockTickets: Ticket[] = [
      {
        id: "1",
        subject: "SQL Query not working in editor",
        description: "When I try to run a SELECT query with JOIN, the editor shows an error.",
        category: "technical_issue",
        status: "in_progress",
        priority: "high",
        created_at: "2025-01-15T10:30:00Z",
        updated_at: "2025-01-15T14:20:00Z",
        responses: [
          {
            id: "r1",
            message: "Thank you for reporting this. We're investigating the issue with JOIN queries.",
            is_admin_response: true,
            responder_name: "Support Team",
            created_at: "2025-01-15T14:20:00Z"
          }
        ]
      },
      {
        id: "2",
        subject: "Feature request: Add dark mode toggle",
        description: "Would be great to have a dark mode option for better readability at night.",
        category: "feature_request",
        status: "resolved",
        priority: "low",
        created_at: "2025-01-14T09:15:00Z",
        updated_at: "2025-01-15T16:45:00Z",
        responses: [
          {
            id: "r2",
            message: "Great news! Dark mode has been implemented. You can find the toggle in the header.",
            is_admin_response: true,
            responder_name: "Development Team",
            created_at: "2025-01-15T16:45:00Z"
          }
        ]
      }
    ];

    setTickets(mockTickets);
    onTicketCountChange?.(mockTickets.length);
  }, [onTicketCountChange]);

  useEffect(() => {
    let filtered = [...tickets];

    if (statusFilter !== "all") {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }

    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    } else if (sortBy === "priority") {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      filtered.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    }

    setFilteredTickets(filtered);
  }, [tickets, statusFilter, sortBy]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <Clock className="h-4 w-4" />;
      case 'in_progress': return <AlertCircle className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'closed': return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return "bg-primary/10 text-primary border-primary/20";
      case 'in_progress': return "bg-warning/10 text-warning border-warning/20";
      case 'resolved': return "bg-success/10 text-success border-success/20";
      case 'closed': return "bg-muted text-muted-foreground border-muted";
      default: return "";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return "bg-destructive/10 text-destructive border-destructive/20";
      case 'medium': return "bg-warning/10 text-warning border-warning/20";
      case 'low': return "bg-success/10 text-success border-success/20";
      default: return "";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filter & Sort</CardTitle>
          <CardDescription>Organize your support tickets</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {filteredTickets.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No tickets found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredTickets.map((ticket) => (
            <Collapsible
              key={ticket.id}
              open={expandedTicket === ticket.id}
              onOpenChange={(open) => setExpandedTicket(open ? ticket.id : null)}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getStatusColor(ticket.status)}>
                            {getStatusIcon(ticket.status)}
                            <span className="ml-1 capitalize">{ticket.status.replace('_', ' ')}</span>
                          </Badge>
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority.toUpperCase()}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{ticket.subject}</CardTitle>
                        <CardDescription className="mt-1">
                          {new Date(ticket.created_at).toLocaleDateString()} • {ticket.responses.length} response(s)
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm">
                        {expandedTicket === ticket.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <CardContent>
                    <TicketDetail ticket={ticket} />
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      )}
    </div>
  );
}

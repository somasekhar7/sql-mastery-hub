import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppSelector } from "@/hooks";
import { useToast } from "@/hooks/use-toast";
import { Shield, User, Clock, CheckCircle, XCircle, MessageSquare, Send } from "lucide-react";

interface TicketResponse {
  id: string;
  message: string;
  is_admin_response: boolean;
  responder_name: string;
  created_at: string;
}

interface Ticket {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  subject: string;
  description: string;
  category: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  created_at: string;
  updated_at: string;
  responses: TicketResponse[];
}

export default function Admin() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [newStatus, setNewStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Check if user is admin - UPDATE THIS to check your backend API
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    // TODO: Replace with actual API call to check admin role
    // Example: GET /api/auth/check-role
    const checkAdminRole = async () => {
      try {
        // Placeholder - replace with your API endpoint
        // const response = await fetch(`${YOUR_API_URL}/api/auth/check-role`, {
        //   headers: { Authorization: `Bearer ${YOUR_TOKEN}` }
        // });
        // const data = await response.json();
        // if (data.role !== 'admin') navigate('/');

        // For now, check if email contains 'admin' (temporary - REMOVE THIS)
        if (!user?.email?.includes('admin')) {
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "You don't have permission to access this page.",
          });
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking admin role:", error);
        navigate("/");
      }
    };

    checkAdminRole();
  }, [isAuthenticated, navigate, user, toast]);

  // Fetch all tickets - UPDATE THIS to use your backend API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // TODO: Replace with your API endpoint
        // const response = await fetch(`${YOUR_API_URL}/api/admin/tickets`, {
        //   headers: { Authorization: `Bearer ${YOUR_TOKEN}` }
        // });
        // const data = await response.json();
        // setTickets(data.tickets);

        // Mock data for now - REMOVE THIS when connecting to your API
        const mockTickets: Ticket[] = [
          {
            id: "1",
            user_id: "user1",
            user_name: "John Doe",
            user_email: "john@example.com",
            subject: "Unable to submit SQL query",
            description: "I'm getting an error when trying to submit my SQL query for Problem #5.",
            category: "technical_issue",
            status: "open",
            priority: "high",
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            responses: [],
          },
          {
            id: "2",
            user_id: "user2",
            user_name: "Jane Smith",
            user_email: "jane@example.com",
            subject: "Feature Request: Dark mode for editor",
            description: "Would love to have a dark mode option for the code editor.",
            category: "feature_request",
            status: "in_progress",
            priority: "medium",
            created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            responses: [
              {
                id: "r1",
                message: "Thank you for the suggestion! We're currently working on implementing this feature.",
                is_admin_response: true,
                responder_name: "Admin",
                created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
              },
            ],
          },
        ];
        setTickets(mockTickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load tickets.",
        });
      }
    };

    if (isAuthenticated) {
      fetchTickets();
    }
  }, [isAuthenticated, toast]);

  // Submit response and update status
  const handleSubmitResponse = async () => {
    if (!selectedTicket || !responseMessage.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a response message.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Replace with your API endpoint
      // const response = await fetch(`${YOUR_API_URL}/api/admin/tickets/${selectedTicket.id}/respond`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${YOUR_TOKEN}`
      //   },
      //   body: JSON.stringify({
      //     message: responseMessage,
      //     status: newStatus || selectedTicket.status
      //   })
      // });
      // const data = await response.json();

      // Mock success - REMOVE THIS when connecting to your API
      const newResponse: TicketResponse = {
        id: `r${Date.now()}`,
        message: responseMessage,
        is_admin_response: true,
        responder_name: user?.name || "Admin",
        created_at: new Date().toISOString(),
      };

      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === selectedTicket.id
            ? {
                ...ticket,
                responses: [...ticket.responses, newResponse],
                status: (newStatus as any) || ticket.status,
                updated_at: new Date().toISOString(),
              }
            : ticket
        )
      );

      setSelectedTicket((prev) =>
        prev
          ? {
              ...prev,
              responses: [...prev.responses, newResponse],
              status: (newStatus as any) || prev.status,
              updated_at: new Date().toISOString(),
            }
          : null
      );

      setResponseMessage("");
      setNewStatus("");

      toast({
        title: "Success",
        description: "Response sent successfully!",
      });
    } catch (error) {
      console.error("Error submitting response:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit response.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      bug: "🐛 Bug Report",
      feature_request: "✨ Feature Request",
      technical_issue: "⚙️ Technical Issue",
      account: "👤 Account Issue",
      other: "💬 Other",
    };
    return labels[category] || category;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-warning/20 text-warning-foreground border-warning/50";
      case "in_progress":
        return "bg-info/20 text-info-foreground border-info/50";
      case "resolved":
        return "bg-success/20 text-success-foreground border-success/50";
      case "closed":
        return "bg-muted text-muted-foreground border-muted";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/20 text-destructive-foreground border-destructive/50";
      case "medium":
        return "bg-warning/20 text-warning-foreground border-warning/50";
      case "low":
        return "bg-success/20 text-success-foreground border-success/50";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const filteredTickets = tickets.filter(
    (ticket) => filterStatus === "all" || ticket.status === filterStatus
  );

  const ticketStats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    in_progress: tickets.filter((t) => t.status === "in_progress").length,
    resolved: tickets.filter((t) => t.status === "resolved").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent/5">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground">Manage user support tickets and responses</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{ticketStats.total}</div>
            </CardContent>
          </Card>
          <Card className="border-warning/20 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Open</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{ticketStats.open}</div>
            </CardContent>
          </Card>
          <Card className="border-info/20 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-info">{ticketStats.in_progress}</div>
            </CardContent>
          </Card>
          <Card className="border-success/20 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{ticketStats.resolved}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tickets List */}
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>Click on a ticket to view details and respond</CardDescription>
              <div className="pt-4">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px] bg-background border-input">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="all">All Tickets</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredTickets.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No tickets found</p>
              ) : (
                filteredTickets.map((ticket) => (
                  <Card
                    key={ticket.id}
                    className={`cursor-pointer transition-all duration-200 hover:border-primary/50 hover:shadow-lg ${
                      selectedTicket?.id === ticket.id ? "border-primary bg-primary/5" : "border-border"
                    }`}
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-foreground line-clamp-1">{ticket.subject}</h3>
                          <div className="flex gap-1 flex-shrink-0">
                            <Badge variant="outline" className={getStatusColor(ticket.status)}>
                              {ticket.status.replace("_", " ")}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-3 w-3" />
                          <span>{ticket.user_name}</span>
                          <span>•</span>
                          <Clock className="h-3 w-3" />
                          <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            {getCategoryLabel(ticket.category)}
                          </Badge>
                          <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>

          {/* Ticket Detail and Response */}
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Ticket Details & Response</CardTitle>
              <CardDescription>
                {selectedTicket ? "View ticket and send response" : "Select a ticket to view details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedTicket ? (
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-muted">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="respond">Respond</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-4 mt-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-sm text-muted-foreground mb-1">Subject</h3>
                        <p className="text-foreground">{selectedTicket.subject}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-muted-foreground mb-1">Description</h3>
                        <p className="text-foreground whitespace-pre-wrap">{selectedTicket.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <h3 className="font-semibold text-sm text-muted-foreground mb-1">User</h3>
                          <p className="text-foreground">{selectedTicket.user_name}</p>
                          <p className="text-sm text-muted-foreground">{selectedTicket.user_email}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm text-muted-foreground mb-1">Category</h3>
                          <Badge variant="outline">{getCategoryLabel(selectedTicket.category)}</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Response Timeline */}
                    {selectedTicket.responses.length > 0 && (
                      <div className="mt-6">
                        <h3 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Response History
                        </h3>
                        <div className="space-y-3 max-h-[300px] overflow-y-auto">
                          {selectedTicket.responses.map((response) => (
                            <Card
                              key={response.id}
                              className={
                                response.is_admin_response
                                  ? "border-primary/50 bg-primary/5"
                                  : "border-border bg-card"
                              }
                            >
                              <CardContent className="p-3">
                                <div className="flex items-start gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback
                                      className={
                                        response.is_admin_response
                                          ? "bg-primary text-primary-foreground"
                                          : "bg-muted"
                                      }
                                    >
                                      {response.is_admin_response ? (
                                        <Shield className="h-3 w-3" />
                                      ) : (
                                        <User className="h-3 w-3" />
                                      )}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-semibold text-foreground">
                                        {response.responder_name}
                                        {response.is_admin_response && (
                                          <Badge variant="secondary" className="ml-2 text-xs">
                                            Admin
                                          </Badge>
                                        )}
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        {new Date(response.created_at).toLocaleString()}
                                      </span>
                                    </div>
                                    <p className="text-xs text-foreground whitespace-pre-wrap">
                                      {response.message}
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="respond" className="space-y-4 mt-4">
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-2 block">
                        Update Status
                      </label>
                      <Select value={newStatus} onValueChange={setNewStatus}>
                        <SelectTrigger className="bg-background border-input">
                          <SelectValue placeholder={`Current: ${selectedTicket.status.replace("_", " ")}`} />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border">
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-foreground mb-2 block">
                        Response Message
                      </label>
                      <Textarea
                        placeholder="Enter your response to the user..."
                        value={responseMessage}
                        onChange={(e) => setResponseMessage(e.target.value)}
                        className="min-h-[200px] bg-background border-input text-foreground"
                      />
                    </div>

                    <Button
                      onClick={handleSubmitResponse}
                      disabled={isSubmitting || !responseMessage.trim()}
                      className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Response
                        </>
                      )}
                    </Button>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Select a ticket from the list to view details and respond</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

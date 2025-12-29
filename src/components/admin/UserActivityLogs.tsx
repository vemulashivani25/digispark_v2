import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Loader2, 
  Search, 
  Activity, 
  LogIn, 
  LogOut, 
  UserPlus, 
  KeyRound, 
  UserCog,
  Trash2,
  RefreshCw,
  Calendar,
  Monitor,
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  details: Record<string, any>;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  user_email?: string;
  user_name?: string;
  user_avatar?: string;
}

const UserActivityLogs: React.FC = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  const fetchLogs = async () => {
    try {
      // Fetch activity logs
      const { data: logsData, error: logsError } = await supabase
        .from('user_activity_logs' as any)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (logsError) throw logsError;

      // Fetch profiles to get user info
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, full_name, avatar_url');

      if (profilesError) throw profilesError;

      const profilesMap = new Map(
        profiles?.map((p) => [p.id, { email: p.email, name: p.full_name, avatar: p.avatar_url }]) || []
      );

      const enrichedLogs: ActivityLog[] = ((logsData as any[]) || []).map((log) => ({
        ...log,
        user_email: profilesMap.get(log.user_id)?.email || 'Unknown',
        user_name: profilesMap.get(log.user_id)?.name || null,
        user_avatar: profilesMap.get(log.user_id)?.avatar || null,
      }));

      setLogs(enrichedLogs);
    } catch (error) {
      console.error("Error fetching activity logs:", error);
      toast({
        title: "Error",
        description: "Failed to load activity logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchLogs();
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'login':
        return <LogIn className="h-4 w-4 text-green-500" />;
      case 'logout':
        return <LogOut className="h-4 w-4 text-orange-500" />;
      case 'signup':
        return <UserPlus className="h-4 w-4 text-blue-500" />;
      case 'password_reset':
      case 'password_update':
        return <KeyRound className="h-4 w-4 text-yellow-500" />;
      case 'profile_update':
        return <UserCog className="h-4 w-4 text-purple-500" />;
      case 'role_change':
        return <UserCog className="h-4 w-4 text-red-500" />;
      case 'user_created':
        return <UserPlus className="h-4 w-4 text-emerald-500" />;
      case 'user_deleted':
        return <Trash2 className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getActionBadgeColor = (action: string) => {
    switch (action) {
      case 'login':
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case 'logout':
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case 'signup':
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case 'password_reset':
      case 'password_update':
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case 'profile_update':
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case 'role_change':
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case 'user_created':
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case 'user_deleted':
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatFullDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  };

  const getInitials = (name: string | null, email: string | undefined) => {
    if (name) {
      return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return "U";
  };

  const parseUserAgent = (ua: string | null) => {
    if (!ua) return "Unknown";
    if (ua.includes("Chrome")) return "Chrome";
    if (ua.includes("Firefox")) return "Firefox";
    if (ua.includes("Safari")) return "Safari";
    if (ua.includes("Edge")) return "Edge";
    return "Browser";
  };

  const formatActionName = (action: string) => {
    return action.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAction = actionFilter === "all" || log.action === actionFilter;

    return matchesSearch && matchesAction;
  });

  const actionTypes = [...new Set(logs.map((log) => log.action))];

  // Stats
  const todayLogins = logs.filter(
    (log) => log.action === "login" && new Date(log.created_at).toDateString() === new Date().toDateString()
  ).length;
  
  const uniqueUsers = new Set(logs.map((log) => log.user_id)).size;

  if (loading) {
    return (
      <div className="py-20 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-muted-foreground">Loading activity logs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4 text-center bg-primary-foreground">
            <p className="text-2xl font-bold text-foreground">{logs.length}</p>
            <p className="text-xs text-muted-foreground">Total Events</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4 text-center bg-primary-foreground">
            <p className="text-2xl font-bold text-green-400">{todayLogins}</p>
            <p className="text-xs text-muted-foreground">Logins Today</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4 text-center bg-primary-foreground">
            <p className="text-2xl font-bold text-blue-400">{uniqueUsers}</p>
            <p className="text-xs text-muted-foreground">Active Users</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4 text-center bg-primary-foreground">
            <p className="text-2xl font-bold text-purple-400">{actionTypes.length}</p>
            <p className="text-xs text-muted-foreground">Action Types</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by user or action..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background border-border/50"
          />
        </div>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-full sm:w-[180px] bg-background border-border/50">
            <SelectValue placeholder="Filter by action" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="all">All Actions</SelectItem>
            {actionTypes.map((action) => (
              <SelectItem key={action} value={action}>
                {formatActionName(action)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Activity Table */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5 text-primary" />
            Activity Log
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead className="w-[200px]">User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead className="hidden md:table-cell">Details</TableHead>
                  <TableHead className="hidden lg:table-cell">Browser</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                      <Activity className="h-10 w-10 mx-auto mb-3 opacity-50" />
                      No activity logs found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id} className="border-border/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border border-border">
                            <AvatarImage src={log.user_avatar || undefined} />
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {getInitials(log.user_name || null, log.user_email)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate">
                              {log.user_name || 'Unknown User'}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {log.user_email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getActionIcon(log.action)}
                          <Badge variant="outline" className={`text-xs ${getActionBadgeColor(log.action)}`}>
                            {formatActionName(log.action)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <p className="text-xs text-muted-foreground max-w-[200px] truncate">
                          {Object.keys(log.details || {}).length > 0 
                            ? JSON.stringify(log.details).slice(0, 50) + '...'
                            : '-'}
                        </p>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Monitor className="h-3 w-3" />
                          {parseUserAgent(log.user_agent)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span title={formatFullDate(log.created_at)}>
                            {formatDate(log.created_at)}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {filteredLogs.length > 0 && (
        <p className="text-center text-xs text-muted-foreground">
          Showing {filteredLogs.length} of {logs.length} activity logs
        </p>
      )}
    </div>
  );
};

export default UserActivityLogs;

import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield, User, Mail, Pencil, Camera, Search, Users, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { logActivity } from "@/hooks/useActivityLogger";
interface UserWithRole {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  role: string;
}
const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingUser, setUpdatingUser] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingUser, setEditingUser] = useState<UserWithRole | null>(null);
  const [editForm, setEditForm] = useState({
    full_name: "",
    email: "",
    avatar_url: "",
  });
  const [saving, setSaving] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [addForm, setAddForm] = useState({
    email: "",
    password: "",
    full_name: "",
    role: "user" as "admin" | "moderator" | "user" | "client",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [adding, setAdding] = useState(false);
  const [deletingUser, setDeletingUser] = useState<UserWithRole | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();
  const { user: currentUser } = useAuth();
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, email, full_name, avatar_url, created_at")
        .order("created_at", {
          ascending: false,
        });
      if (profilesError) throw profilesError;
      const { data: roles, error: rolesError } = await supabase.from("user_roles").select("user_id, role");
      if (rolesError) throw rolesError;
      const rolesMap = new Map(roles?.map((r) => [r.user_id, r.role]) || []);
      const usersWithRoles: UserWithRole[] = (profiles || []).map((profile) => ({
        ...profile,
        role: rolesMap.get(profile.id) || "user",
      }));
      setUsers(usersWithRoles);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const updateUserRole = async (userId: string, newRole: string) => {
    setUpdatingUser(userId);
    try {
      const validRole = newRole as "admin" | "moderator" | "user" | "client";
      const targetUser = users.find(u => u.id === userId);
      const oldRole = targetUser?.role;
      
      const { data: existingRole } = await supabase.from("user_roles").select("id").eq("user_id", userId).maybeSingle();
      if (existingRole) {
        const { error } = await supabase
          .from("user_roles")
          .update({
            role: validRole,
          })
          .eq("user_id", userId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("user_roles").insert([
          {
            user_id: userId,
            role: validRole,
          },
        ]);
        if (error) throw error;
      }
      setUsers(
        users.map((u) =>
          u.id === userId
            ? {
                ...u,
                role: newRole,
              }
            : u,
        ),
      );
      
      // Log role change
      if (currentUser) {
        logActivity({
          userId: currentUser.id,
          action: 'role_change',
          details: { target_user_id: userId, target_email: targetUser?.email, old_role: oldRole, new_role: newRole }
        });
      }
      
      toast({
        title: "Role Updated",
        description: `User role changed to ${newRole}`,
      });
    } catch (error) {
      console.error("Error updating role:", error);
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    } finally {
      setUpdatingUser(null);
    }
  };
  const openEditDialog = (user: UserWithRole) => {
    setEditingUser(user);
    setEditForm({
      full_name: user.full_name || "",
      email: user.email || "",
      avatar_url: user.avatar_url || "",
    });
  };
  const saveUserProfile = async () => {
    if (!editingUser) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: editForm.full_name.trim() || null,
          email: editForm.email.trim() || null,
          avatar_url: editForm.avatar_url.trim() || null,
        })
        .eq("id", editingUser.id);
      if (error) throw error;
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                full_name: editForm.full_name,
                email: editForm.email,
                avatar_url: editForm.avatar_url,
              }
            : u,
        ),
      );
      
      // Log profile update
      if (currentUser) {
        logActivity({
          userId: currentUser.id,
          action: 'profile_update',
          details: { target_user_id: editingUser.id, target_email: editingUser.email, updated_by: 'admin' }
        });
      }
      
      toast({
        title: "Profile Updated",
        description: "User profile has been updated successfully",
      });
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update user profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "moderator":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "client":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(dateString));
  };
  const getInitials = (name: string | null, email: string | null) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return "U";
  };
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.full_name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    );
  });

  const addUser = async () => {
    if (!addForm.email || !addForm.password) {
      toast({
        title: "Error",
        description: "Email and password are required",
        variant: "destructive",
      });
      return;
    }

    if (addForm.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setAdding(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const response = await fetch(
        `https://jtoabocyojjmivziamtv.supabase.co/functions/v1/admin-create-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            email: addForm.email,
            password: addForm.password,
            full_name: addForm.full_name || undefined,
            role: addForm.role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create user");
      }

      // Log user creation
      if (currentUser) {
        logActivity({
          userId: currentUser.id,
          action: 'user_created',
          details: { created_email: addForm.email, created_role: addForm.role }
        });
      }

      toast({
        title: "User Created",
        description: `Successfully created user ${addForm.email}`,
      });

      setShowAddDialog(false);
      setAddForm({ email: "", password: "", full_name: "", role: "user" });
      fetchUsers();
    } catch (error: any) {
      console.error("Error creating user:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create user",
        variant: "destructive",
      });
    } finally {
      setAdding(false);
    }
  };

  const deleteUser = async () => {
    if (!deletingUser) return;

    setDeleting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const response = await fetch(
        `https://jtoabocyojjmivziamtv.supabase.co/functions/v1/admin-delete-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ user_id: deletingUser.id }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete user");
      }

      // Log user deletion
      if (currentUser) {
        logActivity({
          userId: currentUser.id,
          action: 'user_deleted',
          details: { deleted_user_id: deletingUser.id, deleted_email: deletingUser.email }
        });
      }

      toast({
        title: "User Deleted",
        description: `Successfully deleted user ${deletingUser.email}`,
      });

      setDeletingUser(null);
      setUsers(users.filter(u => u.id !== deletingUser.id));
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete user",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-muted-foreground">Loading users...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="py-20 text-center">
        <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground mb-4">No users found</p>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4 text-center bg-primary-foreground">
            <p className="text-2xl font-bold text-foreground">{users.length}</p>
            <p className="text-xs text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4 text-center bg-primary-foreground">
            <p className="text-2xl font-bold text-red-400">{users.filter((u) => u.role === "admin").length}</p>
            <p className="text-xs text-muted-foreground">Admins</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4 text-center bg-primary-foreground">
            <p className="text-2xl font-bold text-green-400">{users.filter((u) => u.role === "client").length}</p>
            <p className="text-xs text-muted-foreground">Clients</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4 text-center bg-primary-foreground">
            <p className="text-2xl font-bold text-blue-400">{users.filter((u) => u.role === "moderator").length}</p>
            <p className="text-xs text-muted-foreground">Moderators</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Add Button */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-border/50"
          />
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* User Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="bg-card/50 border-border/50 hover:border-primary/30 transition-colors">
            <CardContent className="p-5 rounded-none shadow-none bg-primary-foreground border text-primary">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <Avatar className="h-14 w-14 border-2 border-border">
                  <AvatarImage src={user.avatar_url || undefined} alt={user.full_name || "User"} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getInitials(user.full_name, user.email)}
                  </AvatarFallback>
                </Avatar>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground truncate">{user.full_name || "No Name"}</h3>
                    <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getRoleBadgeColor(user.role)}`}>
                      {user.role}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{user.email || "No email"}</span>
                  </div>

                  <p className="text-xs text-muted-foreground">Joined {formatDate(user.created_at)}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
                <Button variant="outline" size="sm" onClick={() => openEditDialog(user)} className="h-8 text-xs">
                  <Pencil className="h-3 w-3 mr-1.5" />
                  Edit
                </Button>

                <Select
                  value={user.role}
                  onValueChange={(value) => updateUserRole(user.id, value)}
                  disabled={updatingUser === user.id}
                >
                  <SelectTrigger className="w-24 h-8 text-xs bg-background/50 border-border/50">
                    {updatingUser === user.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <SelectValue />}
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeletingUser(user)}
                  className="h-8 text-xs text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="py-12 text-center">
          <Search className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
          <p className="text-muted-foreground">No users match your search</p>
        </div>
      )}

      {/* Edit User Dialog */}
      <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Edit User Profile
            </DialogTitle>
            <DialogDescription>Update the user's profile information</DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            {/* Avatar Preview */}
            <div className="flex flex-col items-center gap-3">
              <Avatar className="h-20 w-20 border-2 border-border">
                <AvatarImage src={editForm.avatar_url || undefined} alt="Preview" />
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                  {getInitials(editForm.full_name, editForm.email)}
                </AvatarFallback>
              </Avatar>
              <p className="text-xs text-muted-foreground">Avatar Preview</p>
            </div>

            {/* Avatar URL */}
            <div className="space-y-2">
              <Label htmlFor="avatar_url" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Avatar URL
              </Label>
              <Input
                id="avatar_url"
                value={editForm.avatar_url}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    avatar_url: e.target.value,
                  })
                }
                placeholder="https://example.com/avatar.jpg"
                className="bg-background/50 border-border/50"
              />
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="full_name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name
              </Label>
              <Input
                id="full_name"
                value={editForm.full_name}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    full_name: e.target.value,
                  })
                }
                placeholder="John Doe"
                className="bg-background/50 border-border/50"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    email: e.target.value,
                  })
                }
                placeholder="john@example.com"
                className="bg-background/50 border-border/50"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingUser(null)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={saveUserProfile} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Add New User
            </DialogTitle>
            <DialogDescription>Create a new user account</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="new_email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address *
              </Label>
              <Input
                id="new_email"
                type="email"
                value={addForm.email}
                onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                placeholder="user@example.com"
                className="bg-background/50 border-border/50"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="new_password" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Password *
              </Label>
              <div className="relative">
                <Input
                  id="new_password"
                  type={showPassword ? "text" : "password"}
                  value={addForm.password}
                  onChange={(e) => setAddForm({ ...addForm, password: e.target.value })}
                  placeholder="Minimum 6 characters"
                  className="bg-background/50 border-border/50 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="new_full_name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name
              </Label>
              <Input
                id="new_full_name"
                value={addForm.full_name}
                onChange={(e) => setAddForm({ ...addForm, full_name: e.target.value })}
                placeholder="John Doe"
                className="bg-background/50 border-border/50"
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Role
              </Label>
              <Select
                value={addForm.role}
                onValueChange={(value: "admin" | "moderator" | "user" | "client") =>
                  setAddForm({ ...addForm, role: value })
                }
              >
                <SelectTrigger className="bg-background/50 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)} disabled={adding}>
              Cancel
            </Button>
            <Button onClick={addUser} disabled={adding}>
              {adding ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                "Create User"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation */}
      <AlertDialog open={!!deletingUser} onOpenChange={(open) => !open && setDeletingUser(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-destructive" />
              Delete User
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{deletingUser?.full_name || deletingUser?.email}</strong>?
              This action cannot be undone and will permanently remove the user and all their data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteUser}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                "Delete User"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default UserManagement;

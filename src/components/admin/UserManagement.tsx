import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Shield, User, Mail, Pencil, Camera, Search, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState<UserWithRole | null>(null);
  const [editForm, setEditForm] = useState({
    full_name: '',
    email: '',
    avatar_url: ''
  });
  const [saving, setSaving] = useState(false);
  const {
    toast
  } = useToast();
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const {
        data: profiles,
        error: profilesError
      } = await supabase.from('profiles').select('id, email, full_name, avatar_url, created_at').order('created_at', {
        ascending: false
      });
      if (profilesError) throw profilesError;
      const {
        data: roles,
        error: rolesError
      } = await supabase.from('user_roles').select('user_id, role');
      if (rolesError) throw rolesError;
      const rolesMap = new Map(roles?.map(r => [r.user_id, r.role]) || []);
      const usersWithRoles: UserWithRole[] = (profiles || []).map(profile => ({
        ...profile,
        role: rolesMap.get(profile.id) || 'user'
      }));
      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to load users',
        variant: 'destructive'
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
      const validRole = newRole as 'admin' | 'moderator' | 'user' | 'client';
      const {
        data: existingRole
      } = await supabase.from('user_roles').select('id').eq('user_id', userId).maybeSingle();
      if (existingRole) {
        const {
          error
        } = await supabase.from('user_roles').update({
          role: validRole
        }).eq('user_id', userId);
        if (error) throw error;
      } else {
        const {
          error
        } = await supabase.from('user_roles').insert([{
          user_id: userId,
          role: validRole
        }]);
        if (error) throw error;
      }
      setUsers(users.map(u => u.id === userId ? {
        ...u,
        role: newRole
      } : u));
      toast({
        title: 'Role Updated',
        description: `User role changed to ${newRole}`
      });
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: 'Error',
        description: 'Failed to update user role',
        variant: 'destructive'
      });
    } finally {
      setUpdatingUser(null);
    }
  };
  const openEditDialog = (user: UserWithRole) => {
    setEditingUser(user);
    setEditForm({
      full_name: user.full_name || '',
      email: user.email || '',
      avatar_url: user.avatar_url || ''
    });
  };
  const saveUserProfile = async () => {
    if (!editingUser) return;
    setSaving(true);
    try {
      const {
        error
      } = await supabase.from('profiles').update({
        full_name: editForm.full_name.trim() || null,
        email: editForm.email.trim() || null,
        avatar_url: editForm.avatar_url.trim() || null
      }).eq('id', editingUser.id);
      if (error) throw error;
      setUsers(users.map(u => u.id === editingUser.id ? {
        ...u,
        full_name: editForm.full_name,
        email: editForm.email,
        avatar_url: editForm.avatar_url
      } : u));
      toast({
        title: 'Profile Updated',
        description: 'User profile has been updated successfully'
      });
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update user profile',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'moderator':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'client':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(dateString));
  };
  const getInitials = (name: string | null, email: string | null) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return 'U';
  };
  const filteredUsers = users.filter(user => {
    const query = searchQuery.toLowerCase();
    return user.full_name?.toLowerCase().includes(query) || user.email?.toLowerCase().includes(query) || user.role.toLowerCase().includes(query);
  });
  if (loading) {
    return <div className="py-20 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-muted-foreground">Loading users...</p>
      </div>;
  }
  if (users.length === 0) {
    return <div className="py-20 text-center">
        <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">No users found</p>
      </div>;
  }
  return <div className="space-y-6">
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
            <p className="text-2xl font-bold text-red-400">{users.filter(u => u.role === 'admin').length}</p>
            <p className="text-xs text-muted-foreground">Admins</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4 text-center bg-primary-foreground">
            <p className="text-2xl font-bold text-green-400">{users.filter(u => u.role === 'client').length}</p>
            <p className="text-xs text-muted-foreground">Clients</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4 text-center bg-primary-foreground">
            <p className="text-2xl font-bold text-blue-400">{users.filter(u => u.role === 'moderator').length}</p>
            <p className="text-xs text-muted-foreground">Moderators</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by name, email, or role..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 bg-background/50 border-border/50" />
      </div>

      {/* User Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map(user => <Card key={user.id} className="bg-card/50 border-border/50 hover:border-primary/30 transition-colors">
            <CardContent className="p-5 rounded-none shadow-none bg-primary-foreground border text-primary">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <Avatar className="h-14 w-14 border-2 border-border">
                  <AvatarImage src={user.avatar_url || undefined} alt={user.full_name || 'User'} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getInitials(user.full_name, user.email)}
                  </AvatarFallback>
                </Avatar>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground truncate">
                      {user.full_name || 'No Name'}
                    </h3>
                    <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getRoleBadgeColor(user.role)}`}>
                      {user.role}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{user.email || 'No email'}</span>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Joined {formatDate(user.created_at)}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
                <Button variant="outline" size="sm" onClick={() => openEditDialog(user)} className="flex-1 h-8 text-xs">
                  <Pencil className="h-3 w-3 mr-1.5" />
                  Edit Profile
                </Button>
                
                <Select value={user.role} onValueChange={value => updateUserRole(user.id, value)} disabled={updatingUser === user.id}>
                  <SelectTrigger className="w-28 h-8 text-xs bg-background/50 border-border/50">
                    {updatingUser === user.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <SelectValue />}
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>)}
      </div>

      {filteredUsers.length === 0 && <div className="py-12 text-center">
          <Search className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
          <p className="text-muted-foreground">No users match your search</p>
        </div>}

      {/* Edit User Dialog */}
      <Dialog open={!!editingUser} onOpenChange={open => !open && setEditingUser(null)}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Edit User Profile
            </DialogTitle>
            <DialogDescription>
              Update the user's profile information
            </DialogDescription>
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
              <Input id="avatar_url" value={editForm.avatar_url} onChange={e => setEditForm({
              ...editForm,
              avatar_url: e.target.value
            })} placeholder="https://example.com/avatar.jpg" className="bg-background/50 border-border/50" />
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="full_name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name
              </Label>
              <Input id="full_name" value={editForm.full_name} onChange={e => setEditForm({
              ...editForm,
              full_name: e.target.value
            })} placeholder="John Doe" className="bg-background/50 border-border/50" />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input id="email" type="email" value={editForm.email} onChange={e => setEditForm({
              ...editForm,
              email: e.target.value
            })} placeholder="john@example.com" className="bg-background/50 border-border/50" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingUser(null)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={saveUserProfile} disabled={saving}>
              {saving ? <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </> : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
};
export default UserManagement;
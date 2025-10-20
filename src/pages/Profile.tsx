import { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { Edit, Eye, EyeOff, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { updateAvatar } from '@/store/slices/authSlice';

const Profile = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const progress = useAppSelector((state) => state.progress);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    // TODO: Implement password change with Firebase/GCP
    toast.success('Password changed successfully');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleImageUpload = () => {
    // @ts-ignore - Cloudinary widget
    if (window.cloudinary) {
      // @ts-ignore
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: 'YOUR_CLOUD_NAME', // User needs to replace this
          uploadPreset: 'YOUR_UPLOAD_PRESET', // User needs to replace this
          sources: ['local', 'camera'],
          multiple: false,
          cropping: true,
          croppingAspectRatio: 1,
          croppingShowDimensions: true,
          folder: 'profile_pictures',
        },
        (error: any, result: any) => {
          if (!error && result && result.event === 'success') {
            const imageUrl = result.info.secure_url;
            dispatch(updateAvatar(imageUrl));
            toast.success('Profile picture updated successfully!');
          }
        }
      );
      widget.open();
    } else {
      toast.error('Please add Cloudinary configuration first');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 md:col-span-2">
            {/* Profile Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative group">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className="text-2xl">
                          {user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <button
                        onClick={handleImageUpload}
                        className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Change profile picture"
                      >
                        <Camera className="h-8 w-8 text-white" />
                      </button>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{user?.name}</h2>
                      <p className="text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold">{progress.totalSolved}</div>
                  <p className="text-sm text-muted-foreground">problems solved</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold">{progress.currentStreak}</div>
                  <p className="text-sm text-muted-foreground">day streak</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold">{progress.totalPoints}</div>
                  <p className="text-sm text-muted-foreground">points</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold">{progress.longestStreak}</div>
                  <p className="text-sm text-muted-foreground">longest streak</p>
                </CardContent>
              </Card>
            </div>

            {/* Personal Information */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input defaultValue={user?.name?.split(' ')[0]} disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input defaultValue={user?.name?.split(' ')[1] || ''} disabled={!isEditing} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue={user?.email} disabled />
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <div className="relative">
                      <Input
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>New Password</Label>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <Button type="submit">Change Password</Button>
                </form>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.values(progress.solvedProblems)
                  .filter(p => p.solved)
                  .sort((a, b) => (b.lastAttempt || '').localeCompare(a.lastAttempt || ''))
                  .slice(0, 5)
                  .map((problem) => (
                    <div key={problem.problemId} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">Completed {problem.problemId}</p>
                        <p className="text-sm text-muted-foreground">
                          {problem.lastAttempt ? new Date(problem.lastAttempt).toLocaleDateString() : 'Recently'}
                        </p>
                      </div>
                      <Badge>+{problem.pointsEarned || 10} pts</Badge>
                    </div>
                  ))}
                {Object.keys(progress.solvedProblems).length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No activity yet. Start solving problems!</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Progress Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Easy</span>
                    <span className="text-muted-foreground">{progress.easyCount}/20</span>
                  </div>
                  <Progress value={(progress.easyCount / 20) * 100} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Medium</span>
                    <span className="text-muted-foreground">{progress.mediumCount}/15</span>
                  </div>
                  <Progress value={(progress.mediumCount / 15) * 100} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Hard</span>
                    <span className="text-muted-foreground">{progress.hardCount}/10</span>
                  </div>
                  <Progress value={(progress.hardCount / 10) * 100} />
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {progress.achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`flex flex-col items-center justify-center rounded-lg border p-4 ${
                        achievement.locked ? 'opacity-50' : ''
                      }`}
                      title={achievement.description}
                    >
                      <div className="mb-2 text-2xl">🏆</div>
                      <p className="text-center text-xs font-medium">{achievement.name}</p>
                      {achievement.locked && (
                        <p className="text-xs text-muted-foreground">Locked</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Streak Tracker */}
            <Card>
              <CardHeader>
                <CardTitle>Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="mb-4 text-4xl font-bold">{progress.currentStreak}</div>
                  <p className="mb-4 text-sm text-muted-foreground">day streak</p>
                  <div className="flex justify-center gap-2">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                      <div
                        key={i}
                        className={`flex h-8 w-8 items-center justify-center rounded-md text-xs ${
                          i < progress.currentStreak
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">Keep it up!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;

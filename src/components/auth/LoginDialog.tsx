import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { loginUser } from '@/store/slices/authSlice';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onForgotPassword?: () => void;
}

export const LoginDialog = ({ open, onOpenChange, onForgotPassword }: LoginDialogProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth with Firebase/GCP
    toast.info('Google OAuth login - Configure Firebase Authentication');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    dispatch(loginUser(email, password));
    
    // Close dialog after successful login (in real app, you'd check the result)
    setTimeout(() => {
      onOpenChange(false);
      setEmail('');
      setPassword('');
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-8 bg-background border border-border">
        <div className="space-y-6">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-3xl font-bold text-foreground">
              Sign In
            </DialogTitle>
            <p className="text-muted-foreground text-sm">Welcome back! Continue your SQL journey</p>
          </DialogHeader>

          <div className="space-y-4">
            <Button 
              type="button" 
              className="w-full h-12 text-base font-semibold bg-[hsl(var(--google))] text-[hsl(var(--google-foreground))] hover:bg-[hsl(var(--google))]/90 transition-colors"
              onClick={handleGoogleLogin}
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-3 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={isLoading}
                    className="h-11 border-border focus-visible:ring-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      disabled={isLoading}
                      className="h-11 pr-10 border-border focus-visible:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-bold bg-primary text-primary-foreground hover:bg-primary-dark transition-colors shadow-sm" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>

              <div className="flex flex-col items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onOpenChange(false);
                    onForgotPassword?.();
                  }}
                  className="text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-md transition-colors font-medium"
                >
                  Forgot password?
                </button>
                
                <div className="text-xs text-muted-foreground bg-muted px-4 py-2 rounded-md">
                  Demo: john@example.com / password123
                </div>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
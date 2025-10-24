import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ThemeToggle } from './ThemeToggle';
import { useEditMode } from '@/context/EditModeContext';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { editMode, setEditMode, isAdmin } = useEditMode();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/events', label: 'Events' },
    { to: '/teachers', label: 'Teachers' },
    { to: '/blog', label: 'Blog' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/contact', label: 'Contact' },
    { to: '/donate', label: 'Donate' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur shadow-soft">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            IIMC
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          {isAdmin && (
            <>
              <Button
                variant={editMode ? 'default' : 'outline'}
                size="sm"
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? 'Exit Edit' : 'Edit Mode'}
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/admin')}>
                Admin
              </Button>
            </>
          )}
          {user ? (
            <>
              <Button variant="outline" size="sm" onClick={() => navigate('/profile')}>
                Profile
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/activities')}>
                My Activities
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={() => navigate('/auth')}>
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col space-y-4 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Theme</span>
              <ThemeToggle />
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <>
                <Button
                  variant={editMode ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setEditMode(!editMode);
                    setIsOpen(false);
                  }}
                >
                  {editMode ? 'Exit Edit' : 'Edit Mode'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigate('/admin');
                    setIsOpen(false);
                  }}
                >
                  Admin
                </Button>
              </>
            )}
            {user ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigate('/profile');
                    setIsOpen(false);
                  }}
                >
                  Profile
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigate('/activities');
                    setIsOpen(false);
                  }}
                >
                  My Activities
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                onClick={() => {
                  navigate('/auth');
                  setIsOpen(false);
                }}
              >
                Sign In
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

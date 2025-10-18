import { Link } from 'react-router-dom';
import { useSetting } from '@/hooks/useSetting';

export function Footer() {
  const { value: email } = useSetting('contact_email');
  const { value: phone } = useSetting('contact_phone');

  return (
    <footer className="border-t bg-muted/30 mt-20">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4 gradient-primary bg-clip-text text-transparent">
              Serenity
            </h3>
            <p className="text-sm text-muted-foreground">
              A sanctuary for mindfulness, meditation, and inner peace.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-smooth">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-primary transition-smooth">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/teachers" className="text-muted-foreground hover:text-primary transition-smooth">
                  Teachers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-smooth">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/donate" className="text-muted-foreground hover:text-primary transition-smooth">
                  Donate
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-smooth">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{email}</li>
              <li>{phone}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Serenity Meditation Center. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

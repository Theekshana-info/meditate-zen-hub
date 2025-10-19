import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { EditableText } from './EditableText';
import heroImage from '@/assets/hero-meditation.jpg';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-4 space-y-6">
        <EditableText
          settingKey="hero_title"
          as="h1"
          className="text-5xl md:text-7xl font-bold text-foreground drop-shadow-lg animate-fade-in"
        />
        <EditableText
          settingKey="hero_subtitle"
          as="p"
          className="text-xl md:text-2xl text-foreground/90 drop-shadow-md animate-fade-in"
        />
        <div className="flex flex-wrap gap-4 justify-center pt-6 animate-fade-in">
          <Button
            size="lg"
            className="shadow-glow hover:shadow-soft transition-smooth"
            onClick={() => navigate('/events')}
          >
            Explore Events
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/about')}
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}

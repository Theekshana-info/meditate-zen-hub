import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { EditableText } from './EditableText';
import heroImage from '@/assets/hero-meditation-zen.jpg';
import { Sparkles } from 'lucide-react';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Animated Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Gradient Overlay with Animation */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80 animate-breathe" />
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-[10%] w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-[15%] w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content with Enhanced Animations */}
      <div className="relative z-10 text-center max-w-4xl px-4 space-y-8">
        {/* Decorative Icon */}
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-primary/10 backdrop-blur-sm animate-fade-in-scale">
            <Sparkles className="w-8 h-8 text-primary animate-breathe" />
          </div>
        </div>

        {/* Title with Staggered Animation */}
        <div className="animate-fade-in-up">
          <EditableText
            settingKey="hero_title"
            as="h1"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground drop-shadow-2xl"
          />
        </div>
        
        {/* Subtitle with Delay */}
        <div className="animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
          <EditableText
            settingKey="hero_subtitle"
            as="p"
            className="text-xl md:text-2xl lg:text-3xl text-foreground/90 drop-shadow-lg max-w-2xl mx-auto"
          />
        </div>
        
        {/* CTA Buttons with Hover Effects */}
        <div className="flex flex-wrap gap-4 justify-center pt-8 animate-fade-in-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
          <Button
            size="lg"
            className="shadow-glow hover-glow transition-smooth text-lg px-8 py-6"
            onClick={() => navigate('/events')}
          >
            Explore Events
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="hover-lift backdrop-blur-sm bg-background/50 text-lg px-8 py-6"
            onClick={() => navigate('/about')}
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

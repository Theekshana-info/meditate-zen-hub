import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useSetting } from '@/hooks/useSetting';
import heroImage from '@/assets/hero-meditation-zen.jpg';
import { Sparkles } from 'lucide-react';

export function Hero() {
  const navigate = useNavigate();
  const { value: title } = useSetting('hero_title');
  const { value: subtitle } = useSetting('hero_subtitle');

  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Animated Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80 animate-breathe" />
        <div className="absolute top-20 left-[10%] w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-[15%] w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 text-center max-w-4xl px-4 space-y-6 sm:space-y-8">
        <div className="flex justify-center mb-4">
          <div className="p-3 sm:p-4 rounded-full bg-primary/10 backdrop-blur-sm animate-fade-in-scale">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary animate-breathe" />
          </div>
        </div>

        <div className="animate-fade-in-up">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-foreground drop-shadow-2xl">
            {title}
          </h1>
        </div>
        
        <div className="animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
          <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-foreground/90 drop-shadow-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-8 animate-fade-in-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
          <Button
            size="lg"
            className="shadow-glow hover-glow transition-smooth text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto"
            onClick={() => navigate('/events')}
          >
            Explore Events
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="hover-lift backdrop-blur-sm bg-background/50 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto"
            onClick={() => navigate('/about')}
          >
            Learn More
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

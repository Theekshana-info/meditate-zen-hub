import { Hero } from '@/components/Hero';
import { HomeMessage } from '@/components/HomeMessage';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, BookOpen, Heart } from 'lucide-react';
import { format } from 'date-fns';

export default function Home() {
  const navigate = useNavigate();

  const { data: upcomingEvents } = useQuery({
    queryKey: ['upcoming-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('event_date', new Date().toISOString())
        .order('event_date', { ascending: true })
        .limit(3);

      if (error) throw error;
      return data;
    },
  });

  const features = [
    {
      icon: Calendar,
      title: 'Meditation Sessions',
      description: 'Join our daily group meditation sessions led by experienced teachers.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with like-minded individuals on the path to mindfulness.',
    },
    {
      icon: BookOpen,
      title: 'Teachings',
      description: 'Access our library of wisdom teachings and dharma talks.',
    },
    {
      icon: Heart,
      title: 'Wellness',
      description: 'Holistic approach to mental, physical, and spiritual well-being.',
    },
  ];

  return (
    <div className="min-h-screen">
      <HomeMessage />
      <Hero />

      {/* Features Section */}
      <section className="container px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 animate-fade-in-up">
          What We Offer
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Discover the transformative experiences we provide for your journey to inner peace
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="gradient-card shadow-soft hover-lift overflow-hidden group animate-fade-in-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="mb-4 p-3 bg-primary/10 rounded-full w-fit group-hover:scale-110 transition-smooth">
                  <feature.icon className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="group-hover:text-primary transition-smooth">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
              {/* Hover Gradient Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents && upcomingEvents.length > 0 && (
        <section className="container px-4 py-20 relative">
          {/* Background Decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent -z-10" />
          
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 animate-fade-in-up">
            Upcoming Events
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Join us for these transformative meditation sessions and workshops
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card 
                key={event.id} 
                className="shadow-soft hover-lift overflow-hidden group animate-fade-in-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {event.image_url && (
                  <div className="relative overflow-hidden">
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-smooth">{event.title}</CardTitle>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(event.event_date), 'PPP')}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {event.description}
                  </p>
                  <Button 
                    onClick={() => navigate(`/events/${event.id}`)}
                    className="w-full hover-glow"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate('/events')}
              className="hover-lift"
            >
              View All Events
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}

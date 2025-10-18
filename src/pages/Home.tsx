import { Hero } from '@/components/Hero';
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
      <Hero />

      {/* Features Section */}
      <section className="container px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="gradient-card shadow-soft hover:shadow-glow transition-smooth">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents && upcomingEvents.length > 0 && (
        <section className="container px-4 py-20 bg-muted/30">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="shadow-soft hover:shadow-glow transition-smooth">
                {event.image_url && (
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(event.event_date), 'PPP')}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {event.description}
                  </p>
                  <Button onClick={() => navigate(`/events/${event.id}`)}>
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" onClick={() => navigate('/events')}>
              View All Events
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}

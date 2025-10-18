import { EditableText } from '@/components/EditableText';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  return (
    <div className="min-h-screen py-20">
      <div className="container px-4 max-w-4xl">
        <EditableText
          settingKey="about_title"
          as="h1"
          className="text-4xl md:text-5xl font-bold text-center mb-6"
        />
        <EditableText
          settingKey="about_content"
          as="p"
          multiline
          className="text-lg text-muted-foreground text-center mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To provide a welcoming sanctuary where individuals can explore meditation practices,
                cultivate mindfulness, and discover inner peace through authentic teachings and community support.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                To create a world where more people have access to the transformative power of meditation,
                leading to greater compassion, awareness, and harmony in daily life.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

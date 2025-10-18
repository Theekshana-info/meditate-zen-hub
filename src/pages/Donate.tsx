import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

export default function Donate() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  
  const predefinedAmounts = [1000, 2500, 5000, 10000];

  const handleDonate = () => {
    const donationAmount = amount || customAmount;
    
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      toast.error('Please enter a valid donation amount');
      return;
    }

    // Navigate to payment page with donation details
    navigate('/payment', {
      state: {
        amount: parseFloat(donationAmount),
        type: 'donation',
        description: 'Donation to Serenity Meditation Center',
      },
    });
  };

  return (
    <div className="min-h-screen py-20 gradient-hero">
      <div className="container px-4 max-w-2xl">
        <div className="text-center mb-12">
          <Heart className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Support Our Mission</h1>
          <p className="text-lg text-muted-foreground">
            Your generous donation helps us maintain our meditation center and offer teachings to the community.
          </p>
        </div>

        <Card className="shadow-glow">
          <CardHeader>
            <CardTitle>Make a Donation</CardTitle>
            <CardDescription>Choose an amount or enter your own</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {predefinedAmounts.map((value) => (
                <Button
                  key={value}
                  variant={amount === value.toString() ? 'default' : 'outline'}
                  onClick={() => {
                    setAmount(value.toString());
                    setCustomAmount('');
                  }}
                  className="h-20"
                >
                  LKR {value}
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-amount">Or enter a custom amount (LKR)</Label>
              <Input
                id="custom-amount"
                type="number"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setAmount('');
                }}
              />
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={handleDonate}
            >
              Continue to Payment
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              <p>Your donation is secure and helps support our community programs.</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tax Deductible</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Donations to registered non-profit organizations may be tax-deductible.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Transparent Use</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We ensure all donations are used responsibly for center operations and programs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

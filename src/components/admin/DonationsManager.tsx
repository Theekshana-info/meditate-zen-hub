import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export function DonationsManager() {
  const { data: payments } = useQuery({
    queryKey: ['admin-payments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payments')
        .select(`
          *,
          profiles:user_id (full_name, email)
        `)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Gateway</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments?.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>
                {(() => {
                  const profile = payment.profiles;
                  if (profile && typeof profile !== 'string' && 'email' in profile) {
                    return (profile as any).email;
                  }
                  return 'N/A';
                })()}
              </TableCell>
              <TableCell>{payment.payment_type}</TableCell>
              <TableCell>
                {payment.currency} {payment.amount}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    payment.status === 'completed'
                      ? 'default'
                      : payment.status === 'pending'
                      ? 'secondary'
                      : 'destructive'
                  }
                >
                  {payment.status}
                </Badge>
              </TableCell>
              <TableCell>{payment.payment_gateway}</TableCell>
              <TableCell>{format(new Date(payment.created_at), 'PPP')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

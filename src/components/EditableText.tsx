import { useState } from 'react';
import { useSetting } from '@/hooks/useSetting';
import { useEditMode } from '@/context/EditModeContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Pencil, Check, X } from 'lucide-react';
import { toast } from 'sonner';

interface EditableTextProps {
  settingKey: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  multiline?: boolean;
}

export function EditableText({ settingKey, as: Component = 'span', className = '', multiline = false }: EditableTextProps) {
  const { value, loading, update } = useSetting(settingKey);
  const { editMode } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');

  const startEdit = () => {
    setEditValue(value);
    setIsEditing(true);
  };

  const saveEdit = () => {
    update(editValue, {
      onSuccess: () => {
        toast.success('Setting updated');
        setIsEditing(false);
      },
      onError: () => {
        toast.error('Failed to update setting');
      },
    });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditValue('');
  };

  if (loading) {
    return <Component className={className}>Loading...</Component>;
  }

  if (editMode && !isEditing) {
    return (
      <div className="relative inline-block group">
        <Component className={className}>{value}</Component>
        <Button
          size="sm"
          variant="ghost"
          className="absolute -right-10 top-0 opacity-0 group-hover:opacity-100 transition-smooth"
          onClick={startEdit}
        >
          <Pencil className="h-3 w-3" />
        </Button>
      </div>
    );
  }

  if (editMode && isEditing) {
    return (
      <div className="flex items-start gap-2">
        {multiline ? (
          <Textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={className}
          />
        ) : (
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={className}
          />
        )}
        <div className="flex gap-1">
          <Button size="sm" onClick={saveEdit}>
            <Check className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={cancelEdit}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return <Component className={className}>{value}</Component>;
}

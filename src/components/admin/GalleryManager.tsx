import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Loader2, Trash2, Upload, X } from 'lucide-react';
import { ImageUploadField } from './ImageUploadField';
import { GalleryImage } from '@/hooks/useGallery';

export const GalleryManager = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    alt: '',
    src: '',
    placeholder: '',
    width: '',
    height: '',
    tags: '',
    photographer: '',
    license: '',
  });

  const { data: images, isLoading } = useQuery({
    queryKey: ['admin-gallery'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as GalleryImage[];
    },
  });

  const addImageMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from('gallery_images').insert({
        alt: data.alt,
        src: data.src,
        placeholder: data.placeholder || null,
        width: parseInt(data.width),
        height: parseInt(data.height),
        tags: data.tags.split(',').map(t => t.trim()).filter(Boolean),
        photographer: data.photographer || null,
        license: data.license || null,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Image added successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-gallery'] });
      setFormData({
        alt: '',
        src: '',
        placeholder: '',
        width: '',
        height: '',
        tags: '',
        photographer: '',
        license: '',
      });
    },
    onError: () => {
      toast.error('Failed to add image');
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Image deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-gallery'] });
    },
    onError: () => {
      toast.error('Failed to delete image');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.alt || !formData.src || !formData.width || !formData.height) {
      toast.error('Please fill in all required fields');
      return;
    }

    addImageMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Add New Image
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="alt">Image Title/Alt Text *</Label>
                <Input
                  id="alt"
                  value={formData.alt}
                  onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                  placeholder="e.g., Morning meditation session"
                  required
                />
              </div>

              <div>
                <ImageUploadField
                  label="Image"
                  value={formData.src}
                  onChange={(url) => setFormData({ ...formData, src: url })}
                  folder="gallery"
                  required
                />
              </div>

              <div>
                <Label htmlFor="width">Width (px) *</Label>
                <Input
                  id="width"
                  type="number"
                  value={formData.width}
                  onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                  placeholder="1920"
                  required
                />
              </div>

              <div>
                <Label htmlFor="height">Height (px) *</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  placeholder="1080"
                  required
                />
              </div>

              <div>
                <Label htmlFor="photographer">Photographer</Label>
                <Input
                  id="photographer"
                  value={formData.photographer}
                  onChange={(e) => setFormData({ ...formData, photographer: e.target.value })}
                  placeholder="Photographer name"
                />
              </div>

              <div>
                <Label htmlFor="license">License</Label>
                <Input
                  id="license"
                  value={formData.license}
                  onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                  placeholder="e.g., CC BY 4.0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="meditation, nature, peace"
              />
            </div>

            <div>
              <Label htmlFor="placeholder">Placeholder URL (optional)</Label>
              <Input
                id="placeholder"
                value={formData.placeholder}
                onChange={(e) => setFormData({ ...formData, placeholder: e.target.value })}
                placeholder="Small blurred version URL"
              />
            </div>

            <Button
              type="submit"
              disabled={addImageMutation.isPending}
              className="w-full"
            >
              {addImageMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Add Image
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gallery Images ({images?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images?.map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4 space-y-2">
                  <h4 className="font-semibold truncate">{image.alt}</h4>
                  {image.photographer && (
                    <p className="text-sm text-muted-foreground">
                      By {image.photographer}
                    </p>
                  )}
                  {image.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {image.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteImageMutation.mutate(image.id)}
                    disabled={deleteImageMutation.isPending}
                    className="w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {images?.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No images yet. Add your first image above.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

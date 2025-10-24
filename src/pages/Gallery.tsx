import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGallery } from '@/hooks/useGallery';
import { GalleryControls } from '@/components/gallery/GalleryControls';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { LightboxModal } from '@/components/gallery/LightboxModal';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name'>('newest');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { images, allTags, loading, hasMore, loadMore } = useGallery({
    searchQuery,
    selectedTags,
    sortBy,
  });

  // Handle deep linking to specific image
  useEffect(() => {
    const imageId = searchParams.get('image');
    if (imageId && images.length > 0) {
      const index = images.findIndex((img) => img.id === imageId);
      if (index !== -1) {
        setLightboxIndex(index);
      }
    }
  }, [searchParams, images]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    const imageId = images[index].id;
    setSearchParams({ image: imageId });
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
    setSearchParams({});
  };

  const handleLightboxIndexChange = (index: number) => {
    setLightboxIndex(index);
    const imageId = images[index].id;
    setSearchParams({ image: imageId });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Photo Gallery
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
            Explore moments of peace, meditation, and spiritual growth captured at our center
          </p>
        </div>
      </section>

      {/* Controls and Grid */}
      <section className="container mx-auto px-4 py-12">
        <GalleryControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          allTags={allTags}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <GalleryGrid images={images} onImageClick={handleImageClick} />

        {/* Load More */}
        {hasMore && !loading && images.length > 0 && (
          <div className="text-center mt-8">
            <Button onClick={loadMore} size="lg">
              Load More
            </Button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground mt-4">Loading images...</p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <LightboxModal
          images={images}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex !== null}
          onClose={handleCloseLightbox}
          onIndexChange={handleLightboxIndexChange}
        />
      )}
    </div>
  );
};

export default Gallery;

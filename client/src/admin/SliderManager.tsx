import { useState, useEffect } from 'react';
import { Upload, X, Save, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { uploadAPI } from '@/lib/api';

export default function SliderManager() {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSliderImages();
    }, []);

    const fetchSliderImages = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/home-data/slider_images');
            
            // Si la respuesta es 404, de base de datos o el server responde HTML (no api), usar defaults
            const isJson = response.headers.get('content-type')?.includes('application/json');
            
            if (response.ok && isJson) {
                const data = await response.json();
                if (data && data.value && Array.isArray(data.value) && data.value.length > 0) {
                    setImages(data.value);
                } else {
                    setImages(["/images/slider/slide2.jpg", "/images/slider/slide3.jpg", "/images/slider/slide4.jpg"]);
                }
            } else {
                // Fallback (e.g. server restarted or 404)
                setImages(["/images/slider/slide2.jpg", "/images/slider/slide3.jpg", "/images/slider/slide4.jpg"]);
            }
        } catch (error) {
            console.error('Error fetching slider images:', error);
            toast.error('Error al cargar las imágenes del inicio');
        } finally {
            setLoading(false);
        }
    };

    const saveSliderImages = async (newImages: string[]) => {
        try {
            setSaving(true);
            const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
            const response = await fetch('/api/home-data/slider_images', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: JSON.stringify({ value: newImages })
            });

            if (!response.ok) {
                throw new Error('Failed to save slider images');
            }

            toast.success('Imágenes actualizadas correctamente');
            setImages(newImages);
        } catch (error) {
            console.error('Error saving slider images:', error);
            toast.error('Error al guardar las imágenes');
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const token = localStorage.getItem('adminToken') || localStorage.getItem('token');

        try {
            const uploadedUrls: string[] = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const result = await uploadAPI.single(file);
                if (result && result.path) {
                    uploadedUrls.push(result.path);
                }
            }

            const updatedImages = [...images, ...uploadedUrls];
            await saveSliderImages(updatedImages);
            
            toast.success(`${uploadedUrls.length} imagen(es) subida(s) correctamente`);

            // Reset input
            if (e.target) {
                e.target.value = '';
            }
        } catch (error) {
            console.error('Error uploading images:', error);
            toast.error('Error al subir imágenes');
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveImage = (indexToRemove: number) => {
        if (!window.confirm('¿Seguro que quieres eliminar esta imagen del carrusel?')) return;
        
        const updatedImages = images.filter((_, index) => index !== indexToRemove);
        saveSliderImages(updatedImages);
    };

    const moveImage = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === images.length - 1) return;

        const newImages = [...images];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        
        // Swap elements
        [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
        
        saveSliderImages(newImages);
    };

    if (loading) {
        return <div className="p-8">Cargando...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Fotos de Inicio</h1>
                <p className="text-muted-foreground mt-2">
                    Sube y gestiona las imágenes que aparecen en el carrusel principal de la página de inicio.
                </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-neutral-200">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Imágenes del Carrusel</h2>
                    
                    <div className="relative">
                        <input
                            type="file"
                            id="slider-upload"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={uploading || saving}
                        />
                        <Button asChild disabled={uploading || saving}>
                            <label htmlFor="slider-upload" className="cursor-pointer">
                                <Upload className="w-4 h-4 mr-2" />
                                {uploading ? 'Subiendo...' : 'Subir Imágenes'}
                            </label>
                        </Button>
                    </div>
                </div>

                {images.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-neutral-200 rounded-xl">
                        <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
                        <p className="text-neutral-600 font-medium">No hay fotos en el carrusel</p>
                        <p className="text-sm text-neutral-500 mt-1">
                            Sube algunas imágenes para que aparezcan en la página principal
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {images.map((url, index) => (
                            <div 
                                key={`${url}-${index}`} 
                                className="flex items-center gap-4 p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50"
                            >
                                <div className="flex flex-col gap-1">
                                    <button 
                                        onClick={() => moveImage(index, 'up')}
                                        disabled={index === 0 || saving}
                                        className="p-1 hover:bg-neutral-200 rounded disabled:opacity-30 disabled:hover:bg-transparent"
                                        title="Subir"
                                    >
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="min-w-4 min-h-4"><path d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                    </button>
                                    <button 
                                        onClick={() => moveImage(index, 'down')}
                                        disabled={index === images.length - 1 || saving}
                                        className="p-1 hover:bg-neutral-200 rounded disabled:opacity-30 disabled:hover:bg-transparent"
                                        title="Bajar"
                                    >
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="min-w-4 min-h-4"><path d="M7.14645 12.8536C7.34171 13.0488 7.65829 13.0488 7.85355 12.8536L11.8536 8.85355C12.0488 8.65829 12.0488 8.34171 11.8536 8.14645C11.6583 7.95118 11.3417 7.95118 11.1464 8.14645L8 11.2929L8 2.5C8 2.22386 7.77614 2 7.5 2C7.22386 2 7 2.22386 7 2.5L7 11.2929L3.85355 8.14645C3.65829 7.95118 3.34171 7.95118 3.14645 8.14645C2.95118 8.34171 2.95118 8.65829 3.14645 8.85355L7.14645 12.8536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                    </button>
                                </div>
                                
                                <div className="h-20 w-32 shrink-0 bg-neutral-100 rounded overflow-hidden">
                                    <img src={url} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-neutral-900 truncate">{url}</p>
                                    <p className="text-xs text-neutral-500 mt-1">Orden: {index + 1}</p>
                                </div>
                                
                                <Button 
                                    variant="destructive" 
                                    size="icon"
                                    onClick={() => handleRemoveImage(index)}
                                    disabled={saving}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, MoreVertical } from "lucide-react";
import { type BeforeAfterCase } from "@/lib/supabase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ImageGalleryProps {
  cases: BeforeAfterCase[];
  onEdit: (caseId: number) => void;
}

export const ImageGallery = ({ cases, onEdit }: ImageGalleryProps) => {
  const [selectedImages, setSelectedImages] = useState<{ [key: number]: 'before' | 'after' }>({});

  if (cases.length === 0) {
    return (
      <Card className="p-12 text-center">
        <CardContent>
          <div className="text-muted-foreground mb-4">
            Nenhum caso publicado ainda
          </div>
          <p className="text-sm text-muted-foreground">
            Publique alguns casos na aba "Upload de Imagens" para vê-los aqui
          </p>
        </CardContent>
      </Card>
    );
  }

  const toggleImage = (caseId: number, current: 'before' | 'after') => {
    setSelectedImages(prev => ({
      ...prev,
      [caseId]: current === 'before' ? 'after' : 'before'
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cases.map((case_) => {
        const currentImage = selectedImages[case_.id] || 'before';
        const imageToShow = currentImage === 'before' ? case_.beforeImage : case_.afterImage;
        
        return (
          <Card key={case_.id} className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-t-lg aspect-[4/3]">
                {imageToShow ? (
                  <>
                    <img 
                      src={imageToShow}
                      alt={`${currentImage === 'before' ? 'Antes' : 'Depois'} - ${case_.title}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    
                    {/* Before/After Toggle Overlay */}
                    <div 
                      className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors cursor-pointer flex items-center justify-center"
                      onClick={() => toggleImage(case_.id, currentImage)}
                    >
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sm font-medium">
                          Clique para ver {currentImage === 'before' ? 'depois' : 'antes'}
                        </div>
                      </div>
                    </div>

                    {/* Image Type Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge 
                        variant={currentImage === 'before' ? 'secondary' : 'default'}
                        className="bg-white/90 backdrop-blur-sm text-foreground border-0"
                      >
                        {currentImage === 'before' ? 'Antes' : 'Depois'}
                      </Badge>
                    </div>

                    {/* Actions Menu */}
                    <div className="absolute top-3 right-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="secondary" 
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm hover:bg-white"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => onEdit(case_.id)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar Caso
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => window.open(`/#antes-depois`, '_blank')}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Ver no Site
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-muted/30 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Eye className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">Imagens não carregadas</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Case Information */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-serif font-semibold text-foreground line-clamp-2">
                    {case_.title || 'Título não definido'}
                  </h3>
                  <p className="text-sm text-primary font-medium">
                    {case_.age || 'Idade não informada'}
                  </p>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {case_.description || 'Descrição não disponível'}
                </p>

                {/* Case Stats */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      ID: {case_.id}
                    </Badge>
                    {case_.beforeImage && case_.afterImage && (
                      <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                        Completo
                      </Badge>
                    )}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onEdit(case_.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
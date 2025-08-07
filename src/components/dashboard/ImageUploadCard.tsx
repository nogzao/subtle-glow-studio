import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Eye, EyeOff, Save, Trash2, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { BeforeAfterCase } from "./ImageUploadDashboard";
import { toast } from "sonner";

interface ImageUploadCardProps {
  case: BeforeAfterCase;
  onUpdate: (id: number, field: keyof BeforeAfterCase, value: any) => void;
  onRemove: (id: number) => void;
}

export const ImageUploadCard = ({ case: case_, onUpdate, onRemove }: ImageUploadCardProps) => {
  const [isExpanded, setIsExpanded] = useState(!case_.title && !case_.beforeImage);
  const [previewImage, setPreviewImage] = useState<'before' | 'after' | null>(null);

  const handleImageUpload = (type: 'beforeImage' | 'afterImage', file: File) => {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("Imagem muito grande. Máximo 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      onUpdate(case_.id, type, imageUrl);
      toast.success(`Imagem ${type === 'beforeImage' ? 'antes' : 'depois'} carregada!`);
    };
    reader.readAsDataURL(file);
  };

  const isComplete = case_.title && case_.age && case_.description && case_.beforeImage && case_.afterImage;

  return (
    <Card className={`transition-all duration-300 ${case_.isPublished ? 'ring-2 ring-primary/20' : ''}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-lg">
              {case_.title || `Caso #${case_.id}`}
            </CardTitle>
            <div className="flex gap-2">
              {case_.isPublished ? (
                <Badge variant="default" className="bg-green-100 text-green-800">
                  <Check className="w-3 h-3 mr-1" />
                  Publicado
                </Badge>
              ) : (
                <Badge variant="secondary">Rascunho</Badge>
              )}
              {isComplete && (
                <Badge variant="outline" className="text-blue-600 border-blue-200">
                  Completo
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => onRemove(case_.id)}
              className="text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Publishing Control */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <h4 className="font-medium">Status de Publicação</h4>
              <p className="text-sm text-muted-foreground">
                {case_.isPublished ? 'Visível no site' : 'Oculto do site'}
              </p>
            </div>
            <Switch
              checked={case_.isPublished}
              onCheckedChange={(checked) => onUpdate(case_.id, 'isPublished', checked)}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Case Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Título do Tratamento *</label>
                <Input
                  value={case_.title}
                  onChange={(e) => onUpdate(case_.id, 'title', e.target.value)}
                  placeholder="Ex: Suavização de rugas da testa"
                  className="focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Idade da Paciente *</label>
                <Input
                  value={case_.age}
                  onChange={(e) => onUpdate(case_.id, 'age', e.target.value)}
                  placeholder="Ex: 39 anos"
                  className="focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Descrição do Resultado *</label>
                <Textarea
                  value={case_.description}
                  onChange={(e) => onUpdate(case_.id, 'description', e.target.value)}
                  placeholder="Descreva o resultado obtido com o tratamento..."
                  rows={3}
                  className="focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Quick Actions */}
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Ações Rápidas</h4>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(`Caso: ${case_.title}\nIdade: ${case_.age}\nDescrição: ${case_.description}`);
                      toast.success("Informações copiadas!");
                    }}
                  >
                    Copiar Info
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={!isComplete}
                    onClick={() => {
                      onUpdate(case_.id, 'isPublished', true);
                      toast.success("Caso publicado!");
                    }}
                  >
                    <Save className="w-3 h-3 mr-1" />
                    Publicar
                  </Button>
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-4">
              {/* Before Image */}
              <div>
                <label className="block text-sm font-medium mb-2">Imagem "Antes" *</label>
                <div className="border-2 border-dashed border-border rounded-lg overflow-hidden">
                  {case_.beforeImage ? (
                    <div className="relative">
                      <img 
                        src={case_.beforeImage} 
                        alt="Antes" 
                        className="w-full h-40 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setPreviewImage(previewImage === 'before' ? null : 'before')}
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-sm font-medium">Clique para {previewImage === 'before' ? 'fechar' : 'ampliar'}</span>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => onUpdate(case_.id, 'beforeImage', '')}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload('beforeImage', file);
                        }}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Máximo 5MB • JPG, PNG, WEBP
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* After Image */}
              <div>
                <label className="block text-sm font-medium mb-2">Imagem "Depois" *</label>
                <div className="border-2 border-dashed border-border rounded-lg overflow-hidden">
                  {case_.afterImage ? (
                    <div className="relative">
                      <img 
                        src={case_.afterImage} 
                        alt="Depois" 
                        className="w-full h-40 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setPreviewImage(previewImage === 'after' ? null : 'after')}
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-sm font-medium">Clique para {previewImage === 'after' ? 'fechar' : 'ampliar'}</span>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => onUpdate(case_.id, 'afterImage', '')}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload('afterImage', file);
                        }}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Máximo 5MB • JPG, PNG, WEBP
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Image Preview Modal */}
              {previewImage && (
                <div 
                  className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                  onClick={() => setPreviewImage(null)}
                >
                  <div className="relative max-w-3xl max-h-full">
                    <img 
                      src={previewImage === 'before' ? case_.beforeImage : case_.afterImage}
                      alt={previewImage === 'before' ? 'Antes' : 'Depois'}
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setPreviewImage(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Completion Status */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <h4 className="font-medium">Status de Completude</h4>
              <p className="text-sm text-muted-foreground">
                {isComplete ? 'Todas as informações foram preenchidas' : 'Algumas informações ainda precisam ser preenchidas'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">
                {isComplete ? '100%' : `${Math.round((
                  (case_.title ? 1 : 0) +
                  (case_.age ? 1 : 0) +
                  (case_.description ? 1 : 0) +
                  (case_.beforeImage ? 1 : 0) +
                  (case_.afterImage ? 1 : 0)
                ) / 5 * 100)}%`}
              </div>
              <div className="text-xs text-muted-foreground">Completo</div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, Save, Eye } from "lucide-react";
import { toast } from "sonner";

interface BeforeAfterCase {
  id: number;
  title: string;
  age: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

const ImageUploadManager = () => {
  const [cases, setCases] = useState<BeforeAfterCase[]>([
    {
      id: 1,
      title: "Suavização de rugas da testa",
      age: "39 anos",
      description: "Resultado natural mantendo expressões faciais",
      beforeImage: "",
      afterImage: ""
    }
  ]);

  const addNewCase = () => {
    const newCase: BeforeAfterCase = {
      id: Date.now(),
      title: "",
      age: "",
      description: "",
      beforeImage: "",
      afterImage: ""
    };
    setCases([...cases, newCase]);
  };

  const removeCase = (id: number) => {
    setCases(cases.filter(case_ => case_.id !== id));
  };

  const updateCase = (id: number, field: keyof BeforeAfterCase, value: string) => {
    setCases(cases.map(case_ => 
      case_.id === id ? { ...case_, [field]: value } : case_
    ));
  };

  const handleImageUpload = (id: number, type: 'beforeImage' | 'afterImage', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      updateCase(id, type, imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const saveChanges = () => {
    // Aqui você pode implementar a lógica para salvar no Supabase ou localStorage
    localStorage.setItem('beforeAfterCases', JSON.stringify(cases));
    toast.success("Imagens salvas com sucesso!");
  };

  const previewResults = () => {
    // Navegar para a seção de antes/depois
    document.getElementById('antes-depois')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Gerenciar Imagens Antes/Depois
            </h1>
            <p className="text-muted-foreground">
              Faça upload das imagens de antes e depois dos tratamentos
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={previewResults} variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Visualizar
            </Button>
            <Button onClick={saveChanges}>
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {cases.map((case_) => (
            <Card key={case_.id} className="p-6">
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-lg font-semibold">Caso #{case_.id}</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => removeCase(case_.id)}
                  className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Informações do Caso */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Título do Tratamento</label>
                    <Input
                      value={case_.title}
                      onChange={(e) => updateCase(case_.id, 'title', e.target.value)}
                      placeholder="Ex: Suavização de rugas da testa"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Idade da Paciente</label>
                    <Input
                      value={case_.age}
                      onChange={(e) => updateCase(case_.id, 'age', e.target.value)}
                      placeholder="Ex: 39 anos"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Descrição do Resultado</label>
                    <Textarea
                      value={case_.description}
                      onChange={(e) => updateCase(case_.id, 'description', e.target.value)}
                      placeholder="Descreva o resultado obtido"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Upload de Imagens */}
                <div className="space-y-4">
                  {/* Imagem Antes */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Imagem "Antes"</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                      {case_.beforeImage ? (
                        <div className="relative">
                          <img 
                            src={case_.beforeImage} 
                            alt="Antes" 
                            className="w-full h-32 object-cover rounded"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => updateCase(case_.id, 'beforeImage', '')}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(case_.id, 'beforeImage', file);
                            }}
                            className="w-full"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Imagem Depois */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Imagem "Depois"</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                      {case_.afterImage ? (
                        <div className="relative">
                          <img 
                            src={case_.afterImage} 
                            alt="Depois" 
                            className="w-full h-32 object-cover rounded"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => updateCase(case_.id, 'afterImage', '')}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(case_.id, 'afterImage', file);
                            }}
                            className="w-full"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          <Button onClick={addNewCase} variant="outline" className="w-full">
            <Upload className="w-4 h-4 mr-2" />
            Adicionar Novo Caso
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadManager;
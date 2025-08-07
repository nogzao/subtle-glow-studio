import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUploadCard } from "./ImageUploadCard";
import { DashboardStats } from "./DashboardStats";
import { ImageGallery } from "./ImageGallery";
import { Plus, Save, Eye, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export interface BeforeAfterCase {
  id: number;
  title: string;
  age: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  createdAt: Date;
  isPublished: boolean;
}

const ImageUploadDashboard = () => {
  const [cases, setCases] = useState<BeforeAfterCase[]>([]);
  const [activeTab, setActiveTab] = useState("gallery");
  const [isSaving, setIsSaving] = useState(false);

  // Load cases from localStorage on mount
  useEffect(() => {
    const savedCases = localStorage.getItem('beforeAfterCases');
    if (savedCases) {
      try {
        const parsedCases = JSON.parse(savedCases);
        setCases(parsedCases.map((case_: any) => ({
          ...case_,
          createdAt: new Date(case_.createdAt || Date.now()),
          isPublished: case_.isPublished ?? true
        })));
      } catch (error) {
        console.error('Error loading cases:', error);
        setCases(getDefaultCases());
      }
    } else {
      setCases(getDefaultCases());
    }
  }, []);

  const getDefaultCases = (): BeforeAfterCase[] => [
    {
      id: 1,
      title: "Suavização de rugas da testa",
      age: "39 anos",
      description: "Resultado natural mantendo expressões faciais",
      beforeImage: "",
      afterImage: "",
      createdAt: new Date(),
      isPublished: true
    }
  ];

  const addNewCase = () => {
    const newCase: BeforeAfterCase = {
      id: Date.now(),
      title: "",
      age: "",
      description: "",
      beforeImage: "",
      afterImage: "",
      createdAt: new Date(),
      isPublished: false
    };
    setCases([...cases, newCase]);
    setActiveTab("upload");
  };

  const removeCase = (id: number) => {
    setCases(cases.filter(case_ => case_.id !== id));
    toast.success("Caso removido com sucesso!");
  };

  const updateCase = (id: number, field: keyof BeforeAfterCase, value: any) => {
    setCases(cases.map(case_ => 
      case_.id === id ? { ...case_, [field]: value } : case_
    ));
  };

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      localStorage.setItem('beforeAfterCases', JSON.stringify(cases));
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate save delay
      toast.success("Todas as alterações foram salvas!");
    } catch (error) {
      toast.error("Erro ao salvar alterações");
    } finally {
      setIsSaving(false);
    }
  };

  const previewResults = () => {
    window.location.href = "/#antes-depois";
  };

  const publishedCases = cases.filter(case_ => case_.isPublished);
  const draftCases = cases.filter(case_ => !case_.isPublished);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-display font-bold text-foreground mb-2">
              Dashboard de Imagens
            </h1>
            <p className="text-muted-foreground text-lg">
              Gerencie as imagens de antes e depois dos tratamentos
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={previewResults} variant="outline" size="lg">
              <Eye className="w-5 h-5 mr-2" />
              Visualizar Site
            </Button>
            <Button 
              onClick={saveChanges} 
              disabled={isSaving}
              size="lg"
              className="min-w-[160px]"
            >
              {isSaving ? (
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Save className="w-5 h-5 mr-2" />
              )}
              {isSaving ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <DashboardStats 
          totalCases={cases.length}
          publishedCases={publishedCases.length}
          draftCases={draftCases.length}
        />

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="gallery">Galeria</TabsTrigger>
            <TabsTrigger value="upload">Upload de Imagens</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display font-semibold">
                Casos Publicados ({publishedCases.length})
              </h2>
              <Button onClick={addNewCase}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Caso
              </Button>
            </div>
            <ImageGallery 
              cases={publishedCases} 
              onEdit={(caseId) => {
                setActiveTab("upload");
                // Scroll to specific case if needed
              }}
            />
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display font-semibold">
                Upload e Edição
              </h2>
              <Button onClick={addNewCase} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Caso
              </Button>
            </div>
            
            <div className="grid gap-6">
              {cases.map((case_) => (
                <ImageUploadCard
                  key={case_.id}
                  case={case_}
                  onUpdate={updateCase}
                  onRemove={removeCase}
                />
              ))}
              
              {cases.length === 0 && (
                <Card className="p-12 text-center">
                  <CardContent>
                    <div className="text-muted-foreground mb-4">
                      Nenhum caso cadastrado ainda
                    </div>
                    <Button onClick={addNewCase}>
                      <Plus className="w-4 h-4 mr-2" />
                      Criar Primeiro Caso
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações da Galeria</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Backup e Restauração</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Gerencie seus dados de casos e imagens
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Exportar Dados
                    </Button>
                    <Button variant="outline" size="sm">
                      Importar Dados
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Integração Supabase</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Conecte com banco de dados para persistência avançada
                  </p>
                  <Button variant="outline" size="sm" disabled>
                    Configurar Supabase (Em breve)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ImageUploadDashboard;
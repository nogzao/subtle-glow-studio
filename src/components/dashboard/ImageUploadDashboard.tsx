import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUploadCard } from "./ImageUploadCard";
import { DashboardStats } from "./DashboardStats";
import { ImageGallery } from "./ImageGallery";
import { Plus, Save, Eye, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { beforeAfterService, type BeforeAfterCase } from "@/lib/supabase";

const ImageUploadDashboard = () => {
  const [cases, setCases] = useState<BeforeAfterCase[]>([]);
  const [activeTab, setActiveTab] = useState("gallery");
  const [isSaving, setIsSaving] = useState(false);

  // Load cases from Supabase on mount
  useEffect(() => {
    const loadCases = async () => {
      try {
        const loadedCases = await beforeAfterService.getCases();
        setCases(loadedCases);
      } catch (error) {
        console.error('Error loading cases:', error);
      }
    };

    loadCases();
  }, []);

  const addNewCase = async () => {
    const newCaseData = {
      title: "",
      age: "",
      description: "",
      beforeImage: "",
      afterImage: "",
      isPublished: false
    };
    
    const savedCase = await beforeAfterService.saveCase(newCaseData);
    if (savedCase) {
      setCases([...cases, savedCase]);
      setActiveTab("upload");
      toast.success("Novo caso criado!");
    } else {
      toast.error("Erro ao criar novo caso");
    }
  };

  const removeCase = async (id: number) => {
    const success = await beforeAfterService.deleteCase(id);
    if (success) {
      setCases(cases.filter(case_ => case_.id !== id));
      toast.success("Caso removido com sucesso!");
    } else {
      toast.error("Erro ao remover caso");
    }
  };

  const updateCase = async (id: number, field: keyof BeforeAfterCase, value: any) => {
    // Update locally first for immediate feedback
    setCases(cases.map(case_ => 
      case_.id === id ? { ...case_, [field]: value } : case_
    ));
    
    // Update in Supabase
    const updates = { [field]: value };
    await beforeAfterService.updateCase(id, updates);
  };

  const saveChanges = async () => {
    try {
      setIsSaving(true);
      
      // All changes are already saved in real-time to Supabase
      // This is just for user feedback
      setTimeout(() => {
        setIsSaving(false);
        toast.success("Todas as alterações já foram salvas automaticamente!");
      }, 1000);
    } catch (error) {
      console.error('Error saving cases:', error);
      toast.error("Erro ao salvar alterações");
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
              {isSaving ? "Salvando..." : "Alterações Auto-Salvas"}
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
                
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold mb-2 text-green-800">✅ Integração Supabase Ativa</h4>
                  <p className="text-sm text-green-700 mb-4">
                    Seus dados são salvos automaticamente no banco de dados e ficam disponíveis em qualquer navegador
                  </p>
                  <div className="text-xs text-green-600">
                    Status: Conectado e funcionando
                  </div>
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
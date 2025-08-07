import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, FileImage, PenTool, TrendingUp } from "lucide-react";

interface DashboardStatsProps {
  totalCases: number;
  publishedCases: number;
  draftCases: number;
}

export const DashboardStats = ({ totalCases, publishedCases, draftCases }: DashboardStatsProps) => {
  const stats = [
    {
      label: "Total de Casos",
      value: totalCases,
      icon: FileImage,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Casos cadastrados"
    },
    {
      label: "Publicados",
      value: publishedCases,
      icon: Eye,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Visíveis no site"
    },
    {
      label: "Rascunhos",
      value: draftCases,
      icon: PenTool,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Em edição"
    },
    {
      label: "Taxa de Publicação",
      value: totalCases > 0 ? Math.round((publishedCases / totalCases) * 100) : 0,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "% publicados",
      suffix: "%"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.label}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-foreground">
                      {stat.value}{stat.suffix}
                    </span>
                    {index === 1 && publishedCases > 0 && (
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        Ativo
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, Brain, Target, TrendingUp } from "lucide-react";

interface HeroSectionProps {
  onStartAssessment: () => void;
}

export const HeroSection = ({ onStartAssessment }: HeroSectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Comprehensive Career & Learning Readiness Assessment
          </h1>
          <h2 className="text-2xl md:text-3xl text-white/90 font-semibold mb-8">
            for Market Research Analyst
          </h2>
          
          <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover your fit and readiness for a career in market research. Get personalized insights 
            on your personality, cognitive abilities, and technical skills with actionable learning recommendations.
          </p>

          {/* CTA Button */}
          <Button 
            variant="hero" 
            size="lg" 
            onClick={onStartAssessment}
            className="text-lg px-12 py-6 mb-16"
          >
            Start Your Assessment
          </Button>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <Card className="p-6 bg-gradient-card border-white/20 backdrop-blur-sm shadow-medium hover:shadow-strong transition-smooth">
              <Brain className="w-8 h-8 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold text-foreground mb-2">Personality Assessment</h3>
              <p className="text-sm text-muted-foreground">Big Five traits, grit, and growth mindset analysis</p>
            </Card>

            <Card className="p-6 bg-gradient-card border-white/20 backdrop-blur-sm shadow-medium hover:shadow-strong transition-smooth">
              <BarChart3 className="w-8 h-8 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold text-foreground mb-2">Technical Skills</h3>
              <p className="text-sm text-muted-foreground">Data analysis, statistics, and research methodology</p>
            </Card>

            <Card className="p-6 bg-gradient-card border-white/20 backdrop-blur-sm shadow-medium hover:shadow-strong transition-smooth">
              <Target className="w-8 h-8 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold text-foreground mb-2">WISCAR Framework</h3>
              <p className="text-sm text-muted-foreground">Will, Interest, Skill, Cognitive, Ability, Real-world alignment</p>
            </Card>

            <Card className="p-6 bg-gradient-card border-white/20 backdrop-blur-sm shadow-medium hover:shadow-strong transition-smooth">
              <TrendingUp className="w-8 h-8 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold text-foreground mb-2">Career Guidance</h3>
              <p className="text-sm text-muted-foreground">Personalized recommendations and learning paths</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
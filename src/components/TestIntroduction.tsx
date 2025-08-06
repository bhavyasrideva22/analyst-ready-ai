import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Users, Briefcase } from "lucide-react";

interface TestIntroductionProps {
  onNext: () => void;
}

export const TestIntroduction = ({ onNext }: TestIntroductionProps) => {
  return (
    <div className="min-h-screen bg-assessment-bg py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            About Market Research Analyst
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding the role and what it takes to succeed
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Purpose Card */}
          <Card className="p-8 shadow-medium hover:shadow-strong transition-smooth">
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 text-success mr-3" />
              Purpose of Assessment
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Evaluate your fit and readiness for pursuing a career as a Market Research Analyst
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Identify personality, cognitive, and technical strengths and gaps
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Provide personalized recommendations for learning and career progression
              </li>
            </ul>
          </Card>

          {/* Role Overview Card */}
          <Card className="p-8 shadow-medium hover:shadow-strong transition-smooth">
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
              <Briefcase className="w-6 h-6 text-primary mr-3" />
              About the Role
            </h2>
            <p className="text-muted-foreground mb-4">
              Market Research Analysts collect and analyze data to understand market conditions and consumer preferences.
            </p>
            <p className="text-muted-foreground mb-4">
              The role requires strong analytical skills, business acumen, and communication abilities.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Marketing</Badge>
              <Badge variant="secondary">Retail</Badge>
              <Badge variant="secondary">Consulting</Badge>
              <Badge variant="secondary">Finance</Badge>
              <Badge variant="secondary">Tech</Badge>
              <Badge variant="secondary">Healthcare</Badge>
            </div>
          </Card>
        </div>

        {/* Key Skills Section */}
        <Card className="p-8 mb-12 shadow-medium">
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
            <Users className="w-6 h-6 text-secondary mr-3" />
            Key Skills and Personality Traits for Success
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Analytical Skills</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Analytical thinking & problem-solving</li>
                <li>• Comfort with quantitative data & statistics</li>
                <li>• Attention to detail & structured work style</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Personal Traits</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Curiosity and openness to new information</li>
                <li>• Motivated self-learner with persistence</li>
                <li>• Growth mindset and adaptability</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Communication</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Communication & storytelling ability</li>
                <li>• Data visualization skills</li>
                <li>• Presentation and reporting</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Assessment Info */}
        <Card className="p-8 mb-8 bg-gradient-card shadow-medium">
          <div className="flex items-center justify-center mb-6">
            <Clock className="w-6 h-6 text-primary mr-3" />
            <h2 className="text-2xl font-semibold text-foreground">Assessment Overview</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">25-30</div>
              <div className="text-sm text-muted-foreground">Minutes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">4</div>
              <div className="text-sm text-muted-foreground">Assessment Sections</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100</div>
              <div className="text-sm text-muted-foreground">Personalized Score</div>
            </div>
          </div>

          <div className="text-center">
            <Button variant="hero" size="lg" onClick={onNext} className="px-12">
              Begin Assessment
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
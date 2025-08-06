import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, TrendingUp, BookOpen, Briefcase, Target } from "lucide-react";

interface AssessmentScores {
  psychometricFit: number;
  technicalReadiness: number;
  overallConfidence: number;
  wScore: number;
  iScore: number;
  sScore: number;
  cScore: number;
  aScore: number;
  rScore: number;
}

interface ResultsSectionProps {
  scores: AssessmentScores;
  onRestart: () => void;
}

export const ResultsSection = ({ scores, onRestart }: ResultsSectionProps) => {
  const getRecommendation = () => {
    const avgScore = (scores.psychometricFit + scores.technicalReadiness + scores.overallConfidence) / 3;
    
    if (avgScore >= 75) {
      return {
        decision: "Yes",
        color: "text-success",
        icon: CheckCircle,
        message: "You show excellent potential for a career as a Market Research Analyst!"
      };
    } else if (avgScore >= 50) {
      return {
        decision: "Maybe", 
        color: "text-warning",
        icon: AlertCircle,
        message: "You have good potential but may benefit from additional preparation."
      };
    } else {
      return {
        decision: "Consider Alternatives",
        color: "text-destructive", 
        icon: AlertCircle,
        message: "Consider exploring related roles or building foundational skills first."
      };
    }
  };

  const recommendation = getRecommendation();
  const RecommendationIcon = recommendation.icon;

  const wiscarData = [
    { dimension: "W", name: "Will", score: scores.wScore, color: "bg-red-500" },
    { dimension: "I", name: "Interest", score: scores.iScore, color: "bg-orange-500" },
    { dimension: "S", name: "Skill", score: scores.sScore, color: "bg-yellow-500" },
    { dimension: "C", name: "Cognitive", score: scores.cScore, color: "bg-green-500" },
    { dimension: "A", name: "Ability", score: scores.aScore, color: "bg-blue-500" },
    { dimension: "R", name: "Real-world", score: scores.rScore, color: "bg-purple-500" }
  ];

  const jobRoles = [
    {
      title: "Market Research Analyst",
      match: scores.technicalReadiness,
      description: "Data collection and interpretation for business insights"
    },
    {
      title: "Consumer Insights Specialist", 
      match: scores.psychometricFit,
      description: "Focus on consumer behavior trends and patterns"
    },
    {
      title: "Data Analyst (Marketing)",
      match: (scores.technicalReadiness + scores.cScore) / 2,
      description: "Analyze marketing data and campaign effectiveness"
    },
    {
      title: "Business Intelligence Analyst",
      match: (scores.technicalReadiness + scores.rScore) / 2, 
      description: "Integrate market research into business strategy"
    }
  ];

  return (
    <div className="min-h-screen bg-assessment-bg py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Your Assessment Results
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive analysis of your Market Research Analyst readiness
          </p>
        </div>

        {/* Overall Recommendation */}
        <Card className="p-8 mb-8 bg-gradient-card shadow-strong text-center">
          <RecommendationIcon className={`w-16 h-16 mx-auto mb-4 ${recommendation.color}`} />
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {recommendation.decision}
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            {recommendation.message}
          </p>
          <div className="text-4xl font-bold text-primary">
            {Math.round(scores.overallConfidence)}% Confidence Score
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Core Scores */}
          <Card className="p-6 shadow-medium">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <Target className="w-5 h-5 text-primary mr-2" />
              Assessment Scores
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-foreground">Psychological Fit</span>
                  <span className="text-primary font-semibold">{Math.round(scores.psychometricFit)}%</span>
                </div>
                <Progress value={scores.psychometricFit} className="h-2" />
                <p className="text-sm text-muted-foreground mt-1">
                  Personality traits and motivation alignment
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-foreground">Technical Readiness</span>
                  <span className="text-primary font-semibold">{Math.round(scores.technicalReadiness)}%</span>
                </div>
                <Progress value={scores.technicalReadiness} className="h-2" />
                <p className="text-sm text-muted-foreground mt-1">
                  Current knowledge and aptitude level
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-foreground">Overall Confidence</span>
                  <span className="text-primary font-semibold">{Math.round(scores.overallConfidence)}%</span>
                </div>
                <Progress value={scores.overallConfidence} className="h-2" />
                <p className="text-sm text-muted-foreground mt-1">
                  Combined readiness and career fit
                </p>
              </div>
            </div>
          </Card>

          {/* WISCAR Radar */}
          <Card className="p-6 shadow-medium">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              WISCAR Framework Analysis
            </h3>
            
            <div className="space-y-4">
              {wiscarData.map((item) => (
                <div key={item.dimension} className="flex items-center space-x-4">
                  <div className={`w-8 h-8 ${item.color} rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
                    {item.dimension}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-foreground">{item.name}</span>
                      <span className="text-primary font-semibold">{Math.round(item.score)}%</span>
                    </div>
                    <Progress value={item.score} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Job Roles */}
        <Card className="p-6 mb-8 shadow-medium">
          <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
            <Briefcase className="w-5 h-5 text-primary mr-2" />
            Recommended Job Roles
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {jobRoles.map((role, index) => (
              <div key={index} className="p-4 border border-assessment-border rounded-lg hover:bg-accent transition-smooth">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-foreground">{role.title}</h4>
                  <Badge variant={role.match >= 70 ? "default" : role.match >= 50 ? "secondary" : "outline"}>
                    {Math.round(role.match)}% Match
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{role.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Learning Path */}
        <Card className="p-6 mb-8 shadow-medium">
          <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
            <BookOpen className="w-5 h-5 text-primary mr-2" />
            Recommended Learning Path
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-3">
                1
              </div>
              <h4 className="font-semibold text-foreground mb-2">Foundation</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Intro to Market Research</li>
                <li>• Basic Statistics</li>
                <li>• Excel/Spreadsheets</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold text-lg mx-auto mb-3">
                2
              </div>
              <h4 className="font-semibold text-foreground mb-2">Intermediate</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Survey Design</li>
                <li>• Data Analysis Tools</li>
                <li>• Consumer Psychology</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center text-success-foreground font-bold text-lg mx-auto mb-3">
                3
              </div>
              <h4 className="font-semibold text-foreground mb-2">Job-Ready</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Real Projects</li>
                <li>• Internships</li>
                <li>• Certification</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="text-center">
          <Button variant="hero" size="lg" onClick={onRestart} className="mr-4">
            Take Assessment Again
          </Button>
          <Button variant="outline" size="lg">
            Download Report
          </Button>
        </div>
      </div>
    </div>
  );
};
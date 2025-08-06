import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AssessmentHeader } from "@/components/AssessmentHeader";
import { Badge } from "@/components/ui/badge";

interface WiscarQuestion {
  id: string;
  text: string;
  dimension: 'W' | 'I' | 'S' | 'C' | 'A' | 'R';
  dimensionName: string;
}

const wiscarQuestions: WiscarQuestion[] = [
  {
    id: "w1",
    text: "I am willing to invest significant time and effort to master market research skills",
    dimension: "W",
    dimensionName: "Will"
  },
  {
    id: "w2", 
    text: "I persist through difficult challenges even when others might give up",
    dimension: "W",
    dimensionName: "Will"
  },
  {
    id: "i1",
    text: "I genuinely find market trends and consumer behavior fascinating",
    dimension: "I", 
    dimensionName: "Interest"
  },
  {
    id: "i2",
    text: "I actively seek out information about market research and analytics",
    dimension: "I",
    dimensionName: "Interest"
  },
  {
    id: "s1",
    text: "I am comfortable working with spreadsheets and data analysis tools",
    dimension: "S",
    dimensionName: "Skill"
  },
  {
    id: "s2",
    text: "I can effectively communicate complex findings to different audiences",
    dimension: "S", 
    dimensionName: "Skill"
  },
  {
    id: "c1",
    text: "I excel at identifying patterns and drawing logical conclusions from data",
    dimension: "C",
    dimensionName: "Cognitive"
  },
  {
    id: "c2",
    text: "I can break down complex problems into manageable components",
    dimension: "C",
    dimensionName: "Cognitive"
  },
  {
    id: "a1",
    text: "I actively seek feedback and use it to improve my performance",
    dimension: "A",
    dimensionName: "Ability to Learn"
  },
  {
    id: "a2",
    text: "I adapt quickly when learning new methods or technologies",
    dimension: "A",
    dimensionName: "Ability to Learn"
  },
  {
    id: "r1",
    text: "I understand the day-to-day responsibilities of a market research analyst",
    dimension: "R",
    dimensionName: "Real-World Alignment"
  },
  {
    id: "r2",
    text: "I have realistic expectations about career progression in market research",
    dimension: "R",
    dimensionName: "Real-World Alignment"
  }
];

const likertOptions = [
  { value: "1", label: "Strongly Disagree" },
  { value: "2", label: "Disagree" },
  { value: "3", label: "Neutral" },
  { value: "4", label: "Agree" },
  { value: "5", label: "Strongly Agree" }
];

interface WiscarSectionProps {
  onNext: (scores: Record<string, number>) => void;
}

export const WiscarSection = ({ onNext }: WiscarSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [wiscarQuestions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < wiscarQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const scores = calculateWiscarScores();
      onNext(scores);
    }
  };

  const calculateWiscarScores = () => {
    const dimensions = {
      W: { total: 0, count: 0 },
      I: { total: 0, count: 0 },
      S: { total: 0, count: 0 },
      C: { total: 0, count: 0 },
      A: { total: 0, count: 0 },
      R: { total: 0, count: 0 }
    };

    wiscarQuestions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        dimensions[question.dimension].total += parseInt(answer);
        dimensions[question.dimension].count++;
      }
    });

    // Convert to 0-100 scale
    const wiscarScores = Object.keys(dimensions).reduce((acc, dim) => {
      const dimension = dimensions[dim as keyof typeof dimensions];
      if (dimension.count > 0) {
        acc[`${dim.toLowerCase()}Score`] = (dimension.total / (dimension.count * 5)) * 100;
      }
      return acc;
    }, {} as Record<string, number>);

    // Calculate overall confidence score
    const overallConfidence = Object.values(wiscarScores).reduce((a, b) => a + b, 0) / Object.keys(wiscarScores).length;

    return {
      ...wiscarScores,
      overallConfidence
    };
  };

  const question = wiscarQuestions[currentQuestion];
  const hasAnswer = answers[question.id];
  const isLastQuestion = currentQuestion === wiscarQuestions.length - 1;

  const getDimensionColor = (dimension: string) => {
    const colors = {
      W: 'bg-red-500 text-white',
      I: 'bg-orange-500 text-white', 
      S: 'bg-yellow-500 text-black',
      C: 'bg-green-500 text-white',
      A: 'bg-blue-500 text-white',
      R: 'bg-purple-500 text-white'
    };
    return colors[dimension as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-assessment-bg">
      <AssessmentHeader 
        currentStep={3}
        totalSteps={4}
        title="WISCAR Framework Analysis"
        subtitle="Evaluating your Will, Interest, Skill, Cognitive abilities, Ability to learn, and Real-world alignment"
      />
      
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Card className="p-8 shadow-medium">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {wiscarQuestions.length}
              </span>
              <div className="flex items-center space-x-2">
                <Badge className={getDimensionColor(question.dimension)}>
                  {question.dimension}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {question.dimensionName}
                </span>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-foreground mb-6">
              {question.text}
            </h2>
          </div>

          <RadioGroup 
            value={answers[question.id] || ""} 
            onValueChange={handleAnswer}
            className="space-y-4"
          >
            {likertOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-3">
                <RadioGroupItem 
                  value={option.value} 
                  id={`${question.id}-${option.value}`}
                  className="border-2 border-assessment-border data-[state=checked]:border-primary"
                />
                <Label 
                  htmlFor={`${question.id}-${option.value}`}
                  className="text-foreground cursor-pointer flex-1 py-3 px-4 rounded-lg hover:bg-accent transition-smooth"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between mt-12">
            <Button 
              variant="outline" 
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={!hasAnswer}
              variant={isLastQuestion ? "success" : "default"}
            >
              {isLastQuestion ? "Complete Assessment" : "Next Question"}
            </Button>
          </div>
        </Card>

        {/* WISCAR Legend */}
        <Card className="mt-8 p-6 bg-gradient-card shadow-soft">
          <h3 className="font-semibold text-foreground mb-4">WISCAR Framework Dimensions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Badge className="bg-red-500 text-white">W</Badge>
              <span className="text-muted-foreground">Will - Inner drive & persistence</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-orange-500 text-white">I</Badge>
              <span className="text-muted-foreground">Interest - Genuine curiosity</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-yellow-500 text-black">S</Badge>
              <span className="text-muted-foreground">Skill - Current abilities</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500 text-white">C</Badge>
              <span className="text-muted-foreground">Cognitive - Thinking style</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-blue-500 text-white">A</Badge>
              <span className="text-muted-foreground">Ability - Learning capacity</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-purple-500 text-white">R</Badge>
              <span className="text-muted-foreground">Real-world - Role understanding</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
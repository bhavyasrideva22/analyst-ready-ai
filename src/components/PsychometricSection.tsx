import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AssessmentHeader } from "@/components/AssessmentHeader";

interface Question {
  id: string;
  text: string;
  category: 'interest' | 'personality' | 'motivation' | 'cognitive';
  construct: string;
}

const psychometricQuestions: Question[] = [
  {
    id: "p1",
    text: "I enjoy analyzing data to discover patterns and trends",
    category: "interest",
    construct: "analytical_interest"
  },
  {
    id: "p2", 
    text: "I find market research and consumer behavior fascinating",
    category: "interest",
    construct: "domain_interest"
  },
  {
    id: "p3",
    text: "I am naturally curious about why people make certain choices",
    category: "personality",
    construct: "openness"
  },
  {
    id: "p4",
    text: "I prefer structured, systematic approaches to problem-solving",
    category: "personality", 
    construct: "conscientiousness"
  },
  {
    id: "p5",
    text: "I persist through challenges even when progress is slow",
    category: "personality",
    construct: "grit"
  },
  {
    id: "p6",
    text: "I believe my abilities can be developed through hard work",
    category: "cognitive",
    construct: "growth_mindset"
  },
  {
    id: "p7",
    text: "I enjoy presenting findings and insights to others",
    category: "personality",
    construct: "extraversion"
  },
  {
    id: "p8",
    text: "Statistical analysis and numbers excite me",
    category: "interest",
    construct: "quantitative_interest"
  },
  {
    id: "p9",
    text: "I'm motivated by understanding complex problems",
    category: "motivation",
    construct: "intrinsic_motivation"
  },
  {
    id: "p10",
    text: "Career growth and advancement are important to me",
    category: "motivation", 
    construct: "extrinsic_motivation"
  }
];

const likertOptions = [
  { value: "1", label: "Strongly Disagree" },
  { value: "2", label: "Disagree" },
  { value: "3", label: "Neutral" },
  { value: "4", label: "Agree" },
  { value: "5", label: "Strongly Agree" }
];

interface PsychometricSectionProps {
  onNext: (scores: Record<string, number>) => void;
}

export const PsychometricSection = ({ onNext }: PsychometricSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [psychometricQuestions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < psychometricQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate scores and proceed
      const scores = calculateScores();
      onNext(scores);
    }
  };

  const calculateScores = () => {
    const categories = {
      interest: 0,
      personality: 0, 
      motivation: 0,
      cognitive: 0
    };

    const counts = {
      interest: 0,
      personality: 0,
      motivation: 0, 
      cognitive: 0
    };

    psychometricQuestions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        categories[question.category] += parseInt(answer);
        counts[question.category]++;
      }
    });

    // Convert to 0-100 scale
    const psychometricFit = Object.keys(categories).reduce((acc, category) => {
      if (counts[category as keyof typeof counts] > 0) {
        acc[category] = (categories[category as keyof typeof categories] / (counts[category as keyof typeof counts] * 5)) * 100;
      }
      return acc;
    }, {} as Record<string, number>);

    return {
      psychometricFit: Object.values(psychometricFit).reduce((a, b) => a + b, 0) / Object.keys(psychometricFit).length,
      ...psychometricFit
    };
  };

  const question = psychometricQuestions[currentQuestion];
  const hasAnswer = answers[question.id];
  const isLastQuestion = currentQuestion === psychometricQuestions.length - 1;

  return (
    <div className="min-h-screen bg-assessment-bg">
      <AssessmentHeader 
        currentStep={1}
        totalSteps={4}
        title="Personality & Motivation Assessment"
        subtitle="Help us understand your personality traits, interests, and motivation for market research"
      />
      
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Card className="p-8 shadow-medium">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {psychometricQuestions.length}
              </span>
              <span className="text-sm text-primary font-medium capitalize">
                {question.category}
              </span>
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
              {isLastQuestion ? "Complete Section" : "Next Question"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
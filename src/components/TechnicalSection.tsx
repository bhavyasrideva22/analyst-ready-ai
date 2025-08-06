import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AssessmentHeader } from "@/components/AssessmentHeader";
import { Badge } from "@/components/ui/badge";

interface TechnicalQuestion {
  id: string;
  text: string;
  type: 'aptitude' | 'prerequisite' | 'domain';
  options: { value: string; label: string; correct?: boolean }[];
  explanation?: string;
}

const technicalQuestions: TechnicalQuestion[] = [
  {
    id: "t1",
    text: "If a survey has a margin of error of ±3% with 95% confidence, what does this mean?",
    type: "prerequisite",
    options: [
      { value: "a", label: "The survey is 95% accurate" },
      { value: "b", label: "95% of the time, the true value is within 3% of the survey result", correct: true },
      { value: "c", label: "3% of respondents will give wrong answers" },
      { value: "d", label: "The survey should be repeated 95 times" }
    ]
  },
  {
    id: "t2", 
    text: "In a data set: 2, 4, 6, 8, 10, 12, 14. What is the median?",
    type: "aptitude",
    options: [
      { value: "a", label: "6" },
      { value: "b", label: "7" },
      { value: "c", label: "8", correct: true },
      { value: "d", label: "9" }
    ]
  },
  {
    id: "t3",
    text: "Which sampling method would be BEST for studying customer satisfaction across different store locations?",
    type: "domain", 
    options: [
      { value: "a", label: "Simple random sampling" },
      { value: "b", label: "Stratified sampling", correct: true },
      { value: "c", label: "Convenience sampling" },
      { value: "d", label: "Snowball sampling" }
    ]
  },
  {
    id: "t4",
    text: "What is the next number in this sequence: 2, 6, 14, 30, ?",
    type: "aptitude",
    options: [
      { value: "a", label: "46" },
      { value: "b", label: "54" },
      { value: "c", label: "62", correct: true },
      { value: "d", label: "78" }
    ]
  },
  {
    id: "t5",
    text: "Which Excel function would you use to count non-empty cells in a range?",
    type: "prerequisite",
    options: [
      { value: "a", label: "COUNT()" },
      { value: "b", label: "COUNTA()", correct: true },
      { value: "c", label: "SUM()" },
      { value: "d", label: "AVERAGE()" }
    ]
  },
  {
    id: "t6",
    text: "In market research, what is a 'focus group' primarily used for?",
    type: "domain",
    options: [
      { value: "a", label: "Statistical analysis of large datasets" },
      { value: "b", label: "Gathering qualitative insights through group discussions", correct: true },
      { value: "c", label: "Testing product pricing strategies" },
      { value: "d", label: "Measuring brand awareness quantitatively" }
    ]
  },
  {
    id: "t7",
    text: "If Product A has 25% market share and Product B has 15% market share, what's the ratio of A to B?",
    type: "aptitude", 
    options: [
      { value: "a", label: "1.5:1" },
      { value: "b", label: "1.67:1", correct: true },
      { value: "c", label: "2:1" },
      { value: "d", label: "2.5:1" }
    ]
  },
  {
    id: "t8",
    text: "What is 'response bias' in survey research?",
    type: "domain",
    options: [
      { value: "a", label: "When surveys take too long to complete" },
      { value: "b", label: "When respondents give inaccurate or misleading answers", correct: true },
      { value: "c", label: "When not enough people respond to the survey" },
      { value: "d", label: "When questions are poorly written" }
    ]
  }
];

interface TechnicalSectionProps {
  onNext: (scores: Record<string, number>) => void;
}

export const TechnicalSection = ({ onNext }: TechnicalSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [technicalQuestions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < technicalQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const scores = calculateScores();
      onNext(scores);
    }
  };

  const calculateScores = () => {
    let correctAnswers = 0;
    const categoryScores = {
      aptitude: { correct: 0, total: 0 },
      prerequisite: { correct: 0, total: 0 },
      domain: { correct: 0, total: 0 }
    };

    technicalQuestions.forEach(question => {
      const userAnswer = answers[question.id];
      const correctOption = question.options.find(opt => opt.correct);
      
      categoryScores[question.type].total++;
      
      if (userAnswer && correctOption && userAnswer === correctOption.value) {
        correctAnswers++;
        categoryScores[question.type].correct++;
      }
    });

    const technicalReadiness = (correctAnswers / technicalQuestions.length) * 100;
    
    return {
      technicalReadiness,
      aptitudeScore: (categoryScores.aptitude.correct / Math.max(categoryScores.aptitude.total, 1)) * 100,
      prerequisiteScore: (categoryScores.prerequisite.correct / Math.max(categoryScores.prerequisite.total, 1)) * 100,
      domainScore: (categoryScores.domain.correct / Math.max(categoryScores.domain.total, 1)) * 100
    };
  };

  const question = technicalQuestions[currentQuestion];
  const hasAnswer = answers[question.id];
  const isLastQuestion = currentQuestion === technicalQuestions.length - 1;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'aptitude': return 'bg-primary text-primary-foreground';
      case 'prerequisite': return 'bg-secondary text-secondary-foreground';
      case 'domain': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-assessment-bg">
      <AssessmentHeader 
        currentStep={2}
        totalSteps={4}
        title="Technical Skills & Aptitude"
        subtitle="Testing your analytical reasoning, prerequisite knowledge, and domain expertise"
      />
      
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Card className="p-8 shadow-medium">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {technicalQuestions.length}
              </span>
              <Badge className={getTypeColor(question.type)}>
                {question.type.charAt(0).toUpperCase() + question.type.slice(1)}
              </Badge>
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
            {question.options.map((option) => (
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